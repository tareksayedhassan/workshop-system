"use client";
import { BreadcrumbCollapsed } from "@/src/components/CustomUi/BreadCrumb";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import UseTitlePage from "@/src/Hooks/UseTitlePage";
import Image from "next/image";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoSettings, IoCheckmarkCircle } from "react-icons/io5";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";
import { useAddBrand } from "@/src/Hooks/ReactQuery/Beands/useAddBrand";
import { toast } from "sonner";

const Page = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  UseTitlePage({ title: "Brands" });
  const { t } = useTranslation();
  const { userId } = useGetuserId();
  const { mutate: addNewBrand } = useAddBrand();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      droppedFile.type.match(/image\/(png|jpeg|jpg|svg\+xml)/)
    ) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };
  const HandelAdd = () => {
    const formData = new FormData();
    formData.append("cate_name", name);
    if (file) {
      formData.append("Brand_logo", file);
    }
    formData.append("note", note);
    formData.append("addedById", String(userId));
    addNewBrand(
      { formData },
      {
        onSuccess: () => {
          toast.success("create Brand successfully");
          setName("");
          setFile(undefined);
          setPreview("");
          setNote("");
        },
        onError: (err: any) => {
          toast.error(err.response.data.message);
        },
      }
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="pt-3 pb-6">
          <BreadcrumbCollapsed />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-slate-200 dark:border-slate-700 pb-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[#00ff99] to-emerald-500 rounded-xl shadow-lg">
                <HiSparkles className="w-6 h-6 text-slate-900" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00ff99] to-emerald-500 bg-clip-text text-transparent">
                {t("Brands")}
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm pl-14">
              {t("Create Brand and Upload Logo")}
            </p>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:rotate-90 duration-300"
          >
            <IoSettings className="w-5 h-5" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Card */}
          <Card className="rounded-2xl border-2 border-[#00ff99] shadow-lg hover:shadow-[0_0_30px_rgba(0,255,153,0.3)] transition-shadow duration-300 bg-white dark:bg-slate-900">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff99]/10 rounded-full">
                    <div className="w-2 h-2 bg-[#00ff99] rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-[#00ff99]">
                      {t("Upload Zone")}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    {t("Select Logo to upload")}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t("Supported formats: PNG, JPEG, SVG")}
                  </p>
                </div>

                {/* Upload Area */}
                <div className="relative">
                  <label
                    htmlFor="file-upload"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center w-full h-64 border-3 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                      isDragging
                        ? "border-[#00ff99] bg-[#00ff99]/10 scale-[1.02]"
                        : "border-[#00ff99] bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 hover:from-emerald-100/50 hover:to-teal-100/50 dark:hover:from-emerald-900/30 dark:hover:to-teal-900/30"
                    }`}
                  >
                    {preview ? (
                      <div className="relative w-full h-full flex items-center justify-center p-4">
                        <div className="relative">
                          <Image
                            src={preview}
                            width={200}
                            height={200}
                            alt="preview"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                          />
                          <div className="absolute -top-2 -right-2 bg-[#00ff99] rounded-full p-1.5 shadow-lg">
                            <IoCheckmarkCircle className="w-5 h-5 text-slate-900" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="p-4 bg-[#00ff99]/10 rounded-full transition-colors">
                          <FiUploadCloud className="w-16 h-16 text-[#00ff99]" />
                        </div>
                        <div className="text-center">
                          <span className="text-slate-600 dark:text-slate-300 font-medium">
                            {t("Click to upload or drag and drop")}
                          </span>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Max size: 5MB
                          </p>
                        </div>
                      </div>
                    )}
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".png, .jpg, .jpeg, .svg"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {file && (
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-[#00ff99]/20 rounded-lg flex items-center justify-center">
                        <IoCheckmarkCircle className="w-5 h-5 text-[#00ff99]" />
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-300 font-medium truncate">
                        {file.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setFile(undefined);
                        setPreview("");
                      }}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg ml-2"
                    >
                      <FiX className="w-5 h-5" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Form Card */}
          <Card className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-900">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="brand-name"
                    className="text-base font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2"
                  >
                    <div className="w-1 h-5 bg-[#00ff99] rounded-full"></div>
                    {t("Brand Name")}
                  </Label>
                  <Input
                    id="brand-name"
                    placeholder={t("Enter Brand Name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-[#00ff99] focus:ring-2 focus:ring-[#00ff99]/20 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="notes"
                    className="text-base font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2"
                  >
                    <div className="w-1 h-5 bg-[#00ff99] rounded-full"></div>
                    {t("Notes")}
                  </Label>
                  <Textarea
                    id="notes"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={t("Add any additional notes...")}
                    className="min-h-[200px] rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-[#00ff99] focus:ring-2 focus:ring-[#00ff99]/20 transition-colors resize-none"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <Button
                    onClick={() => HandelAdd()}
                    className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#00ff99] to-emerald-500 hover:from-[#00ff99]/90 hover:to-emerald-500/90 text-slate-900 font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(0,255,153,0.4)] transition-all duration-300"
                  >
                    {t("Save Brand")}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    {t("Cancel")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
