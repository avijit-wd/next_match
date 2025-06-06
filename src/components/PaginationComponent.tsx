"use client";
import usePaginationStore from "@/hooks/usePaginationStore";
import { Pagination } from "@nextui-org/react";
import clsx from "clsx";
import React, { useEffect } from "react";

export default function PaginationComponent({
  totalCount,
}: {
  totalCount: number;
}) {
  const { setPage, setPageSize, setPagination, pagination } =
    usePaginationStore();

  const { pageNumber, pageSize, totalPages } = pagination;

  useEffect(() => {
    setPagination(totalCount);
  }, [totalCount]);

  const start = (pageNumber - 1) * pageSize + 1;
  const end = Math.min(pageNumber * pageSize, totalCount);
  const resultText = `Showing ${start}-${end} of ${totalCount} results`;

  return (
    <div className="border-t-2 w-full mt-5">
      <div className="flex flex-row justify-between items-center py-5">
        <div className="">{resultText}</div>
        <Pagination
          total={totalPages}
          color="secondary"
          page={pageNumber}
          onChange={setPage}
          variant="bordered"
        />
        <div className="flex flex-row gap-1 items-center">
          Page Size:
          {[3, 6, 12].map((size) => (
            <div
              key={size}
              onClick={() => setPageSize(size)}
              className={clsx("page-size-box", {
                "bg-secondary text-white hover:bg-secondary hover:text-white":
                  pageSize === size,
              })}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
