"use client";
export const dynamic = "force-dynamic";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Trash2, ArrowRight, X, Loader2 } from "lucide-react";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { useAddMaintenanceProducts } from "@/src/Hooks/ReactQuery/MaintenanceProducts/useAddMaintenanceProducts";
import { useTranslate } from "@/public/localization";
import { usegetMaintenanceProducts } from "@/src/Hooks/ReactQuery/MaintenanceProducts/usegetMaintenanceProducts";
import { useDeleteMaintenanceProducts } from "@/src/Hooks/ReactQuery/MaintenanceProducts/useDeleteMaintenanceProducts";
import useGetProductsSearchQuery from "@/src/Hooks/ReactQuery/Maintenance/useGetProductsSearchQuery";
import { useDebounce } from "@/src/Hooks/useDebounce";
import useGEtProductSWR from "@/src/Hooks/useSWR/Products/useGEtProductSWR";
import useGEtProductShowForMaintenanceSWR from "@/src/Hooks/useSWR/Products/useGEtProductShowForMaintenanceSWR ";
import axios from "axios";
import { BASE_URL, MaintenanceTable } from "@/src/services/page";

interface AddToMaintenanceTabelProps {
  open: boolean;
  setopen: (open: boolean) => void;
  BrandId: number;
  SelectData: any;
  ModelId: number;
}

export function AddToMaintenanceTabel({
  open,
  setopen,
  BrandId,
  SelectData,
  ModelId,
}: AddToMaintenanceTabelProps) {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchQuery, setSearch] = useState("");
  const { data: ProductData } = useGEtProductShowForMaintenanceSWR({
    BrandId,
    querySearch: searchQuery,
  });
  const allProducts = ProductData?.data || [];
  const filterData = allProducts.map((item: any) => ({
    ...item,
    price: item.price.find((i: any) => i.BrandId === BrandId)?.price ?? 0,
  }));
  console.log("from table", filterData);
  const { mutateAsync: AddMaintenanceProducts } = useAddMaintenanceProducts();
  const { mutateAsync: DeleteMaintenanceProducts } =
    useDeleteMaintenanceProducts();
  const t = useTranslate();
  const { data } = usegetMaintenanceProducts(BrandId, SelectData.id);
  const { userId, token } = useGetuserId();
  const products = data?.data || [];

  const mirage = useMemo(() => {
    const all = [...selectedItems, ...(products || [])];
    const unique = all.filter(
      (item, index, self) => index === self.findIndex((i) => i.id === item.id)
    );
    return unique;
  }, [selectedItems, products]);
  const addItem = (item: any) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev;
      console.log("itemAdded", item);
      const flatItem = {
        id: item.id,
        productId: item.productId ?? item.id,
        name: item.name,
        productCode: item.productCode,
        Quantity: 1,
        price: item.price ?? 0,
        Model: item.Model,
        Status: item.Status,
      };

      return [...prev, flatItem];
    });
  };

  const removeItem = (id: number) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handelDelete = async (id: number) => {
    try {
      await DeleteMaintenanceProducts(id, {
        onSuccess: () => {
          toast.success(t("Maintenance item deleted successfully"));
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || t("Error"));
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handelMangeDelete = (item: any) => {
    if (selectedItems.find((i) => i.id === item.id)) {
      removeItem(item.id);
    } else {
      handelDelete(item.id);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    setSelectedItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, Quantity: quantity } : i))
    );
  };

  const handleSave = async () => {
    if (selectedItems.length === 0) {
      toast.info(t("No items to save"));
      return;
    }
    try {
      await AddMaintenanceProducts(
        {
          carId: Number(BrandId),
          Products: selectedItems.map((item) => ({
            Quantity: Number(item.Quantity) || 1,
            ProductId: Number(item.productId),
            price: Number(item.price),
          })),
          userId: Number(userId),
          km: SelectData.name,
          MaintenanceTableId: Number(SelectData.id),
          ModeleId: Number(ModelId),
        },
        {
          onSuccess: () => {
            toast.success(t("Maintenance items updated successfully"));
            setopen(false);
            setSelectedItems([]);
            setSearch("");
          },
          onError: (error: any) => {
            toast.error(error.response?.data?.message || t("Error saving"));
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };
  const DeleteMaintenance = async () => {
    window.confirm(t("Are you sure you want to delete this maintenance?"));
    try {
      const res = await axios.delete(
        `${BASE_URL}/${MaintenanceTable}/${SelectData.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success(t("Maintenance deleted successfully"));
        setopen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent className="max-w-[98vw] w-full h-[80vh] p-0 rounded-2xl border-0 shadow-2xl overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-semibold">
            <div className="flex justify-between items-center">
              <h1>{t("Add Maintenance Items")}</h1>
              <h1>{SelectData.name}</h1>
            </div>
          </DialogTitle>
          <DialogDescription className="text-base opacity-70">
            {t("Select items to add to maintenance")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 h-full">
          <div className="border-r p-4 flex flex-col">
            <div className="mb-4 relative">
              <Input
                placeholder={t("Search available items...")}
                value={searchQuery}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 pr-10"
              />
            </div>

            <div className="flex-1 overflow-y-auto border rounded-lg bg-white shadow-sm">
              <ScrollArea className="h-72 w-full">
                <div className="flex flex-wrap gap-3 justify-end p-2">
                  {filterData.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex flex-col w-full justify-between border rounded-lg p-3 hover:bg-gray-50 transition-colors text-gray-700 text-right relative group"
                    >
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => addItem(item)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>

                      <div className="flex flex-col gap-2 items-end">
                        <h2 className="font-medium text-gray-800">
                          {item.name}
                        </h2>
                        <div className="flex items-center gap-1">
                          <span>{t("Code")} :</span>
                          <span className="text-md">
                            {item.productCode || "-"}
                          </span>
                        </div>
                        <span className="text-sm">
                          {t("Price")}: {item.price ?? "-"}
                        </span>
                        <span className="text-sm">
                          {t("Status")}:
                          <span
                            className={`px-1 mx-1 rounded text-xs ${
                              item.Status === "available"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {t(item.Status)}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="p-4 flex flex-col h-full bg-gray-50">
            <div className="flex-1 overflow-hidden border rounded-xl flex flex-col shadow-sm">
              <div className="bg-blue-50 border-b rounded-t-xl p-2">
                <div className="text-gray-700 font-semibold text-xs">
                  {t("Selected Items")} ({mirage.length})
                </div>
              </div>

              <ScrollArea className="h-72 w-full rounded-md border">
                <div className="p-2">
                  {mirage.length === 0 ? (
                    <div className="flex justify-center items-center w-full h-32 text-gray-400 italic text-xs">
                      {t("No items selected")}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {mirage.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col border border-gray-200 rounded-md p-3 bg-white shadow-sm hover:shadow transition-shadow duration-150 text-xs"
                        >
                          <h2 className="font-medium text-gray-800 text-right text-lg">
                            {item?.name || item?.Products?.name}
                          </h2>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handelMangeDelete(item)}
                                className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                value={item.Quantity || 1}
                                onChange={(e) =>
                                  updateQuantity(
                                    item.id,
                                    Number(e.target.value) || 1
                                  )
                                }
                                min={1}
                                className="w-20 h-8 text-center text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-300"
                              />
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <span className="font-medium text-black">
                                {item.price ??
                                  item?.Products?.price?.[0]?.price ??
                                  "-"}
                              </span>
                              <span className="text-gray-600">
                                {item?.productCode ||
                                  item?.Products?.productCode}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 border-t bg-gray-50 flex justify-start items-center gap-4">
          <div>
            <Button
              className="w-fit bg-red-400 hover:bg-red-600 cursor-pointer h-11 rounded-xl px-4 font-medium"
              onClick={() => DeleteMaintenance()}
            >
              X
            </Button>
          </div>

          <div className="flex-1"></div>

          <div className="flex gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-2 px-6 font-medium"
              >
                {t("cancel")}
              </Button>
            </DialogClose>
            <Button
              onClick={handleSave}
              disabled={selectedItems.length === 0}
              className="h-11 rounded-xl px-6 font-medium shadow-md disabled:opacity-50"
            >
              {t("save")}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
