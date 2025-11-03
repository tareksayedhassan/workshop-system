"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { FaRegEdit, FaSave } from "react-icons/fa";
import AddUserDialog from "@/src/components/CustomUi/users/addNewUser";
import { toast } from "sonner";

const Page = () => {
  const pages = ["Users", "Products", "Orders", "Reports", "Settings"];
  const permissions = ["Create", "Read", "Update", "Delete"];

  const [access, setAccess] = useState<Record<string, Record<string, boolean>>>(
    () =>
      Object.fromEntries(
        pages.map((page) => [
          page,
          Object.fromEntries(permissions.map((p) => [p, false])),
        ])
      )
  );

  const [selectedUser, setSelectedUser] = useState({
    name: "User num",
    role: "Admin",
    level: "كامل",
  });

  const togglePermission = (page: string, perm: string) => {
    setAccess((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [perm]: !prev[page][perm],
      },
    }));
  };

  const handleSavePermissions = () => {
    console.log("Saving permissions:", access);
    toast.success("تم حفظ الصلاحيات بنجاح");
  };

  return (
    <div dir="rtl" className="p-6">
      <div className="mb-4">
        <AddUserDialog />
      </div>

      <Card className="w-60 mb-6 shadow-sm">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-gray-700">
            <h1 className="text-base">معلومات المستخدم</h1>
            <FaRegEdit className="cursor-pointer hover:text-blue-500 transition-colors" />
          </CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-gray-600 space-y-1">
          <h1 className="font-semibold">الاسم: {selectedUser.name}</h1>
          <p>الدور: {selectedUser.role}</p>
          <p>مستوى الصلاحيات: {selectedUser.level}</p>
        </CardContent>
      </Card>

      <div className="flex justify-end mb-3">
        <Button
          onClick={handleSavePermissions}
          className="bg-green-500 text-white hover:bg-green-600 rounded-lg px-6 transition-all duration-300"
        >
          <FaSave className="ml-2" />
          حفظ التغييرات
        </Button>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-center border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-right border-b">الصفحة</th>
              {permissions.map((perm, i) => (
                <th key={i} className="py-3 px-4 border-b">
                  {perm}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pages.map((page, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="py-3 px-4 font-medium text-gray-800 text-right">
                  {page}
                </td>
                {permissions.map((perm, j) => (
                  <td key={j} className="py-3 px-4">
                    <button
                      onClick={() => togglePermission(page, perm)}
                      className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                        access[page][perm]
                          ? "bg-blue-500 border-blue-600"
                          : "border-gray-300 hover:border-blue-400"
                      }`}
                    ></button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
