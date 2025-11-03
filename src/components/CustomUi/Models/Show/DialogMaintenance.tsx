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
  const [checkboxId, setCheckboxId] = useState<any>([]);
  const t = useTranslate();
  const [open, setOpen] = useState(false);
  const { userId } = useGetuserId();
  const toggleSelectAll = () => {
    const allIds = Maintenance?.data?.map((item: any) => item.id) || [];
    if (checkboxId.length === allIds.length) {
      setCheckboxId([]); // الغي الاختيار لو الكل متختار
    } else {
      setCheckboxId(allIds); // اختار الكل
    }
  };

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <DialogTrigger asChild>
            <div>
              <Button className="bg-blue-400 cursor-pointer">
                {t("Maintenance allocation for products")}
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-[700px] min-h-[500px]">
            <DialogHeader>
              <div className="flex justify-between items-center w-full">
                <Button
                  className="bg-blue-400 hover:bg-blue-500 w-32 cursor-pointer"
                  onClick={() => toggleSelectAll()}
                >
                  {t("Select All")}
                </Button>
                <DialogTitle className="text-lg font-semibold">
                  Edit profile
                </DialogTitle>
              </div>
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
                  {Maintenance?.data?.map((item: any) => (
                    <div key={item.id}>
                      <Label className="flex gap-3 items-center cursor-pointer">
                        <Checkbox
                          className="w-5 h-5"
                          checked={checkboxId.includes(item.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setCheckboxId([...checkboxId, item.id]);
                            } else {
                              setCheckboxId(
                                checkboxId.filter(
                                  (id: number) => id !== item.id
                                )
                              );
                            }
                          }}
                        />
                        <span className="text-base">{item.name}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={() => handleSave()}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
