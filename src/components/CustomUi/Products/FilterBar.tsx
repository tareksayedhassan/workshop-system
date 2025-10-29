import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFilter, FaCar } from "react-icons/fa";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface IStatus {
  status: "all" | "available" | "unavailable";
}

const FilterBar = () => {
  const [status, setStatus] = useState<IStatus["status"]>("all");
  const [model, setModel] = useState<string>("all");
  const { t } = useTranslation();

  const statuses = ["all", "available", "unavailable"] as const;

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-5">
      <div className="flex items-center justify-end gap-6">
        {/* Filter by Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {statuses.map((s) => (
              <Button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer
                  ${
                    status === s
                      ? "bg-blue-500 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-400 hover:text-white"
                  }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-gray-700 whitespace-nowrap">
              {t("filter using status")}
            </h2>
            <FaFilter className="text-lg text-gray-600" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-300"></div>

        {/* Filter by Model */}
        <div className="flex items-center gap-4">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("select model")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="hatchback">Hatchback</SelectItem>
              <SelectItem value="coupe">Coupe</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-gray-700 whitespace-nowrap">
              {t("filter using model")}
            </h2>
            <FaCar className="text-lg text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
