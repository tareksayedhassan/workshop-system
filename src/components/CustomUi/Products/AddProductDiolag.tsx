"use client";
export const dynamic = "force-dynamic";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";
import { useAddProduct } from "@/src/Hooks/ReactQuery/ProductSetup/useAddProduct";
import { toast } from "sonner";
import { useGetBrand } from "@/src/Hooks/ReactQuery/Beands/useGetBrand";
const AddProductDialog = () => {
  const [productCode, setProductCode] = useState("");
  const [name, setName] = useState("");
  const [Model, setModel] = useState("");

  const [status, setStatus] = useState<"available" | "unavailable" | "">("");
  const { userId } = useGetuserId();
  const [prices, setPrices] = useState<{ [brandId: number]: string }>({});

  const { mutateAsync } = useAddProduct();
  const { data } = useGetBrand();

  const handleSubmit = async () => {
    try {
      mutateAsync(
        {
          name,
          price: prices,
          productCode,
          Status: status,
          userId: Number(userId),
          Model,
        },
        {
          onSuccess: () => {
            toast.success("product created successfully"),
              setProductCode(""),
              setName(""),
              setModel(""),
              setStatus(""),
              setPrices({});
          },
          onError: (err: any) => {
            toast.error(err.response.data.message);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-400 text-white hover:bg-blue-500 rounded-xl px-6 py-1.5 transition-all duration-300 hover:scale-105">
          Add New Product
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl w-full p-4 rounded-2xl bg-gradient-to-b from-gray-50 to-white shadow-lg backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-center text-gray-800">
            Add New Product
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500 text-sm font-normal">
            Fill in the product information below
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Card className="border-none shadow-sm rounded-xl bg-white hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label
                    htmlFor="productCode"
                    className="text-sm font-medium text-gray-700"
                  >
                    Product Code
                  </Label>
                  <Input
                    id="productCode"
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                    placeholder={"Enter product code"}
                    className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm py-1.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="productName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </Label>
                  <Input
                    id="productName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={"Enter product name"}
                    className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm py-1.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="model"
                    className="text-sm font-medium text-gray-700"
                  >
                    Model
                  </Label>
                  <Input
                    id="model"
                    value={Model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder={"Enter model"}
                    className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm py-1.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="productStatus"
                    className="text-sm font-medium text-gray-700"
                  >
                    Product Status
                  </Label>
                  <Select
                    value={status}
                    onValueChange={(value) =>
                      setStatus(value as "available" | "unavailable" | "")
                    }
                  >
                    <SelectTrigger
                      id="productStatus"
                      className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm py-1.5"
                    >
                      <SelectValue placeholder={"Select a status"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl bg-white hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-1">
              <CardTitle className="text-base font-medium text-center text-gray-800">
                Prices by Brand
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {data?.data?.map((brand: any) => (
                  <div key={brand.id} className="space-y-2">
                    <Label>{brand.cate_name} Price</Label>
                    <Input
                      type="number"
                      value={prices[brand.id] || ""}
                      onChange={(e) =>
                        setPrices((prev) => ({
                          ...prev,
                          [brand.id]: e.target.value,
                        }))
                      }
                      placeholder={`Enter price for ${brand.cate_name}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 cursor-pointer">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="bg-green-400 text-white hover:bg-green-500 rounded-xl px-6 py-1.5 transition-all duration-300 hover:scale-105  cursor-pointer"
              onClick={() => handleSubmit()}
            >
              Save Product
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
