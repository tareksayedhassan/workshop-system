"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { FaRegEdit } from "react-icons/fa";

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

  const togglePermission = (page: string, perm: string) => {
    setAccess((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [perm]: !prev[page][perm],
      },
    }));
  };

  return (
    <div dir="rtl" className="p-6">
      <Card className="w-60 mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-gray-700">
            <h1>معلومات المستخدم</h1>
            <FaRegEdit />
          </CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-gray-600">
          <h1 className="font-semibold">الاسم: User num</h1>
          <p>الدور: Admin</p>
          <p>مستوى الصلاحيات: كامل</p>
        </CardContent>
      </Card>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-center border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-right">الصفحة</th>
              {permissions.map((perm, i) => (
                <th key={i} className="py-3 px-4">
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
                      className={`w-5 h-5 rounded-full border transition ${
                        access[page][perm]
                          ? "bg-blue-500 border-blue-600"
                          : "border-gray-300"
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
