"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Label } from "@/src/components/ui/label";
import { useTranslation } from "react-i18next";
import { useGetBrand } from "@/src/Hooks/ReactQuery/Beands/useGetBrand";
import { useState } from "react";
import { useGetModelById } from "@/src/Hooks/ReactQuery/Models/useGetModelById";
import MaintenanceDetailsTabel from "@/src/components/CustomUi/MaintenanceDetails/MaintenanceDetailsTabel";
import { useGetMaintenance } from "@/src/Hooks/ReactQuery/Maintenance/useGetMaintenance";
import { Button } from "@/src/components/ui/button";

const page = () => {
  const { data: BrandsData } = useGetBrand();
  const [Brand, setBrand] = useState("");
  const [Model, setModel] = useState("");
  const [MaintenanceValue, setMaintenanceValue] = useState("");
  const [Maintenanceobject, setMaintenanceobject] = useState({});

  const { data: ModelsData = [] } = useGetModelById(Number(Brand));
  const { data: Maintenance = [] } = useGetMaintenance({
    ModelId: Number(Model),
    BrandId: Number(Brand),
  });
  const { t } = useTranslation();

  return (
    <div className="mt-3" dir="rtl">
      <Card>
        <CardHeader className="align-r">
          <CardTitle className="flex justify-between">
            <div>{t("Maintenance Details")}</div>
            <div>
              <Button> {t("Home")}</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center gap-8 mt-6 flex-wrap">
            {/* Select 1 */}
            <div className="space-y-3">
              <Label
                htmlFor="Brand"
                className="text-lg font-medium text-gray-700"
              >
                {t("Select the brand")}
              </Label>
              <Select value={Brand} onValueChange={(value) => setBrand(value)}>
                <SelectTrigger
                  id="Brand"
                  className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-base py-4 px-5 w-80 h-14"
                >
                  <SelectValue placeholder={t("Select a Brand")} />
                </SelectTrigger>
                <SelectContent>
                  {BrandsData?.data?.map((item: any) => (
                    <SelectItem key={item.id} value={item.id}>
                      {t(`${item.cate_name}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Select 2 */}
            <div className="space-y-3">
              <Label
                htmlFor="Model"
                className="text-lg font-medium text-gray-700"
              >
                {t("Select a Model")}
              </Label>
              <Select
                value={Model}
                onValueChange={(value) => setModel(value)}
                disabled={Brand === ""}
              >
                <SelectTrigger
                  id="Model"
                  className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-base py-4 px-5 w-80 h-14"
                >
                  <SelectValue placeholder={t("Select a Model")} />
                </SelectTrigger>
                <SelectContent>
                  {ModelsData?.data?.map((item: any) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.modelName
                        ? t(item.modelName)
                        : t("No models available for this brand")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="Maintenance"
                className="text-lg font-medium text-gray-700"
              >
                {t("Select the Maintenance")}
              </Label>
              <Select
                disabled={Model === ""}
                value={MaintenanceValue}
                onValueChange={(value) => setMaintenanceobject(value)}
              >
                <SelectTrigger
                  id="Maintenance"
                  className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-base py-4 px-5 w-80 h-14"
                >
                  <SelectValue placeholder={t("Select a Maintenance")} />
                </SelectTrigger>
                <SelectContent>
                  {Maintenance?.data
                    ?.filter((item: any) => item.MaintenanceProducts.length > 0)
                    .map((item: any) => (
                      <SelectItem key={item.id} value={item}>
                        {t(`${item.name}`)}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <MaintenanceDetailsTabel Maintenanceobject={Maintenanceobject} />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
