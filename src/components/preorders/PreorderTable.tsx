"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/src/components/ui/Button";
import { Checkbox } from "@/src/components/ui/Checkbox";
import { Switch } from "@/src/components/ui/Switch";
import { formatDateTime, formatPreorderWhen } from "@/src/lib/utils";
import { colors } from "@/src/theme/color";
import type { Preorder, PreorderMeta } from "@/src/types/preorder";

type PreorderTableProps = {
  items: Preorder[];
  meta: PreorderMeta;
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
  onToggleStatus: (id: string) => Promise<void>;
  onPageChange: (page: number) => void;
};

export function PreorderTable({
  items,
  meta,
  loading,
  onDelete,
  onToggleStatus,
  onPageChange,
}: PreorderTableProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [busyId, setBusyId] = useState("");

  const allSelected = useMemo(
    () => items.length > 0 && items.every((item) => selected.includes(item.id)),
    [items, selected],
  );

  function toggleAll(checked: boolean) {
    setSelected(checked ? items.map((item) => item.id) : []);
  }

  function toggleRow(id: string, checked: boolean) {
    setSelected((current) =>
      checked ? [...current, id] : current.filter((value) => value !== id),
    );
  }

  async function runRowAction(id: string, action: (id: string) => Promise<void>) {
    setBusyId(id);
    await action(id);
    setBusyId("");
  }

  const start = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
  const end = Math.min(meta.page * meta.limit, meta.total);
  const canGoPrev = meta.page > 1;
  const canGoNext = meta.page < meta.totalPages;

  return (
    <>
      <table className="w-full table-fixed border-collapse text-left">
        <thead className="bg-[#f3f3f3]">
          <tr className="h-[38px] border-y border-[#dedede] text-[14px] font-bold text-[#626262]">
            <th className="w-[42px] pl-[12px]">
              <Checkbox checked={allSelected} onChange={toggleAll} label="Select all" />
            </th>
            <th className="w-[160px]">Name</th>
            <th className="w-[80px]">Products</th>
            <th className="w-[150px]">Preorder when</th>
            <th className="w-[178px]">Starts at</th>
            <th className="w-[170px]">Ends at</th>
            <th className="w-[74px]">Status</th>
            <th className="w-[86px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="h-[340px] text-center text-[14px] font-bold">
                Loading preorders...
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={8} className="h-[340px] text-center text-[14px] font-bold">
                No preorders found
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr
                key={item.id}
                className="h-[43px] border-b border-[#e4e4e4] text-[14px] text-[#34363a]"
              >
                <td className="pl-[12px]">
                  <Checkbox
                    checked={selected.includes(item.id)}
                    onChange={(checked) => toggleRow(item.id, checked)}
                    label={`Select ${item.name}`}
                  />
                </td>
                <td className="truncate pr-[16px] font-bold">{item.name}</td>
                <td>{item.products}</td>
                <td>{formatPreorderWhen(item.preorderWhen)}</td>
                <td>{formatDateTime(item.startsAt)}</td>
                <td>{formatDateTime(item.endsAt)}</td>
                <td>
                  <Switch
                    checked={item.status}
                    disabled={busyId === item.id}
                    label={`Toggle ${item.name} status`}
                    onChange={() => void runRowAction(item.id, onToggleStatus)}
                  />
                </td>
                <td>
                  <div className="flex gap-[8px]">
                    <Link
                      href={`/preorders/${item.id}`}
                      aria-label={`Edit ${item.name}`}
                      className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[8px] border border-[#d8dde3] bg-white text-[#2d3135] hover:bg-[#f7f7f7]"
                    >
                      <Pencil size={15} strokeWidth={2.2} />
                    </Link>
                    <Button
                      variant="icon"
                      aria-label={`Delete ${item.name}`}
                      disabled={busyId === item.id}
                      onClick={() => void runRowAction(item.id, onDelete)}
                    >
                      <Trash2 size={15} strokeWidth={2.2} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex h-[40px] items-center justify-center gap-[12px] bg-[#f4f4f4] text-[14px] font-bold text-[#34363a]">
        <button
          type="button"
          disabled={!canGoPrev}
          onClick={() => onPageChange(meta.page - 1)}
          className="flex h-[28px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] bg-[#ebebeb] disabled:cursor-not-allowed disabled:opacity-70"
          style={{ color: canGoPrev ? colors.text : "#c9c9c9" }}
        >
          <ChevronLeft size={18} />
        </button>
        <span>
          Showing {start} to {end} from {meta.total}
        </span>
        <button
          type="button"
          disabled={!canGoNext}
          onClick={() => onPageChange(meta.page + 1)}
          className="flex h-[28px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] bg-[#ebebeb] disabled:cursor-not-allowed disabled:opacity-70"
          style={{ color: canGoNext ? colors.text : "#c9c9c9" }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </>
  );
}
