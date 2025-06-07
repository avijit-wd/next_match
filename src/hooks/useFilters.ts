import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { FaMale, FaFemale } from "react-icons/fa";
import userFilterStore from "./useFilterStore";
import { useEffect, useTransition } from "react";
import { Selection } from "@nextui-org/react";
import usePaginationStore from "./usePaginationStore";

export const useFilters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { filters, setFilters } = userFilterStore();

  const { pagination, setPage } = usePaginationStore();

  const { gender, ageRange, orderBy, withPhoto } = filters;

  useEffect(() => {
    if (gender || ageRange || orderBy || withPhoto) {
      setPage(1);
    }
  }, [gender, ageRange, orderBy, withPhoto]);

  useEffect(() => {
    startTransition(() => {
      const searchParams = new URLSearchParams();

      if (gender) searchParams.set("gender", gender.join(","));

      if (ageRange) searchParams.set("ageRange", ageRange.toString());

      if (orderBy) searchParams.set("orderBy", orderBy);

      if (pagination.pageSize)
        searchParams.set("pageSize", pagination.pageSize.toString());

      if (pagination.pageNumber)
        searchParams.set("pageNumber", pagination.pageNumber.toString());

      searchParams.set("withPhoto", String(withPhoto ?? false));

      router.replace(`${pathname}?${searchParams}`);
    });
  }, [gender, ageRange, orderBy, pagination, router, withPhoto, pathname]);

  const orderByList = [
    {
      label: "Last active",
      value: "updated",
    },
    {
      label: "Newest members",
      value: "created",
    },
  ];

  const genders = [
    { value: "male", icon: FaMale },
    {
      value: "female",
      icon: FaFemale,
    },
  ];

  const handleAgeSelect = (value: number[]) => {
    setFilters("ageRange", value);
  };

  const handleOrderSelect = (value: Selection) => {
    if (value instanceof Set) {
      setFilters("orderBy", value.values().next().value as string);
    }
  };

  const handleGenderSelect = (value: string) => {
    if (gender.includes(value))
      setFilters(
        "gender",
        gender.filter((g) => g !== value)
      );
    else setFilters("gender", [...gender, value]);
  };

  const handleWithPhoto = (value: boolean) => {
    setFilters("withPhoto", value);
  };

  return {
    orderByList,
    genders,
    selectAge: handleAgeSelect,
    selectGender: handleGenderSelect,
    selectOrder: handleOrderSelect,
    selectWithPhoto: handleWithPhoto,
    filters,
    isPending,
    totalCount: pagination.totalCount,
  };
};
