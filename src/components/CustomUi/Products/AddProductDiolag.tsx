"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { useTranslation } from "react-i18next";
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

interface FormData {
  productCode: string;
  productName: string;
  productStatus: "available" | "unavailable" | "";
  prices: Record<string, string>;
}

const brands = ["Audi", "Seat", "Skoda", "Volkswagen"];

const AddProductDialog = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    productCode: "",
    productName: "",
    productStatus: "",
    prices: brands.reduce((acc, brand) => ({ ...acc, [brand]: "" }), {}),
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handlePriceChange = (brand: string, value: string) => {
    setFormData({
      ...formData,
      prices: { ...formData.prices, [brand]: value },
    });
    if (errors.prices) {
      setErrors({ ...errors, prices: "" });
    }
  };

  const handleStatusChange = (value: "available" | "unavailable") => {
    setFormData({ ...formData, productStatus: value });
    if (errors.productStatus) {
      setErrors({ ...errors, productStatus: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.productCode.trim()) {
      newErrors.productCode = t("Product code is required");
    }
    if (!formData.productName.trim()) {
      newErrors.productName = t("Product name is required");
    }
    if (!formData.productStatus) {
      newErrors.productStatus = t("Product status is required");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          {t("Add New Product")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center text-gray-800">
            {t("Add New Product")}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            {t("Fill in the product information below")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productCode">{t("Product Code")}</Label>
                  <Input
                    id="productCode"
                    value={formData.productCode}
                    onChange={(e) => handleInputChange(e, "productCode")}
                    placeholder={t("Enter product code")}
                    className={errors.productCode ? "border-red-500" : ""}
                  />
                  {errors.productCode && (
                    <p className="text-red-500 text-sm">{errors.productCode}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productName">{t("Product Name")}</Label>
                  <Input
                    id="productName"
                    value={formData.productName}
                    onChange={(e) => handleInputChange(e, "productName")}
                    placeholder={t("Enter product name")}
                    className={errors.productName ? "border-red-500" : ""}
                  />
                  {errors.productName && (
                    <p className="text-red-500 text-sm">{errors.productName}</p>
                  )}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="productStatus">{t("Product Status")}</Label>
                  <Select
                    value={formData.productStatus}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger
                      id="productStatus"
                      className={errors.productStatus ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder={t("Select a status")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">
                        {t("Available")}
                      </SelectItem>
                      <SelectItem value="unavailable">
                        {t("Unavailable")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.productStatus && (
                    <p className="text-red-500 text-sm">
                      {errors.productStatus}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-center text-gray-800">
                {t("Prices by Brand")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brands.map((brand) => (
                  <div key={brand} className="space-y-2">
                    <Label htmlFor={`price-${brand}`}>
                      {t(`${brand} Price`)}
                    </Label>
                    <Input
                      id={`price-${brand}`}
                      type="number"
                      value={formData.prices[brand]}
                      onChange={(e) => handlePriceChange(brand, e.target.value)}
                      placeholder={t("Enter price")}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-100"
              onClick={() =>
                setFormData({
                  productCode: "",
                  productName: "",
                  productStatus: "",
                  prices: brands.reduce(
                    (acc, brand) => ({ ...acc, [brand]: "" }),
                    {}
                  ),
                })
              }
            >
              {t("Cancel")}
            </Button>
            <Button
              className="bg-green-600 text-white hover:bg-green-700 transition-colors"
              onClick={handleSubmit}
            >
              {t("Save Product")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
