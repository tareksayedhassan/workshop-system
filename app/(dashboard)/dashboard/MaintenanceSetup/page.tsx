"use client";
import { CreateSelectFactory } from "@/src/components/CustomUi/Factory/ReactSelectSearch";
import ModelsCrud from "@/src/components/CustomUi/Models/ModelsCrud";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useGetBrand } from "@/src/Hooks/ReactQuery/Beands/useGetBrand";
import { useGetModel } from "@/src/Hooks/ReactQuery/Models/useGetModel";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaBox } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import ShowByMaintenance from "@/src/components/CustomUi/Models/Show/ShowByMaintenance";
import ShowByProducts from "@/src/components/CustomUi/Models/Show/ShowByProducts";
import { BreadcrumbCollapsed } from "@/src/components/CustomUi/BreadCrumb";
import { useGetModelById } from "@/src/Hooks/ReactQuery/Models/useGetModelById";

const page = () => {
  const [Brand, SetBrand] = useState("");
  const [ShowMode, setShowMode] = useState<"Maintenance" | "Products">(
    "Maintenance"
  );

  const [Model, SetModel] = useState<{ label: string; value: any } | null>(
    null
  );
  const { data: BrandsData } = useGetBrand();
  const { data: ModelsData } = useGetModelById(Number(Brand));
  const { t } = useTranslation();

  const modelsoptions = ModelsData?.data?.map((item: any) => ({
    label: `${item.modelName} - ${item.engineCC} `,
    value: item.id,
  }));

  return (
    <div>
      <div className="pb-2">
        <BreadcrumbCollapsed />
      </div>
      <Card className="mt-1">
        <CardHeader className="text-right space-y-2 p-6  rounded-xl ">
          <CardTitle className="text-3xl font-bold text-gray-300 tracking-wide">
            {t("Preparing maintenance schedules")}
          </CardTitle>
          <span className="text-gray-600 text-sm sm:text-base font-medium block">
            {t(
              "Select a brand and model to view and edit its maintenance schedule"
            )}
          </span>
        </CardHeader>

        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex w-full justify-between ">
              <div className="space-y-2">
                <Label
                  htmlFor="productStatus"
                  className="text-sm font-medium text-gray-700"
                ></Label>
                <div className="w-full">
                  <CreateSelectFactory
                    label={t("Select the model")}
                    onChange={(option) => SetModel(option)}
                    options={modelsoptions}
                    placeholder={t("Select a Model")}
                    value={Model}
                  />
                </div>
              </div>
              <div className="space-y-2 ">
                <Label
                  htmlFor="Brand"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("Select the brand")}
                </Label>
                <Select
                  value={Brand}
                  onValueChange={(value) => {
                    SetBrand(value), SetModel(null);
                  }}
                >
                  <SelectTrigger
                    id="Brand"
                    className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm py-1.5 w-60"
                  >
                    <SelectValue placeholder={t("Select a status")} />
                  </SelectTrigger>
                  <SelectContent>
                    {BrandsData?.data.map((item: any) => (
                      <SelectItem value={item.id}>
                        {t(`${item.cate_name}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-3">
              <ModelsCrud
                carId={Number(Brand)}
                ModelId={Number(Model?.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-5 flex justify-between items-center">
        <div className="flex gap-3 mt-3">
          <Button
            className="cursor-pointer bg-blue-400"
            onClick={() => setShowMode("Products")}
          >
            {t("show by Products")} <FaBox />
          </Button>
          <Button
            className="cursor-pointer bg-blue-400"
            onClick={() => setShowMode("Maintenance")}
          >
            {t("show by maintenance")} <CiBoxList />
          </Button>
        </div>
        {Model && (
          <p className="text-right text-gray-800 text-lg font-medium mt-2">
            <span className="font-semibold text-gray-500">
              {Model?.label || ""}
            </span>
            {t("Setting up the maintenance schedule for model")}
          </p>
        )}
      </div>
      {ShowMode === "Maintenance" && Model ? (
        <ShowByMaintenance
          BrandId={Number(Brand)}
          ModelId={Number(Model?.value)}
        />
      ) : null}
      {ShowMode === "Products" && <ShowByProducts />}
    </div>
  );
};

export default page;
