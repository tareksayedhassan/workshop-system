import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { usegetMaintenance } from "@/src/Hooks/ReactQuery/Maintenance/usegetMaintenance";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaBox } from "react-icons/fa";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { AddToMaintenanceTabel } from "./EditMaintenanceTabel/AddToMaintenanceTabel";

const ShowByMaintenance = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { data: Maintenance = [] } = usegetMaintenance();
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {Maintenance?.data?.map((model: any) => (
          <Card
            key={model.id}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="text-right">{model.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-right">
                <p className="flex gap-2 items-center justify-end">
                  {`${model.productId || 0}`} {t("product")} <FaBox />
                </p>
                <p className="flex gap-2 items-center justify-end mt-3 text-[20px]">
                  <LiaFileInvoiceDollarSolid />
                </p>
                <div className="mt-3 flex gap-2 justify-end"></div>
              </div>

              <Button
                size="lg"
                className="w-full  bg-blue-400 cursor-pointer"
                onClick={() => setOpen(true)}
              >
                Products
              </Button>
            </CardContent>
          </Card>
        ))}
        <AddToMaintenanceTabel open={open} setopen={setOpen} />
      </div>
    </div>
  );
};

export default ShowByMaintenance;
