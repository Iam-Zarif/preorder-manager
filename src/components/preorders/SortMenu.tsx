"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useState } from "react";

import { orderOptions, sortOptions } from "@/src/lib/constants";
import { cn } from "@/src/lib/utils";
import { colors } from "@/src/theme/color";
import type { PreorderSortBy, SortOrder } from "@/src/types/preorder";

type SortMenuProps = {
  sortBy: PreorderSortBy;
  order: SortOrder;
  onSortByChange: (value: PreorderSortBy) => void;
  onOrderChange: (value: SortOrder) => void;
};

export function SortMenu({
  sortBy,
  order,
  onSortByChange,
  onOrderChange,
}: SortMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        aria-label="Sort preorders"
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[8px] border border-[#d9dde3] bg-white text-[#4d5561] hover:bg-[#f7f7f7]"
      >
        <ArrowUpDown size={18} />
      </button>
      {open ? (
        <div
          className="absolute right-[0px] top-[32px] z-20 w-[148px] rounded-[10px] border py-[10px] shadow-[0_2px_5px_rgba(15,23,42,0.16)]"
          style={{ backgroundColor: colors.surface, borderColor: colors.line }}
        >
          <p className="px-[12px] text-[14px] text-[#33383f]">Sort by</p>
          <div className="mt-[10px] space-y-[10px] px-[12px]">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onSortByChange(option.value)}
                className="flex h-[18px] cursor-pointer items-center gap-[8px] text-[14px] text-[#33383f]"
              >
                <span
                  className={cn(
                    "h-[15px] w-[15px] rounded-full border border-[#9ea5ad]",
                    sortBy === option.value && "border-[5px] border-[#4a4a4a]",
                  )}
                />
                {option.label}
              </button>
            ))}
          </div>
          <div className="mt-[14px] space-y-[4px] border-t border-[#e1e4e8] pt-[10px]">
            {orderOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onOrderChange(option.value)}
                className={cn(
                  "mx-[6px] flex h-[25px] w-[136px] cursor-pointer items-center gap-[7px] rounded-[7px] px-[8px] text-[14px] font-bold text-[#33383f] hover:bg-[#f4f4f4]",
                  order === option.value && "bg-[#eeeeee]",
                )}
              >
                {option.value === "asc" ? <ArrowUp size={15} /> : <ArrowDown size={15} />}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
