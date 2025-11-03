"use client";
export const dynamic = "force-dynamic";

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

import useGetuserId from "@/src/Hooks/Token/useGetUserId";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, ArrowRight } from "lucide-react";

import useGetProductPrice from "@/src/Hooks/ReactQuery/Maintenance/useGetProductPrice";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { useAddMaintenanceProducts } from "@/src/Hooks/ReactQuery/MaintenanceProducts/useAddMaintenanceProducts";
import { useTranslate } from "@/public/localization";

interface Item {
  productId: any;
  Quantity: string | number | readonly string[] | undefined;
  price: number;
  id: number;
  name: string;
  code?: string;
  cc?: number;
  Product: any;
}

interface AddToMaintenanceTabelProps {
  open: boolean;
  setopen: (open: boolean) => void;
  BrandId: number;
  SelectData: any;
  ModelId: number;
}
export function AddToMaintenanceTabel({
  open,
  setopen,
  BrandId,
  SelectData,
  ModelId,
}: AddToMaintenanceTabelProps) {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const { data: allProducts } = useGetProductPrice({ id: BrandId, search });
  const { mutateAsync: AddMaintenanceProducts } = useAddMaintenanceProducts();
  const t = useTranslate();

  const { userId } = useGetuserId();

  const addItem = (item: Item) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  const removeItem = (id: number) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSave = async () => {
    try {
      await AddMaintenanceProducts(
        {
          carId: Number(BrandId),
          Products: selectedItems.map((item) => ({
            Quantity: Number(item.Quantity),
            ProductId: Number(item.productId),
            price: Number(item.price),
          })),
          userId: Number(userId),
          km: SelectData.name,
          MaintenanceTableId: Number(SelectData.id),
          ModeleId: Number(ModelId),
        },
        {
          onSuccess: () => {
            toast.success("Maintenance items updated successfully");
            setopen(false);
            setSelectedItems([]);
          },
          onError: (error: any) => {
            toast.error(error.response.data.message);
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent className="max-w-6xl w-full h-[80vh] p-0 rounded-2xl border-0 shadow-2xl overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-semibold">
            {/* {t("edit model")} - {modelData?.name || ""} */}
          </DialogTitle>
          <DialogDescription className="text-base opacity-70">
            {t("Select items to add to maintenance")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 h-full">
          <div className="border-r p-4 flex flex-col">
            <div className="mb-4">
              <Input
                placeholder={"Search available items..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="flex-1 overflow-y-auto border rounded-lg">
              <div className="w-full flex justify-end">
                <div className="flex-1 overflow-y-auto border rounded-lg bg-white shadow-sm p-2">
                  {allProducts?.data?.length === 0 ? (
                    <div className="flex justify-center items-center h-40 text-gray-400">
                      {t("No items found")}
                    </div>
                  ) : (
                    <ScrollArea className="h-72 w-full ">
                      <div className="flex flex-wrap gap-3 justify-end">
                        {allProducts?.data?.map((item: any) => (
                          <div
                            key={item.id}
                            className="flex flex-col w-full justify-between border rounded-lg p-3 hover:bg-gray-50 transition-colors text-gray-700 text-right relative group"
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => addItem(item)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Button>

                            <div className="flex flex-col gap-2 items-end">
                              <h2 className="font-medium text-gray-800">
                                {item.Product.name}
                              </h2>
                              <span className="text-sm">
                                {t("Code")} : {item.Product.productCode || "-"}
                              </span>
                              <span className="text-sm">
                                {t("Price")} : {item.price}
                              </span>
                              <span className="text-sm">
                                {t("Status")} Status:{" "}
                                <span
                                  className={`px-1 rounded text-xs ${
                                    item.Product.Status === "available"
                                      ? "bg-gray-200 text-gray-800"
                                      : "bg-gray-300 text-gray-600"
                                  }`}
                                >
                                  {t(item.Product.Status)}
                                </span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col h-full bg-gray-50">
            <div className="flex-1 overflow-hidden border rounded-xl flex flex-col shadow-sm">
              <div className="bg-blue-50 border-b rounded-t-xl p-2">
                <div className="text-gray-700 font-semibold text-xs">
                  {t("Selected Items")}
                </div>
              </div>

              <ScrollArea className="h-72 w-full ">
                <div className="p-2">
                  {selectedItems.length === 0 ? (
                    <div className="flex justify-center items-center w-full h-32 text-gray-400 italic text-xs">
                      {t("No items selected")}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {selectedItems.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex flex-col border border-gray-200 rounded-md p-2 bg-white shadow-sm hover:shadow transition-shadow duration-150 text-xs"
                        >
                          <h2 className="font-medium text-gray-800 text-right text-[17px]">
                            {item.Product.name}
                          </h2>

                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-1.5">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeItem(item.id)}
                                className="h-7 w-7 p-0 text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                              <Input
                                type="number"
                                defaultValue={0}
                                value={item.Quantity}
                                onChange={(e) => {
                                  if (!selectedItems) return;
                                  const newTable = [...selectedItems];
                                  newTable[index] = {
                                    ...item,
                                    Quantity: Number(e.target.value),
                                  };

                                  setSelectedItems(newTable);
                                }}
                                min={1}
                                className="w-20 h-7 text-center text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-300 focus:outline-none"
                              />
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-blue-300 font-semibold">
                                {item.price}
                              </span>
                              <span className="text-gray-600 font-medium">
                                {item.Product.productCode || "-"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
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
            onClick={() => handleSave()}
            className="h-11 rounded-xl px-6 font-medium shadow-md"
          >
            {" "}
            {t("save")}
            {/* {isPending ? t("saving...") : t("save")} */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
