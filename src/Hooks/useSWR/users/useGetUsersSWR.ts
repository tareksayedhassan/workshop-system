import React from "react";
import { fetcher } from "../fetcher";
import { BASE_URL, users } from "@/src/services/page";
import useSWR from "swr";
interface IProps {
  currentPage: number;
  rowsPerPage: number;
}
const useGetUsersSWR = ({ currentPage, rowsPerPage }: IProps) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${BASE_URL}/${users}?page=${currentPage}&pageSize=${rowsPerPage}`,
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export default useGetUsersSWR;
