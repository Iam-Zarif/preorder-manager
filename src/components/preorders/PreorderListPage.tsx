"use client";

import Link from "next/link";

import { PreorderTable } from "@/src/components/preorders/PreorderTable";
import { SortMenu } from "@/src/components/preorders/SortMenu";
import { Button } from "@/src/components/ui/Button";
import { statusFilters } from "@/src/lib/constants";
import { cn } from "@/src/lib/utils";
import { colors } from "@/src/theme/color";
import { usePreorders } from "@/src/hooks/usePreorders";

export function PreorderListPage() {
  const preorders = usePreorders();

  return (
    <main
      className="min-h-screen border-t border-[#ededed] pt-[80px]"
      style={{ backgroundColor: colors.page, color: colors.text }}
    >
      <section className="mx-auto w-[950px]">
        <div className="mb-[24px] flex items-center justify-between">
          <h1 className="text-[23px] font-bold leading-none text-[#242628]">
            Preorders
          </h1>
          <Link href="/preorders/new" className="cursor-pointer">
            <Button>Create Preorder</Button>
          </Link>
        </div>
        <div
          className="overflow-visible rounded-[12px] border shadow-none"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.line,
          }}
        >
          <div className="flex h-[49px] items-center justify-between px-[12px]">
            <div className="flex gap-[6px]">
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => preorders.setStatus(filter.value)}
                  className={cn(
                    "h-[28px] cursor-pointer rounded-[8px] px-[16px] text-[14px] font-bold text-[#44464b] hover:bg-[#f1f1f1]",
                    preorders.status === filter.value && "bg-[#eeeeee]",
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <SortMenu
              sortBy={preorders.sortBy}
              order={preorders.order}
              onSortByChange={preorders.setSortBy}
              onOrderChange={preorders.setOrder}
            />
          </div>
          {preorders.message ? (
            <div className="border-t border-[#dedede] px-[12px] py-[10px] text-[14px] font-bold text-[#b42318]">
              {preorders.message}
            </div>
          ) : null}
          <PreorderTable
            items={preorders.items}
            meta={preorders.meta}
            loading={preorders.loading}
            onDelete={preorders.remove}
            onToggleStatus={preorders.toggleStatus}
            onPageChange={preorders.setPage}
          />
        </div>
      </section>
    </main>
  );
}
