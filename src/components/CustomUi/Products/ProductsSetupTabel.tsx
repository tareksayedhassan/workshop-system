"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import useGetproductSetup from "@/src/Hooks/ReactQuery/ProductSetup/useGetModelByBrandId";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductStatus } from "@/src/store/Products/useStatus.store";
import { useProductModels } from "@/src/store/Products/useModels.store";
import { useProductSearch } from "@/src/store/Products/useProductSearch";
import { Check, Save } from "lucide-react";
import { Badge } from "../../ui/badge";
import axios from "axios";
import { useupdateProduct } from "@/src/Hooks/ReactQuery/ProductSetup/useupdateProduct";
import { Input } from "../../ui/input";
import { useProductPrice } from "@/src/Hooks/ReactQuery/ProductPrice/useupdateProductPrice";
import { number } from "zod";
import { toast } from "sonner";
import { useTranslate } from "@/public/localization";

import useGEtProductSWR from "@/src/Hooks/useSWR/Products/useGEtProductSWR";
import Loding from "../Loding";
import useDeleteProductSWR from "@/src/Hooks/useSWR/Products/useDeleteProduct";
import Pagention from "../pagination";
import { Button } from "../../ui/button";
import { BASE_URL, ProductsSetup } from "@/src/services/page";
type PriceObject = {
  [key: string]: any;
};

const ProductsSetupTabel = () => {
  const [page, setpage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const { model } = useProductModels();
  const { searchQuery } = useProductSearch();
  const { mutateAsync: updateProduct } = useupdateProduct();
  const { mutateAsync: updateProductPrice } = useProductPrice();
  const { Status } = useProductStatus();
  const [EditbyId, setEditbyid] = useState<number | null>(null);
  const [LocalData, setLcoalData] = useState<any>([]);
  const [events, setEvent] = useState<
    "updatePricEevent" | "updateProductEvent" | ""
  >("");
  const { data, isLoading, mutate } = useGEtProductSWR({
    querySearch: searchQuery,
    page: currentPage,
    Status,
  });
  const t = useTranslate();

  const ShowProduct = data?.data || [];
  const { Delete } = useDeleteProductSWR(mutate);
  const HandelDelete = async (id: number) => {
    Delete(id);
  };

  const formattedProducts = ShowProduct.map((product: any) => {
    const prices: PriceObject = {
      cate_name: undefined,
    };
    product.price.forEach((p: PriceObject) => {
      if (p.Brands) {
        prices[p.Brands.cate_name] = {
          id: p.id,
          value: p.price,
        };
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
      priceId: product?.prices?.id,
    };
  });
  useEffect(() => {
    if (formattedProducts.length !== LocalData.length) {
      setLcoalData(formattedProducts);
    }
  }, [formattedProducts]);
  const handleToggleStatus = async (id: number, currentStatus: string) => {
    const newStatus =
      currentStatus === "available" ? "unavailable" : "available";
    try {
      await updateProduct({
        id: Number(id),
        Status: newStatus,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const HandelUpdate = async (item: any) => {
    try {
      if (events === "updatePricEevent") {
        const pricesArray = Object.values(item.prices)
          .filter(Boolean)
          .map((i) => i as { id: number; value: string });

        await Promise.all(
          pricesArray.map((price) =>
            updateProductPrice({
              id: price.id,
              price: Number(price.value),
            }),
          ),
        );
        toast.success(t(`price updated successfully`));
      }
      if (events === "updateProductEvent") {
        await axios.patch(`${BASE_URL}/${ProductsSetup}/${item.id}`, {
          productName: item.name,
          productCode: item.productCode,
          Model: item.Model,
        });
        toast.success("Product updated successfully");
      }

      setEditbyid(null);
    } catch (error) {
      toast.error("error updating prices");
      console.error(error);
    }
  };
  const handleUpdateProduct = async (item: any) => {
    try {
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      console.error("Error updating product");
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-56">
        <Loding />
      </div>
    );
  }
  return (
    <div dir="rtl" className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[100px] text-right">#</TableHead>
            <TableHead className="w-[100px] text-right">
              {t("Product Code")}
            </TableHead>
            <TableHead className="text-right">{t("Product Name")}</TableHead>
            <TableHead className="text-right">{t("Product Status")}</TableHead>
            <TableHead className="text-right">{t("Audi Price")}</TableHead>{" "}
            <TableHead className="text-right">
              {t("Volkswagen Price")}
            </TableHead>
            <TableHead className="text-right">{t("Seat Price")}</TableHead>
            <TableHead className="text-right">{t("Skoda Price")}</TableHead>
            <TableHead className="text-right">{t("model")}</TableHead>
            <TableHead className="text-right">{t("Action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LocalData.length > 0 &&
            LocalData?.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-right">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium text-right">
                  {EditbyId === item.id && events === "updateProductEvent" ? (
                    <Input
                      className=" w-28
    text-center
    text-gray-800
    bg-gray-50
    border border-gray-300
    rounded-lg
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-blue-400
    focus:border-blue-400
    transition-all
    duration-200
    placeholder:text-gray-400
  "
                      type="text"
                      value={item?.productCode}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        const updateData = [...LocalData];
                        updateData[index].productCode = newValue;
                        setLcoalData(updateData);
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => {
                        (setEditbyid(item.id), setEvent("updateProductEvent"));
                      }}
                      className="cursor-pointer"
                    >
                      {item.productCode}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {EditbyId === item.id && events === "updateProductEvent" ? (
                    <Input
                      className=" w-28
    text-center
    text-gray-800
    bg-gray-50
    border border-gray-300
    rounded-lg
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-blue-400
    focus:border-blue-400
    transition-all
    duration-200
    placeholder:text-gray-400
  "
                      type="text"
                      value={item?.name}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        const updateData = [...LocalData];
                        updateData[index].name = newValue;
                        setLcoalData(updateData);
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => {
                        (setEditbyid(item.id), setEvent("updateProductEvent"));
                      }}
                      className="cursor-pointer"
                    >
                      {item.name}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    onClick={() => handleToggleStatus(item.id, item.Status)}
                    className={`cursor-pointer ${
                      item.Status === "available"
                        ? "bg-green-400 hover:bg-green-500"
                        : "bg-red-400 hover:bg-red-500"
                    }`}
                  >
                    {item.Status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {EditbyId === item.id && events === "updatePricEevent" ? (
                    <Input
                      className="w-20"
                      type="number"
                      value={item?.prices?.Audi?.value}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        const updateData = [...LocalData];
                        updateData[index].prices.Audi.value = newValue;
                        setLcoalData(updateData);
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => {
                        (setEditbyid(item.id), setEvent("updatePricEevent"));
                      }}
                      className="cursor-pointer"
                    >
                      {item?.prices?.Audi?.value}
                    </div>
                  )}
                </TableCell>{" "}
                <TableCell className="text-right">
                  {EditbyId === item.id && events === "updatePricEevent" ? (
                    <Input
                      className="w-20"
                      type="number"
                      value={item?.prices?.Volkswagen?.value}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        const updateData = [...LocalData];
                        updateData[index].prices.Volkswagen.value = newValue;
                        setLcoalData(updateData);
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => {
                        (setEditbyid(item.id), setEvent("updatePricEevent"));
                      }}
                      className="cursor-pointer"
                    >
                      {item?.prices?.Volkswagen?.value}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {EditbyId === item.id && events === "updatePricEevent" ? (
                    <Input
                      className="w-20"
                      type="number"
                      value={item?.prices?.Seat?.value}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        const updateData = [...LocalData];
                        updateData[index].prices.Seat.value = newValue;
                        setLcoalData(updateData);
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => {
                        (setEditbyid(item.id), setEvent("updatePricEevent"));
                      }}
                      className="cursor-pointer"
                    >
                      {item?.prices?.Seat?.value}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {EditbyId === item.id && events === "updatePricEevent" ? (
                    <Input
                      className="w-20"
                      type="number"
                      value={item?.prices?.Skoda?.value}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        const updateData = [...LocalData];
                        updateData[index].prices.Skoda.value = newValue;
                        setLcoalData(updateData);
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => {
                        (setEditbyid(item.id), setEvent("updatePricEevent"));
                      }}
                      className="cursor-pointer"
                    >
                      {item?.prices?.Skoda?.value}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {EditbyId === item.id && events === "updateProductEvent" ? (
                    <Input
                      className=" w-28
    text-center
    text-gray-800
    bg-gray-50
    border border-gray-300
    rounded-lg
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-blue-400
    focus:border-blue-400
    transition-all
    duration-200
    placeholder:text-gray-400
  "
                      type="text"
                      value={item?.Model}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        const updateData = [...LocalData];
                        updateData[index].Model = newValue;
                        setLcoalData(updateData);
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => {
                        (setEditbyid(item.id), setEvent("updateProductEvent"));
                      }}
                      className="cursor-pointer"
                    >
                      {item.Model}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center">
                    <button
                      onClick={() => HandelDelete(item.id)}
                      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
                      aria-label="delete"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>{" "}
                    <button
                      onClick={() => HandelUpdate(item)}
                      className="p-2 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200  cursor-pointer"
                      aria-label="save"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagention
        currentPage={currentPage}
        rowsPerPage={15}
        totalItems={data?.total}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ProductsSetupTabel;
