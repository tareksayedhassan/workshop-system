import React, { useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import useAddUserSWR from "@/src/Hooks/useSWR/users/useAddUserSWR";
import { useTranslate } from "@/public/localization";
export interface User {
  id: number;
  name: string;
  email: string;
  role: "Wrater" | "ReaderAndwrater";
}

const AddNewuser = ({ mutate, isLoading }: any) => {
  const [role, setUserRole] = useState("USER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const t = useTranslate();
  const { handleSubmit } = useAddUserSWR({
    email,
    mutate,
    name,
    password,
    role,
    setEmail,
    setName,
    setPassword,
    setUserRole,
  });

  return (
    <div className="container mx-auto py-4">
      <Card className="shadow-md border-none rounded-lg">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {t("Add New User")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-700 text-sm">{t("User Name")}</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label className="text-gray-700 text-sm">{t("Email")}</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label className="text-gray-700 text-sm">{t("Password")}</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label className="text-gray-700 text-sm">{t("role")}</Label>
              <select
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                value={role}
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option value="ReaderAndwrater">{t("ADMIN")}</option>
                <option value="Wrater">{t("USER")}</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm transition-colors cursor-pointer"
            >
              {isLoading ? "جارٍ الإرسال..." : "إضافة المستخدم"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewuser;
