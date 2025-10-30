"use client";
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
import { useTranslation } from "react-i18next";
import useGetproductSetup from "@/src/Hooks/ReactQuery/ProductSetup/useGetproductSetup";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductStatus } from "@/src/store/Products/useStatus.store";
import { useProductModels } from "@/src/store/Products/useModels.store";
import { useProductSearch } from "@/src/store/Products/useProductSearch";
import { Save } from "lucide-react";
import { Badge } from "../../ui/badge";
import axios from "axios";
import { useupdateProduct } from "@/src/Hooks/ReactQuery/ProductSetup/useupdateProduct";
import { Input } from "../../ui/input";
import { useProductPrice } from "@/src/Hooks/ReactQuery/ProductPrice/useupdateProductPrice";
import { number } from "zod";
import { toast } from "sonner";
import { useDeleteProduct } from "@/src/Hooks/ReactQuery/ProductSetup/useDeleteProduct";

type PriceObject = {
  [key: string]: any;
};

const ProductsSetupTabel = () => {
  const [page, setpage] = useState(1);
  const { t } = useTranslation();
  const { model } = useProductModels();
  const { searchQuery } = useProductSearch();
  const { mutate: updateProduct } = useupdateProduct();
  const { mutateAsync: updateProductPrice } = useProductPrice();
  const { mutate: deleteproduct } = useDeleteProduct();
  const { Status } = useProductStatus();
  const [EditbyId, setEditbyid] = useState<number | null>(null);
  const { data } = useGetproductSetup(page, searchQuery, Status, model);
  const [LocalData, setLcoalData] = useState<any>([]);

  const ShowProduct = data?.data || [];

  const HandelDelete = (id: number) => {
    console.log(id);
    deleteproduct(
      { id: id },
      {
        onSuccess: () => {
          toast.success(`${t("product deleted successfully")}`);
        },
        onError: (err: any) => {
          toast.error(err.response.data.message);
        },
      }
    );
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
    updateProduct({
      id: Number(id),
      Status: newStatus,
    });
  };
  const HandelUpdate = async (item: any) => {
    const pricesArray = Object.values(item.prices)
      .filter(Boolean)
      .map((i) => i as { id: number; value: string });

    try {
      await Promise.all(
        pricesArray.map((price) =>
          updateProductPrice({
            id: price.id,
            price: Number(price.value),
          })
        )
      );

      toast.success(`${t("price updated successfully")}`);
      setEditbyid(null);
    } catch (error) {
      toast.error(`${t("error updating prices")}`);
      console.error(error);
    }
  };

  return (
    <div dir="rtl" className="w-full overflow-x-auto">
      <Table>
        <TableCaption>قائمة بأحدث الفواتير</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[100px] text-right">
              {t("Product Code")}
            </TableHead>
            <TableHead className="text-right">{t("Product Name")}</TableHead>
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
          {LocalData.length > 0 &&
            LocalData?.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-right">
                  {item.productCode}
                </TableCell>
                <TableCell className="text-right">{item.name}</TableCell>
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
                  {EditbyId === item.id ? (
                    <Input
                      className="w-20"
                      type="number"
                      value={item?.prices?.odie.value}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        const updateData = [...LocalData];
                        updateData[index].prices.odie.value = newValue;
                        setLcoalData(updateData);
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => setEditbyid(item.id)}
                      className="cursor-pointer"
                    >
                      {item.prices.odie.value}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {EditbyId === item.id ? (
                    <Input
                      className="w-20"
                      type="number"
                      value={item?.prices?.syeat.value}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        const updateData = [...LocalData];
                        updateData[index].prices.syeat.value = newValue;
                        setLcoalData(updateData);
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => setEditbyid(item.id)}
                      className="cursor-pointer"
                    >
                      {item.prices.syeat.value}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {EditbyId === item.id ? (
                    <Input
                      className="w-20"
                      type="number"
                      value={item?.prices?.scoda.value}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        const updateData = [...LocalData];
                        updateData[index].prices.scoda.value = newValue;
                        setLcoalData(updateData);
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => setEditbyid(item.id)}
                      className="cursor-pointer"
                    >
                      {item.prices.scoda.value}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {EditbyId === item.id ? (
                    <Input
                      className="w-20"
                      type="number"
                      value={item?.prices?.flox.value}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        const updateData = [...LocalData];
                        updateData[index].prices.flox.value = newValue;
                        setLcoalData(updateData);
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => setEditbyid(item.id)}
                      className="cursor-pointer"
                    >
                      {item.prices.flox.value}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">{item.Model}</TableCell>
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
    </div>
  );
};

export default ProductsSetupTabel;
