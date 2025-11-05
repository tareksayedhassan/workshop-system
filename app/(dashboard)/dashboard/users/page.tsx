"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import { Input } from "@/src/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import Pagention from "@/src/components/CustomUi/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import AddNewuser, { User } from "@/src/components/CustomUi/users/AddNewuser";
import useGetUsersSWR from "@/src/Hooks/useSWR/users/useGetUsersSWR";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";
import useUpdateUserSWR from "@/src/Hooks/useSWR/users/useUpdateUserSWR";
import { SpinerLoading } from "@/src/components/CustomUi/SpinerLoading";
import useDeleteUserSWR from "@/src/Hooks/useSWR/users/useDeleteUserSWR";
import { useTranslate } from "@/public/localization";

const UsersPage = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [EditButton, setEditButton] = useState<boolean>(false);
  const [LocalUsers, setLoacalUsers] = useState<User[]>([]);
  const { data, isLoading, mutate, error } = useGetUsersSWR({
    currentPage,
    rowsPerPage,
  });
  const { updatedData } = useUpdateUserSWR({ mutate });
  const { handelDelete } = useDeleteUserSWR({ mutate });
  const totalItems = data?.total || 0;
  const users = data?.data || [];
  const { userId } = useGetuserId();
  const t = useTranslate();
  useEffect(() => {
    if (users && users.length !== LocalUsers.length) {
      setLoacalUsers(users);
    }
  }, [users, LocalUsers.length]);

  const updateUser = (user: User) => {
    updatedData(user);
  };

  if (isLoading) return <SpinerLoading />;
  if (error)
    return (
      <div className="text-center text-red-500 py-4">
        {t("something_went_wrong")}
      </div>
    );

  return (
    <>
      <div
        dir="rtl"
        className="container  p-4 space-y-6 max-w-6xl mx-auto min-h-screen "
      >
        <Card className="shadow-md border-none rounded-lg">
          <CardContent className="p-4">
            <div className="text-right mb-4 border-b pb-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {t("users management")}
              </h1>
            </div>
            <Table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700 py-3 px-4 text-center border-l border-gray-200">
                    {t("name")}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-3 px-4 text-center border-l border-gray-200">
                    {t("email")}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-3 px-4 text-center border-l border-gray-200">
                    {t("role")}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-3 px-4 text-center">
                    {t("actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LocalUsers.map((tra: any, index: number) => (
                  <TableRow
                    key={`${tra.id}-${index}`}
                    className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-center border-l border-gray-100">
                      {!EditButton ? (
                        <span className="font-medium text-gray-800">
                          {tra.name}
                        </span>
                      ) : (
                        <div className="flex justify-center">
                          <Input
                            className="w-32 text-center text-sm"
                            value={tra.name}
                            onChange={(e) => {
                              const newUers = [...LocalUsers];
                              newUers[index].name = e.target.value;
                              setLoacalUsers(newUers);
                            }}
                          />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-center border-l border-gray-100">
                      {!EditButton ? (
                        <span className="text-gray-600 text-sm truncate block max-w-[150px] mx-auto">
                          {tra.email || "--"}
                        </span>
                      ) : (
                        <div className="flex justify-center">
                          <Input
                            className="w-40 text-center text-sm"
                            value={tra.email}
                            onChange={(e) => {
                              const newUers = [...LocalUsers];
                              newUers[index].email = e.target.value;
                              setLoacalUsers(newUers);
                            }}
                          />
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="py-3 px-4 text-center border-l border-gray-100">
                      {!EditButton ? (
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            tra.role === "ReaderAndwrater"
                              ? "bg-blue-100 text-blue-800"
                              : tra.role === "Wrater"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tra.role === "ReaderAndwrater"
                            ? t("ADMIN")
                            : tra.role === "Wrater"
                            ? t("USER")
                            : "--"}
                        </span>
                      ) : (
                        <div className="flex justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-sm min-w-[80px]"
                              >
                                {tra.role === "ReaderAndwrater"
                                  ? t("ADMIN")
                                  : tra.role === "Wrater"
                                  ? t("USER")
                                  : "اختر"}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              className="w-32"
                              align="center"
                            >
                              <DropdownMenuLabel className="text-center">
                                {t("select the role")}
                              </DropdownMenuLabel>
                              <DropdownMenuGroup>
                                <DropdownMenuItem
                                  onClick={() => {
                                    const newUsers = [...LocalUsers];
                                    newUsers[index].role = "ReaderAndwrater";
                                    setLoacalUsers(newUsers);
                                  }}
                                  className="justify-center"
                                >
                                  {t("ADMIN")}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    const newUsers = [...LocalUsers];
                                    newUsers[index].role = "Wrater";
                                    setLoacalUsers(newUsers);
                                  }}
                                  className="justify-center"
                                >
                                  {t("USER")}
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-center">
                      {tra.id !== userId ? (
                        <div className="flex justify-center gap-2 flex-wrap">
                          <Button
                            variant="destructive"
                            className="text-xs px-3 py-1 h-8 min-w-[60px] cursor-pointer"
                            onClick={() => handelDelete(tra.id)}
                          >
                            {t("delete")}
                          </Button>
                          {!EditButton ? (
                            <Button
                              variant="outline"
                              className="text-xs px-3 py-1 h-8 min-w-[60px] border-yellow-300 text-yellow-700 hover:bg-yellow-50 cursor-pointer"
                              onClick={() => setEditButton(!EditButton)}
                            >
                              {t("edit")}
                            </Button>
                          ) : (
                            <Button
                              variant="default"
                              className="text-xs px-3 py-1 h-8 min-w-[80px] bg-green-600 hover:bg-green-700 cursor-pointer"
                              onClick={() => {
                                updateUser(tra);
                                setEditButton(!EditButton);
                              }}
                            >
                              {t("save")}
                            </Button>
                          )}
                        </div>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                          {t("current user")}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-3">
              <Pagention
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                rowsPerPage={rowsPerPage}
                totalItems={totalItems}
              />
            </div>
          </CardContent>
        </Card>
        <AddNewuser mutate={mutate} isLoading={isLoading} />
      </div>
    </>
  );
};

export default UsersPage;
