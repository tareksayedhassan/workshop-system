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
type PriceObject = {
  [key: string]: any;
};

const ProductsSetupTabel = () => {
  const [page, setpage] = useState(1);
  const [search, setsearch] = useState("");
  const { t } = useTranslation();
  const { data } = useGetproductSetup(page, search);
  const ShowProduct = data?.data || [];
  const formattedProducts = ShowProduct.map((product: any) => {
    const prices: PriceObject = {
      cate_name: undefined,
    };
    product.price.forEach((p: PriceObject) => {
      if (p.Brands) {
        prices[p.Brands.cate_name] = p.price;
      }
    });

    return {
      id: product.id,
      name: product.name,
      productCode: product.productCode,
      Status: product.Status,
      Model: product.Model,
      addedById: product.addedById,
      updatedById: product.updatedById,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      prices,
    };
  });

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
          {formattedProducts.length > 0 &&
            formattedProducts?.map((item: any, index: number) => (
              <TableRow>
                <TableCell className="font-medium" key={index}>
                  {item.productCode}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.Status}</TableCell>
                <TableCell className="text-right">{item.prices.odie}</TableCell>
                <TableCell className="text-right">
                  {item.prices.syeat}
                </TableCell>
                <TableCell className="text-right">
                  {item.prices.scoda}
                </TableCell>
                <TableCell className="text-right">{item.prices.flox}</TableCell>
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
