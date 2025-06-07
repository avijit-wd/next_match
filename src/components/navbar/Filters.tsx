"use client";
import { useFilters } from "@/hooks/useFilters";
import {
  Button,
  Select,
  SelectItem,
  Slider,
  Spinner,
  Switch,
} from "@nextui-org/react";
import React, { ChangeEvent } from "react";

export default function Filters() {
  const {
    filters,
    genders,
    orderByList,
    selectAge,
    selectOrder,
    selectGender,
    selectWithPhoto,
    isPending,
    totalCount,
  } = useFilters();

  return (
    <div className="shadow-md py-2">
      <div className="flex flex-row justify-around items-center">
        <div className="flex gap-2 items-center">
          <div className="text-secondary font-semibold text-xl">
            Result:{" "}
            {isPending ? <Spinner size="sm" color="secondary" /> : totalCount}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div>Gender:</div>
          {genders.map(({ icon: Icon, value }) => (
            <Button
              key={value}
              size="sm"
              isIconOnly
              color={filters.gender.includes(value) ? "secondary" : "default"}
              onClick={() => selectGender(value)}
            >
              <Icon size={24} />
            </Button>
          ))}
        </div>
        <div className="flex flex-row items-center gap-2 w-1/4">
          <Slider
            label="Age Range"
            color="secondary"
            aria-label="age-range-slider"
            size="sm"
            minValue={18}
            maxValue={100}
            defaultValue={filters.ageRange}
            suppressHydrationWarning
            onChangeEnd={(value) => selectAge(value as number[])}
          />
        </div>

        <div>
          <p className="text-sm">With Photo</p>
          <Switch
            isSelected={filters.withPhoto}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              selectWithPhoto(e.target.checked)
            }
            aria-label="Automatic updates"
          />
        </div>

        <div className="w-1/4">
          <Select
            aria-label="order by selector"
            size="sm"
            fullWidth
            label="Order By"
            variant="bordered"
            color="secondary"
            selectedKeys={new Set([filters.orderBy])}
            onSelectionChange={selectOrder}
          >
            {orderByList.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
