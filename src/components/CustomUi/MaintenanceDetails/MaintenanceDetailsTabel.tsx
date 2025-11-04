"use client";
export const dynamic = "force-dynamic";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { useCalcMaintenanceDetails } from "@/src/Hooks/calc/useCalcMaintenanceDetails";
import { useTranslate } from "@/public/localization";
const MaintenanceDetailsTabel = ({ Maintenanceobject }: any) => {
  const invoices = Maintenanceobject.MaintenanceProducts;
  const Maping = invoices?.map((invoice: any) => {
    return {
      id: invoice.id,
      name: invoice?.Products.name,
      Quantity: invoice.Quantity,
      price: invoice?.Products?.price[0]?.price,
      total: invoice.Quantity * invoice.Products?.price[0]?.price,
      status: invoice?.Products.Status,
    };
  });
  const { totalBeForTax, totalWithTax, totalTax } = useCalcMaintenanceDetails({
    Maping,
  });
  const t = useTranslate();

  return (
    <div className="mt-10">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[200px] text-center">
              {t("Item Name")}
            </TableHead>
            <TableHead className="w-[120px] text-center">
              {"quantity"}
            </TableHead>
            <TableHead className="w-[140px] text-right">
              {t("unitPrice")}
            </TableHead>
            <TableHead className="w-[140px] text-right">{t("total")}</TableHead>
            <TableHead className="w-[120px] text-center">
              {t("status")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Maping?.map((invoice: any) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium text-center">
                {invoice.name}
              </TableCell>
              <TableCell className="text-center tabular-nums">
                {invoice.Quantity}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(invoice.price)}
              </TableCell>
              <TableCell className="text-right tabular-nums font-medium">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(invoice.total)}
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    invoice.status === "available"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {t("invoice.status")}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <div className=" text-black p-4 rounded-xl w-80 mr-auto ">
          <div className="flex justify-between mb-2 text-black">
            <span>{t("الإجمالي قبل الضريبة")}:</span>
            <span>{totalBeForTax}</span>
          </div>

          <div className="flex justify-between mb-3 text-black text-[17px]">
            <span>{t("tax")} (14%):</span>
            <span>{totalTax.toFixed(2)}</span>
          </div>

          <hr className="border-gray-300 mb-3" />

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-[#1e293b]">
              {t("finleTotal")}:
            </span>
            <span className="text-2xl font-bold text-gray-500">
              {totalWithTax}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDetailsTabel;
