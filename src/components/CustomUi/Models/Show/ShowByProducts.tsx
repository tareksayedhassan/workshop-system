"use client";
import { useTranslate } from "@/public/localization";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import useGetProductsForshowByProducts from "@/src/Hooks/ReactQuery/ProductSetup/useGetProductsForshowByProducts";
import { useProductSearch } from "@/src/store/Products/useProductSearch";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import DialogMaintenance from "./DialogMaintenance";

const ShowByProducts = ({ BrandId, ModelId }: any) => {
  const [search, setSearch] = useState("");
  const [open, setIsOpen] = useState(false);
  const t = useTranslate();
  const { searchQuery, setSearhQuery } = useProductSearch();
  const { data } = useGetProductsForshowByProducts(searchQuery, BrandId);
  const [Products, setProducts] = useState<any>([]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchQuery);
  };

  useEffect(() => {
    if (data?.data?.length !== Products?.length) {
      setProducts(data?.data);
    }
  }, [data]);
  const filterData = Products?.map((item: any) => ({
    ...item,
    price: item.price.find((i: any) => i.BrandId === BrandId)?.price ?? 0,
  }));
  return (
    <Card className="container mx-auto py-4 mt-10">
      <CardContent>
        <div className="w-full flex justify-end items-center mt-10">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium text-base sm:text-sm"
          >
            {t("search")}
          </button>
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-3xl px-4"
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder={t("search by Product Name or Product Code")}
                value={searchQuery}
                onChange={(e) => setSearhQuery(e.target.value)}
                className="pr-12 sm:pr-10 py-3 sm:py-2 bg-white border border-gray-300 rounded-lg w-full text-base sm:text-sm"
              />
            </div>
          </form>
        </div>
        <ScrollArea className="h-96 w-full mt-5">
          <div className="flex flex-col gap-4">
            {filterData?.map((item: any) => (
              <div
                key={item.id}
                className="bg-gradient-to-b from-gray-100 to-gray-50 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  {/* الدايلوج على الشمال */}
                  <div>
                    <DialogMaintenance
                      BrandId={BrandId}
                      ModelId={ModelId}
                      Product={item}
                    />
                  </div>

                  {/* المعلومات على اليمين */}
                  <div className="flex flex-col text-right">
                    <h1 className="text-2xl font-semibold mb-3">{item.name}</h1>

                    <div className="flex items-center gap-5 justify-end">
                      <p className="text-gray-600">{item.productCode}</p>
                      <p className="font-bold text-lg">{item?.price} EGP</p>
                      <p className="text-sm text-gray-500">{item?.Status}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ShowByProducts;
