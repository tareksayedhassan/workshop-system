import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useEditModel } from "@/src/Hooks/ReactQuery/Models/useEditModel";
import { useGetModelById } from "@/src/Hooks/ReactQuery/Models/useGetModelById";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Trash2, Plus, ArrowRight, ArrowLeft } from "lucide-react";
import useGetproductSetup from "@/src/Hooks/ReactQuery/ProductSetup/useGetproductSetup";
import useGetProducts from "@/src/Hooks/ReactQuery/Maintenance/useGetProducts";

// افترض إن عندك API لجلب المنتجات

interface Item {
  id: number;
  name: string;
  code?: string;
  cc?: number;
}

interface AddToMaintenanceTabelProps {
  open: boolean;
  setopen: (open: boolean) => void;
  modelId: number | null;
}

export function AddToMaintenanceTabel({
  open,
  setopen,
  modelId,
}: AddToMaintenanceTabelProps) {
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [searchLeft, setSearchLeft] = useState("");
  const [searchRight, setSearchRight] = useState("");

  const { data: allProducts = [] } = useGetProducts();
  const { data: modelData, refetch } = useGetModelById(modelId);

  // لما الـ dialog يفتح، جيب الأصناف المرتبطة بالـ model
  useEffect(() => {
    if (open && modelId) {
      refetch();
    }
  }, [open, modelId, refetch]);

  // لما يجيب بيانات الموديل، حط الأصناف المضافة مسبقًا
  useEffect(() => {
    if (modelData?.maintenanceItems) {
      setSelectedItems(modelData.maintenanceItems);
    } else {
      setSelectedItems([]);
    }
  }, [modelData]);

  // فلترة الأصناف

  const filteredSelected = selectedItems.filter((item) =>
    item.name.toLowerCase().includes(searchRight.toLowerCase())
  );

  const addItem = (item: Item) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  const removeItem = (id: number) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const { mutate, isPending } = useEditModel();

  // const handleSave = () => {
  //   if (!modelId) return;

  //   mutate(
  //     {
  //       id: modelId,
  //       maintenanceItems: selectedItems, // أرسل الأصناف المختارة
  //     },
  //     {
  //       onSuccess: () => {
  //         toast.success(t("Maintenance items updated successfully"));
  //         setopen(false);
  //       },
  //       onError: () => {
  //         toast.error(t("Failed to update maintenance items"));
  //       },
  //     }
  //   );
  // };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent className="max-w-6xl w-full h-[80vh] p-0 rounded-2xl border-0 shadow-2xl overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-semibold">
            {t("edit model")} - {modelData?.name || ""}
          </DialogTitle>
          <DialogDescription className="text-base opacity-70">
            {t("Select items to add to maintenance")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 h-full">
          {/* الجدول الأيسر: الأصناف المتاحة */}
          <div className="border-r p-4 flex flex-col">
            <div className="mb-4">
              <Input
                placeholder={t("Search available items...")}
                value={searchLeft}
                onChange={(e) => setSearchLeft(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="flex-1 overflow-y-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="p-3 text-right font-medium">{t("name")}</th>
                    <th className="p-3 text-right font-medium">{t("code")}</th>
                    <th className="p-3 w-20"></th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts?.data?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center py-8 text-gray-500"
                      >
                        {t("No items found")}
                      </td>
                    </tr>
                  ) : (
                    allProducts?.data?.map((item: any) => (
                      <tr
                        key={item.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-3 text-right">{item.name}</td>
                        <td className="p-3 text-right text-gray-600">
                          {item.code || "-"}
                        </td>
                        <td className="p-3">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => addItem(item)}
                            className="h-8 w-8 p-0"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* الجدول الأيمن: الأصناف المضافة */}
          <div className="p-4 flex flex-col">
            <div className="mb-4">
              <Input
                placeholder={t("Search selected items...")}
                value={searchRight}
                onChange={(e) => setSearchRight(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="flex-1 overflow-y-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-blue-50 sticky top-0">
                  <tr>
                    <th className="p-3 text-right font-medium">{t("name")}</th>
                    <th className="p-3 text-right font-medium">{t("code")}</th>
                    <th className="p-3 w-20"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSelected.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center py-8 text-gray-500"
                      >
                        {t("No items selected")}
                      </td>
                    </tr>
                  ) : (
                    filteredSelected.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b hover:bg-blue-50 transition-colors"
                      >
                        <td className="p-3 text-right">{item.name}</td>
                        <td className="p-3 text-right text-gray-600">
                          {item.code || "-"}
                        </td>
                        <td className="p-3">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 border-t bg-gray-50">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl border-2 px-6 font-medium"
            >
              {t("cancel")}
            </Button>
          </DialogClose>
          <Button
            // onClick={handleSave}
            disabled={isPending}
            className="h-11 rounded-xl px-6 font-medium shadow-md"
          >
            {isPending ? t("saving...") : t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
