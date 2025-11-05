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
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";
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
  const [checkboxId, setCheckboxId] = useState<any>(null);
  const t = useTranslate();
  const [open, setOpen] = useState(false);
  const { userId } = useGetuserId();
  // const toggleSelectAll = () => {
  //   const allIds = Maintenance?.data?.map((item: any) => item.id) || [];
  //   if (checkboxId.length === allIds.length) {
  //     setCheckboxId([]); // الغي الاختيار لو الكل متختار
  //   } else {
  //     setCheckboxId(allIds); // اختار الكل
  //   }
  // };
  console.log(checkboxId);
  const handleSave = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/${MaintenanceProducts}/addByProductmainteance`,
        {
          ModeleId: ModelId,
          userId: Number(userId),
          carId: ModelId,
          MaintenanceTableIds: checkboxId,
          ProductId: Product.id,
          Quantity: 1,
          price: Product?.price[0]?.price,
        }
      );
      if (res.status === 201) {
        toast.success(t("maintenance added successfully"));
        setOpen(false);
        setCheckboxId([]);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer">
            {t("Maintenance allocation for products")}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl mx-4 sm:mx-6 md:mx-auto py-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {t("Maintenance allocation for products")}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-6"
          >
            <div className="min-h-[350px] mt-10">
              {!ModelId ? (
                <div className="flex justify-center items-center py-12">
                  <Alert className="border-yellow-400 bg-yellow-50">
                    <AlertCircleIcon className="h-5 w-5 text-yellow-600" />
                    <AlertTitle className="text-yellow-800 font-semibold">
                      {t("Warning!")}
                    </AlertTitle>
                    <AlertDescription className="text-yellow-700 mt-2">
                      {t(
                        "Please make sure to select the car model to display its related maintenance services."
                      )}
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="max-h-[350px] overflow-y-auto p-6 border rounded-lg bg-gray-50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Maintenance?.data?.map((item: any) => (
                        <Label
                          key={item.id}
                          className="flex items-center  cursor-pointer p-4 rounded-lg hover:bg-white transition-all duration-200 border-2 border-transparent hover:border-blue-200 hover:shadow-sm"
                        >
                          <Checkbox
                            className="w-6 h-6 rounded border-2"
                            checked={checkboxId === item.id}
                            onClick={() => setCheckboxId(item.id)}
                          />
                          <span className="text-base font-medium text-gray-700">
                            {item.name}
                          </span>
                        </Label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  {t("Cancel")}
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                {t("Save changes")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
