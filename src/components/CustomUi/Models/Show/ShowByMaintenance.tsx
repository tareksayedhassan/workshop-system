"use client";
export const dynamic = "force-dynamic";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import React, { useState } from "react";
import { FaBox } from "react-icons/fa";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { AddToMaintenanceTabel } from "./EditMaintenanceTabel/AddToMaintenanceTabel";
import { useGetMaintenance } from "@/src/Hooks/ReactQuery/Maintenance/useGetMaintenance";
import { usegetMaintenanceForSetup } from "@/src/Hooks/ReactQuery/Maintenance/usegetMaintenanceForSetup";
const ShowByMaintenance = ({ BrandId, ModelId }: any) => {
  const [open, setOpen] = useState(false);
  const [SelectData, setSelectdata] = useState({});

  const { data: Maintenance = [] } = usegetMaintenanceForSetup(
    ModelId,
    BrandId
  );
  const prices = Maintenance?.data;

  console.log(prices);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 ">
        {Maintenance?.data?.map((model: any) => (
          <Card
            key={model.id}
            className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader>
              <CardTitle className="text-right text-lg">{model.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-right space-y-3">
                <p className="flex gap-2 items-center justify-end text-gray-700">
                  <span className="font-semibold">
                    {`${model?.MaintenanceProducts?.reduce(
                      (total: number, product: any) => total + product.Quantity,
                      0
                    )}`}
                  </span>
                  product <FaBox className="text-blue-500" />
                </p>
                <p className="flex gap-2 items-center justify-end text-[20px] font-bold text-gray-800">
                  <span>
                    {`${model?.MaintenanceProducts?.reduce(
                      (total: number, product: any) =>
                        total +
                        product.Quantity *
                          (product?.Products?.price?.[0]?.price || 0) +
                        (product.tax || 0),
                      0
                    ).toFixed(2)}`}
                  </span>
                  <LiaFileInvoiceDollarSolid className="text-green-600" />
                </p>
              </div>

              <Button
                size="lg"
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer"
                onClick={() => {
                  setOpen(true);
                  setSelectdata(model);
                }}
              >
                "Products
              </Button>
            </CardContent>
          </Card>
        ))}
        <AddToMaintenanceTabel
          open={open}
          setopen={setOpen}
          BrandId={BrandId}
          SelectData={SelectData}
          ModelId={ModelId}
        />
      </div>
    </div>
  );
};

export default ShowByMaintenance;
