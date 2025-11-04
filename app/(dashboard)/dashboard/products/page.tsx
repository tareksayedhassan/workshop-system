"use client";
import { useTranslate } from "@/public/localization";
import { BreadcrumbCollapsed } from "@/src/components/CustomUi/BreadCrumb";
import AddProductDiolag from "@/src/components/CustomUi/Products/AddProductDiolag";
import FilterBar from "@/src/components/CustomUi/Products/FilterBar";
import ProductsSetupTabel from "@/src/components/CustomUi/Products/ProductsSetupTabel";
import { BASE_URL, ProductsSetup } from "@/src/services/page";
import axios from "axios";
import React, { useState } from "react";
import { GrHostMaintenance } from "react-icons/gr";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const page = () => {
  const t = useTranslate();
  const [file, setFile] = useState<File | null>();

  const queryClient = useQueryClient();

  const HandileUpload = async () => {
    try {
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        `${BASE_URL}/${ProductsSetup}/fileUpload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("تم رفع الملف بنجاح ✅");

        // بعد رفع الملف بنجاح، عمل refetch للمنتجات
        queryClient.invalidateQueries({ queryKey: ["ProductsSetup"] });
      }
    } catch (error: any) {
      console.log(error);
      toast.error("حدث خطأ أثناء رفع الملف ❌");
    }
  };

  return (
    <div>
      <div>
        <input
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={(e) => {
            setFile(e.target.files![0]);
            HandileUpload();
          }}
        />
      </div>
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
