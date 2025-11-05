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
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";
import { toast } from "sonner";
import { useTranslate } from "@/public/localization";
import { useAddUser } from "@/src/Hooks/ReactQuery/users/useAddUser";

const AddUserDialog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"ReaderAndwrater" | "Wrater" | "">("");

  const t = useTranslate();
  const { userId } = useGetuserId();
  const { mutateAsync } = useAddUser();

  const handleSubmit = async () => {
    // التحقق من البيانات المطلوبة
    if (!email || !password || !name || !role) {
      toast.error(t("Please fill in all required fields"));
      return;
    }

    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t("Please enter a valid email address"));
      return;
    }

    if (password.length < 6) {
      toast.error(t("Password must be at least 6 characters"));
      return;
    }

    try {
      await mutateAsync(
        {
          email,
          password,
          name,
          role,
        },
        {
          onSuccess: () => {
            toast.success(t("User created successfully"));
            setEmail("");
            setPassword("");
            setName("");
            setRole("");
          },
          onError: (err: any) => {
            toast.error(
              err?.response?.data?.message || t("Error creating user")
            );
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.error(t("An error occurred"));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-400 text-white hover:bg-blue-500 rounded-xl px-6 py-1.5 transition-all duration-300 hover:scale-105">
          {t("Add New User")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl w-full p-4 rounded-2xl bg-gradient-to-b from-gray-50 to-white shadow-lg backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-center text-gray-800">
            {t("Add New User")}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500 text-sm font-normal">
            {t("Fill in the user information below")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Card className="border-none shadow-sm rounded-xl bg-white hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* الاسم */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t("Name")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("Enter name")}
                    className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm py-1.5"
                    required
                  />
                </div>

                {/* البريد الإلكتروني */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t("Email")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("Enter email address")}
                    className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm py-1.5"
                    required
                  />
                </div>

                {/* كلمة المرور */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t("Password")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("Enter password")}
                    className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm py-1.5"
                    required
                    minLength={6}
                  />
                </div>

                {/* الصلاحيات */}
                <div className="space-y-2">
                  <Label
                    htmlFor="role"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t("Role")} <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={role}
                    onValueChange={(value) =>
                      setRole(value as "Wrater" | "ReaderAndwrater" | "")
                    }
                  >
                    <SelectTrigger
                      id="role"
                      className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm py-1.5"
                    >
                      <SelectValue placeholder={t("Select role")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wrater">{t("Writer")}</SelectItem>
                      <SelectItem value="ReaderAndwrater">
                        {t("ReaderAndwrater")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* أزرار الحفظ والإلغاء */}
          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                {t("Cancel")}
              </Button>
            </DialogClose>
            <Button
              className="bg-green-400 text-white hover:bg-green-500 rounded-xl px-6 py-1.5 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={handleSubmit}
            >
              {t("Save User")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
