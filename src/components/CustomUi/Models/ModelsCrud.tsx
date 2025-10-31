"use client";
export const dynamic = "force-dynamic";

import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { CheckCircle2, XCircle } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useAddModel } from "@/src/Hooks/ReactQuery/Models/useAddModel";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";
import { toast } from "sonner";
import { EditModel } from "./EditModel";
import { useDeleteModelById } from "@/src/Hooks/ReactQuery/Models/useDeleteModelById";
import { ModelsSchema } from "@/src/zodVaildate/ZodSchema";
const ModelsCrud = ({ carId, ModelId }: { carId: number; ModelId: number }) => {
  const [modelName, setmodelName] = useState("");
  const [engineCC, setengineCC] = useState(0);
  const [open, setopen] = useState(false);

  const [ButtonMode, setButtonmode] = useState<"show" | "hide">("hide");
  const { t } = useTranslation();
  const { mutateAsync: addmModel } = useAddModel();
  const { userId } = useGetuserId();
  const { mutateAsync } = useDeleteModelById();
  const handleAddModel = async () => {
    try {
      const validated = ModelsSchema.parse({
        carId: Number(carId),
        engineCC: Number(engineCC),
        modelName: modelName,
        userId: Number(userId),
      });

      await addmModel(validated, {
        onSuccess: () => {
          toast.success(t("model added successfully"));
          setmodelName("");
          setengineCC(0);
        },
        onError: (err: any) => {
          toast.error(err.response.data.message);
        },
      });
    } catch (err) {
      toast.error("Invalid input data");
    }
  };

  const HandelDelete = async () => {
    try {
      await mutateAsync(
        { id: Number(ModelId), userId: Number(userId) },
        {
          onSuccess: () => {
            toast.success(`${t("model deleted successfully")}`);
          },
          onError: (err: any) => {
            toast.error(err.response.data.message);
          },
        }
      );
    } catch (err) {
      toast.error("Invalid input data");
    }
  };
  return (
    <div className="mt-3">
      <div className="flex gap-3 items-center flex-row-reverse mt-3">
        <Button
          onClick={() => setButtonmode("show")}
          className="cursor-pointer bg-blue-400"
        >
          {t("Add model")} <FaPlus />
        </Button>
        {ButtonMode === "show" && (
          <div className="flex justify-between items-center gap-3 ">
            <div className="flex gap-3">
              <EditModel open={open} setopen={setopen} ModelId={ModelId} />

              <span className="text-gray-300 text-xl select-none">|</span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setButtonmode("hide")}
                className="text-red-500 hover:bg-red-100 transition-transform hover:scale-110 cursor-pointer icon-with-line"
              >
                <XCircle size={30} strokeWidth={2.5} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-green-500 hover:bg-green-100 transition-transform hover:scale-110 cursor-pointer"
                onClick={() => {
                  handleAddModel();
                }}
              >
                <CheckCircle2 size={30} strokeWidth={2.5} />
              </Button>
            </div>

            <Input
              value={engineCC}
              onChange={(e) => setengineCC(Number(e.target.value))}
              placeholder={t("Engine CC")}
              type="number"
              className="w-30"
            />
            <Input
              value={modelName}
              onChange={(e) => setmodelName(e.target.value)}
              placeholder={t("Model name")}
              className="w-50"
            />
          </div>
        )}
        <div className="flex items-center ">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => HandelDelete()}
            className="flex items-center gap-2 text-red-500 hover:bg-red-100 transition-transform hover:scale-105"
          >
            <FiTrash2 size={20} />
            <span>{t("Delete")}</span>
          </Button>{" "}
          <Button
            onClick={() => setopen(true)}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-blue-600 hover:bg-blue-100 transition-transform hover:scale-105"
          >
            <FiEdit2 size={20} />
            <span>{t("Edit")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModelsCrud;
