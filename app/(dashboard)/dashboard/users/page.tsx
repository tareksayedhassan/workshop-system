"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { FaRegEdit, FaSave, FaUser } from "react-icons/fa";
import AddUserDialog from "@/src/components/CustomUi/users/addNewUser";
import { toast } from "sonner";
import { useGetUsers } from "@/src/Hooks/ReactQuery/users/useGetUsers";

const Page = () => {
  const pages = ["Users", "Products", "Orders", "Reports", "Settings"];
  const permissions = ["Create", "Read", "Update", "Delete"];
  const { data } = useGetUsers();
  const [selectedUser, setSelectedUser] = useState<any>(null);
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

  const handleSavePermissions = () => {
    toast.success("تم حفظ الصلاحيات بنجاح");
  };

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
  };

  return (
    <div dir="rtl" className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          إدارة المستخدمين
        </h1>
        <p className="text-gray-600 text-sm">
          قم بإدارة المستخدمين وتعيين الصلاحيات
        </p>
      </div>

      <div className="mb-6">
        <AddUserDialog />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {data?.data?.map((user: any, index: number) => (
          <Card
            key={index}
            onClick={() => handleSelectUser(user)}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              selectedUser?.name === user.name
                ? "ring-2 ring-blue-500 shadow-lg"
                : "shadow-sm"
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <FaRegEdit className="text-gray-400 hover:text-blue-500 transition-colors cursor-pointer" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <h3 className="font-bold text-gray-800 text-lg">{user.name}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">الدور:</span>
                  <span className="font-medium text-gray-700 bg-blue-50 px-2 py-1 rounded">
                    {user.role}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">المستوى:</span>
                  <span className="font-medium text-gray-700 bg-green-50 px-2 py-1 rounded">
                    {user.level}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedUser && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">المستخدم المحدد:</span>{" "}
            {selectedUser.name}
          </p>
        </div>
      )}

      <div className="flex justify-end mb-4">
        <Button
          onClick={handleSavePermissions}
          className="bg-green-500 text-white hover:bg-green-600 rounded-lg px-6 py-2 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <FaSave className="ml-2" />
          حفظ التغييرات
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardTitle className="text-gray-800">جدول الصلاحيات</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-center border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-4 px-6 text-right border-b font-semibold">
                    الصفحة
                  </th>
                  {permissions.map((perm, i) => (
                    <th key={i} className="py-4 px-4 border-b font-semibold">
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
                    <td className="py-4 px-6 font-medium text-gray-800 text-right">
                      {page}
                    </td>
                    {permissions.map((perm, j) => (
                      <td key={j} className="py-4 px-4">
                        <button
                          onClick={() => togglePermission(page, perm)}
                          className={`w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center mx-auto ${
                            access[page][perm]
                              ? "bg-blue-500 border-blue-600 shadow-md"
                              : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                          }`}
                        >
                          {access[page][perm] && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
