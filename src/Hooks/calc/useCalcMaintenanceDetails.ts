"use client";
import { useMemo } from "react";

export function useCalcMaintenanceDetails({ Maping }: any) {
  const totalBeForTax = useMemo(() => {
    if (!Maping) return 0;
    const total = Maping.reduce((acc: any, item: any) => {
      return acc + item.total;
    }, 0);
    return total;
  }, [Maping]);
  const totalWithTax = useMemo(() => {
    if (!Maping) return 0;

    const total = Maping.reduce((acc: any, item: any) => {
      const tax = item.total * 0.14;
      return acc + item.total + tax;
    }, 0);
    return total;
  }, [Maping]);
  const totalTax = useMemo(() => {
    if (!Maping) return 0;

    const total = Maping.reduce((acc: any, item: any) => {
      const tax = item.total * 0.14;

      return acc + tax;
    }, 0);
    return total;
  }, [Maping]);

  return { totalBeForTax, totalWithTax, totalTax };
}
