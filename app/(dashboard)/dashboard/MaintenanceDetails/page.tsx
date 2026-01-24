"use client";
export const dynamic = "force-dynamic";

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
import { useGetBrand } from "@/src/Hooks/ReactQuery/Beands/useGetBrand";
import { useState } from "react";
import MaintenanceDetailsTabel from "@/src/components/CustomUi/MaintenanceDetails/MaintenanceDetailsTabel";
import { useGetMaintenance } from "@/src/Hooks/ReactQuery/Maintenance/useGetMaintenance";
import { Button } from "@/src/components/ui/button";
import { useTranslate } from "@/public/localization";
import Link from "next/link";
import { useGetModelById } from "@/src/Hooks/ReactQuery/Models/useGetModelById";
import { useGetModelByBrandId } from "@/src/Hooks/ReactQuery/Models/useGetModelByBrandId";
import { CreateSelectFactory } from "@/src/components/CustomUi/Factory/ReactSelectSearch";
import { useSelectBrand } from "@/src/store/Brands/useSelectBrand";
import Image from "next/image";
import useGetLang from "@/src/Hooks/useGetLang";

const page = () => {
  const [Model, SetModel] = useState<{ label: string; value: any } | null>(
    null,
  );
  const { SelectBrand } = useSelectBrand();

  const [MaintenanceValue, setMaintenanceValue] = useState("");
  const [Maintenanceobject, setMaintenanceobject] = useState({});
  const { lang } = useGetLang();
  const { data: ModelsData = [] } = useGetModelByBrandId(
    Number(SelectBrand?.id),
  );
  const { data: Maintenance = [] } = useGetMaintenance({
    ModelId: Number(Model?.value),
    BrandId: Number(SelectBrand?.id),
  });
  const t = useTranslate();
  const showModels = Array.isArray(ModelsData?.data) ? ModelsData.data : [];
  const modelsoptions = showModels?.map((item: any) => ({
    label: `${item.modelName}  ${item.engineCC} `,
    value: item.id,
  }));
  return (
    <div className="mt-3" dir={lang === "ar" ? "rtl" : "ltr"}>
      <Card>
        <CardHeader className="align-r">
          <CardTitle className="flex justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl text-gray-600">
                {SelectBrand?.cate_name}
              </h1>
              <Image
                src={`/uploads/${SelectBrand?.Brand_logo}`}
                width={100}
                height={100}
                alt="logo"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <div>
              <Link href="/dashboard">
                <Button> {t("Home")}</Button>
              </Link>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center gap-8 mt-6 flex-wrap mx-20">
            <div className="space-y-3">
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
                    placeholder={"Select a Model"}
                    value={Model}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="Maintenance"
                className="text-lg font-medium text-gray-700"
              >
                {t("Select the Maintenance")}
              </Label>
              <Select
                disabled={Model === null}
                value={MaintenanceValue}
                onValueChange={(value) => {
                  setMaintenanceValue(value);
                  setMaintenanceobject(value);
                }}
              >
                <SelectTrigger
                  id="Maintenance"
                  className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-base py-6 px-5 w-96 h-14"
                >
                  <SelectValue placeholder="Select a Maintenance" />
                </SelectTrigger>
                <SelectContent>
                  {Maintenance?.data?.map((item: any) => (
                    <SelectItem key={item.id} value={item}>
                      {item.name}
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
