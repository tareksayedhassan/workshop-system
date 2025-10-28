"use client";
import React from "react";
import ReactSelect from "react-select";

type OptionType = {
  value: number | string;
  label: string;
};

type SelectFactoryProps = {
  label: string;
  value: OptionType | null;
  options: OptionType[];
  onChange: (option: OptionType | null) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
};

export function CreateSelectFactory(props: SelectFactoryProps) {
  const {
    label,
    value,
    options,
    onChange,
    onInputChange,
    placeholder = "اختر...",
  } = props;

  return (
    <div className="w-50">
      <label className="block mb-3 font-medium text-gray-700">{label}</label>
      <ReactSelect
        value={value}
        options={options}
        onChange={onChange}
        onInputChange={(inputValue, { action }) => {
          if (action === "input-change" && onInputChange)
            onInputChange(inputValue);
        }}
        placeholder={placeholder}
        isClearable
        menuPortalTarget={
          typeof document !== "undefined" ? document.body : undefined
        }
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        filterOption={(option, input) =>
          option.label
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(
              input
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
        }
      />
    </div>
  );
}
