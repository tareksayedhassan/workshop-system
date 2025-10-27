"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { useTranslation } from "react-i18next";
import useGetproductSetup from "@/src/Hooks/ReactQuery/ProductSetup/useGetproductSetup";
import { FaEdit } from "react-icons/fa";
const ProductsSetupTabel = () => {
  const [page, setpage] = useState(1);
  const [search, setsearch] = useState("");
  const { t } = useTranslation();
  const { data } = useGetproductSetup(page, search);
  const ShowProduct = data?.data || [];
  console.log(ShowProduct);
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px]">{t("Product Code")}</TableHead>
            <TableHead>{t("Product Name")}</TableHead>
            <TableHead className="text-right">{t("Product Status")}</TableHead>
            <TableHead className="text-right">{t("Audi Price")}</TableHead>
            <TableHead className="text-right">{t("Seat Price")}</TableHead>
            <TableHead className="text-right">{t("Skoda Price")}</TableHead>
            <TableHead className="text-right">
              {t("Volkswagen Price")}
            </TableHead>
            <TableHead className="text-right">{t("model")}</TableHead>
            <TableHead className="text-right">{t("Action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ShowProduct.length > 0 &&
            ShowProduct?.map((item: any, index: number) => (
              <TableRow>
                <TableCell className="font-medium" key={index}>
                  {item.productCode}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.Status}</TableCell>
                <TableCell className="text-right">{item.price_odie}</TableCell>
                <TableCell className="text-right">{item.price_syeat}</TableCell>
                <TableCell className="text-right">{item.price_scoda}</TableCell>
                <TableCell className="text-right">{item.price_flox}</TableCell>
                <TableCell className="text-right">{item.Model}</TableCell>
                <TableCell className="text-right">
                  <FaEdit className="inline-block text-blue-500 cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsSetupTabel;
