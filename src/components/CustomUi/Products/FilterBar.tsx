"use client";
export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { FaFilter, FaCar } from "react-icons/fa";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useProductStatus } from "@/src/store/Products/useStatus.store";
import { useGetModel } from "@/src/Hooks/ReactQuery/Models/useGetModel";
import { useProductModels } from "@/src/store/Products/useModels.store";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import { useProductSearch } from "@/src/store/Products/useProductSearch";
import { useTranslate } from "@/public/localization";
import useGEtProductSWR from "@/src/Hooks/useSWR/Products/useGEtProductSWR";
const FilterBar = () => {
  const { data: Models } = useGetModel();
  const [search, setSearch] = useState("");
  const { Status, setStatus } = useProductStatus();
  const { model, setModel } = useProductModels();
  const { searchQuery, setSearhQuery } = useProductSearch();
  const { mutate } = useGEtProductSWR();
  const t = useTranslate();
  console.log(Status);
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchQuery);
  };
  return (
    <div className="w-full bg-gray-50 rounded-xl shadow-sm border border-gray-200 px-6 py-5">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <FaCar className="text-xl text-gray-600" />
          <h2 className="text-base font-semibold text-gray-700 whitespace-nowrap">
            {t("filter using model")}
          </h2>
          <Select
            value={model}
            onValueChange={setModel}
            defaultValue="select a model"
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="select model" />
            </SelectTrigger>
            <SelectContent>
              {Models?.data?.map((item: any) => (
                <SelectItem key={item.modelName} value={item.modelName}>
                  {item.modelName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-8 w-px bg-gray-300"></div>

        <div className="flex items-center gap-4">
          <FaFilter className="text-xl text-gray-600" />
          <h2 className="text-base font-semibold text-gray-700 whitespace-nowrap">
            {t("filter using status")}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              className="bg-white text-gray-700 hover:bg-blue-500 hover:text-white border border-gray-200"
              onClick={() => {
                setStatus(""), mutate();
              }}
            >
              {t("all")}
            </Button>
            <Button
              onClick={() => {
                setStatus("available"), mutate();
              }}
              className="bg-white text-gray-700 hover:bg-blue-500 hover:text-white border border-gray-200"
            >
              {t("available")}
            </Button>
            <Button
              onClick={() => {
                setStatus("unavailable"), mutate();
              }}
              className="bg-white text-gray-700 hover:bg-blue-500 hover:text-white border border-gray-200"
            >
              {t("unavailable")}
            </Button>
          </div>
        </div>

        <div className="flex-1 max-w-md" dir="rtl">
          <form onSubmit={handleSearchSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={t("search by Product Name or Product Code")}
                value={searchQuery}
                onChange={(e) => setSearhQuery(e.target.value)}
                className="pr-10 bg-white border-gray-200"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
            >
              {t("search")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
