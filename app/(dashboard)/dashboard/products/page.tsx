"use client";
import { BreadcrumbCollapsed } from "@/src/components/CustomUi/BreadCrumb";
import AddProductDiolag from "@/src/components/CustomUi/Products/AddProductDiolag";
import FilterBar from "@/src/components/CustomUi/Products/FilterBar";
import ProductsSetupTabel from "@/src/components/CustomUi/Products/ProductsSetupTabel";
import React from "react";
import { useTranslation } from "react-i18next";
import { GrHostMaintenance } from "react-icons/gr";

const page = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="pt-3 pb-6">
        <BreadcrumbCollapsed />
      </div>
      <div className="border-b-2 border-gray-200 flex justify-between items-center">
        <div className="mb-3">
          <AddProductDiolag />
        </div>
        <div className="flex  gap-2 pb-3 items-center ">
          {t("Product Setup")}

          <GrHostMaintenance />
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-1">
          <FilterBar />
        </div>
        <ProductsSetupTabel />
      </div>
    </div>
  );
};

export default page;
