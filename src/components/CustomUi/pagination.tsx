"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { Button } from "@/src/components/ui/button";

type PagentionProps = {
  totalItems: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
};

const Pagention = ({
  totalItems,
  currentPage,
  setCurrentPage,
  rowsPerPage,
}: PagentionProps) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const chunkSize = 10;

  const chunkStart = Math.floor((currentPage - 1) / chunkSize) * chunkSize + 1;
  const chunkEnd = Math.min(chunkStart + chunkSize - 1, totalPages);

  const pagesToShow: number[] = [];
  for (let i = chunkStart; i <= chunkEnd; i++) {
    pagesToShow.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage((prev) => prev - 1);
              }}
            />
          </PaginationItem>

          {pagesToShow.map((page) => (
            <PaginationItem key={page}>
              <Button
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages)
                  setCurrentPage((prev) => prev + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Pagention;
