"use client";
import { useMemo } from "react";

export function useCalcMaintenanceDetails({ Maping }: any) {
  const totalBeForTax = useMemo(
    () =>
      Maping?.reduce(
        (acc: number, item: any) => acc + (Number(item.total) || 0),
        0
      ) || 0,
    [Maping]
  );

  const totalWithTax = useMemo(
    () =>
      Maping?.reduce(
        (acc: number, item: any) => acc + (Number(item.total) || 0) * 1.14,
        0
      ) || 0,
    [Maping]
  );

  const totalTax = useMemo(
    () =>
      Maping?.reduce(
        (acc: number, item: any) => acc + (Number(item.total) || 0) * 0.14,
        0
      ) || 0,
    [Maping]
  );

  return { totalBeForTax, totalWithTax, totalTax };
}
