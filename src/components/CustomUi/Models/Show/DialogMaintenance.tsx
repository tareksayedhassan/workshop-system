import React, { useState } from "react";
import { usegetMaintenanceForSetup } from "@/src/Hooks/ReactQuery/Maintenance/usegetMaintenanceForSetup";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import { useTranslate } from "@/public/localization";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";
import { toast } from "sonner";
import axios from "axios";
import { BASE_URL, MaintenanceProducts } from "@/src/services/page";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

type Items = {
  ModelId: number;
  BrandId: number;
  Product: any;
};

export default function DialogMaintenance({
  BrandId,
  ModelId,
  Product,
}: Items) {
  const { data: Maintenance = [] } = usegetMaintenanceForSetup(
    ModelId,
    BrandId
  );

  // كل منتج ليه maintenance واحد مختار: { [productId]: selectedMaintenanceId | null }
  const [selectedMaintenanceId, setSelectedMaintenanceId] = useState<
    Record<number, number | null>
  >({});

  const t = useTranslate();
  const [open, setOpen] = useState(false);
  const { userId } = useGetuserId();

  // جلب الـ ID المختار للمنتج الحالي
  const currentSelectedId = selectedMaintenanceId[Product.id] ?? null;
  console.log(currentSelectedId);
  // التحديث: اختيار واحد بس
  const handleCheckboxChange = (checked: boolean, maintenanceId: number) => {
    if (!checked) return; // ما نسمحش بالإلغاء يدويًا (يسمح بس بالاختيار)

    const productId = Product.id;
    setSelectedMaintenanceId((prev) => ({
      ...prev,
      [productId]: maintenanceId, // نحدّث المنتج الحالي فقط
    }));
  };

  const handleSave = async () => {
    if (!currentSelectedId) {
      toast.error(t("Please select one maintenance service"));
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/${MaintenanceProducts}`, {
        ModeleId: ModelId,
        userId: Number(userId),
        carId: ModelId,
        MaintenanceTableId: currentSelectedId,
        ProductId: Product.id,
        Quantity: 1,
        price: Product?.price[0]?.price,

        Products: [
          {
            Quantity: Product.Quantity ? Number(Product.Quantity) : 1,
            ProductId: Number(Product.id),
            price: Product?.price[0]?.price,
          },
        ],
      });

      if (res.status === 201) {
        toast.success(t("maintenance added successfully"));
        setOpen(false);
        setSelectedMaintenanceId((prev) => ({
          ...prev,
          [Product.id]: null,
        }));
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("An error occurred"));
    }
  };

  return (
    <div>
      <Dialog onOpenChange={setOpen} open={open}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-blue-400 cursor-pointer">
              {t("Maintenance allocation for products")}
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-[700px] min-h-[500px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-center">
                {t("Select One Maintenance Service")} -{" "}
                {Product.name || Product.id}
              </DialogTitle>
            </DialogHeader>

            <div className="py-6">
              {!ModelId ? (
                <div className="flex justify-center items-center py-8">
                  <Alert className="w-full max-w-xl border border-yellow-400 bg-yellow-50 text-yellow-800 rounded-xl shadow-sm p-6">
                    <AlertCircleIcon className="text-yellow-600 w-6 h-6" />
                    <AlertTitle className="text-base font-semibold mt-0">
                      {t("Warning!")}
                    </AlertTitle>
                    <AlertDescription className="text-sm leading-relaxed mt-2">
                      {t(
                        "Please make sure to select the car model to display its related maintenance services."
                      )}
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto px-2 gap-y-5">
                  {Maintenance?.data?.map((item: any) => {
                    const isChecked = currentSelectedId === item.id;

                    return (
                      <div key={item.id}>
                        <Label className="flex gap-3 items-center cursor-pointer">
                          <Checkbox
                            className="w-5 h-5"
                            checked={isChecked}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(checked as boolean, item.id)
                            }
                          />
                          <span className="text-base">{item.name}</span>
                        </Label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  {t("Cancel")}
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleSave()}
              >
                {t("Save changes")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
