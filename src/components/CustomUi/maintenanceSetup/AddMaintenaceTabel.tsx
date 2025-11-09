"use client";
export const dynamic = "force-dynamic";

import React, { useState } from "react";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { CheckCircle2, XCircle } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";
import { toast } from "sonner";
import { useTranslate } from "@/public/localization";
import { Label } from "../../ui/label";
import axios from "axios";
import { BASE_URL, MaintenanceTable } from "@/src/services/page";
const MaintenanceCrud = ({ ModelId }: { ModelId: number }) => {
  const [MaintenanceName, SetMaintenanceName] = useState("");
  const t = useTranslate();

  const [ButtonMode, setButtonmode] = useState<"show" | "hide">("hide");
  const { userId, token } = useGetuserId();
  const handleAddMaintenance = async () => {
    try {
      if (!ModelId) {
        return toast.error("Please make sure to select a model.");
      }
      if (MaintenanceName === "") {
        return toast.error("Please make sure to enter a maintenance name.");
      }
      const res = await axios.post(
        `${BASE_URL}/${MaintenanceTable}`,
        {
          modelId: ModelId,
          name: MaintenanceName,
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success(t("maintenance added successfully"));
        setButtonmode("hide");
        SetMaintenanceName("");
      }
    } catch (err) {
      toast.error("Invalid input data");
    }
  };

  return (
    <div className="mt-3">
      <div className="flex flex-wrap md:flex-nowrap gap-3 items-center flex-row-reverse mt-3">
        <Button
          onClick={() => setButtonmode("show")}
          className="cursor-pointer bg-blue-400"
        >
          {t("Add Maintenance Table")}
          <FaPlus />
        </Button>
        {ButtonMode === "show" && (
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-3 ">
            <div className="flex gap-3">
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
                  handleAddMaintenance();
                }}
              >
                <CheckCircle2 size={30} strokeWidth={2.5} />
              </Button>
            </div>
            <Input
              value={MaintenanceName}
              onChange={(e) => SetMaintenanceName(e.target.value)}
              placeholder={t("Maintenance Table Name")}
              className="w-50"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceCrud;
