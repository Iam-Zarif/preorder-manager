import type {
  PreorderSortBy,
  PreorderStatusFilter,
  PreorderWhen,
  SortOrder,
} from "@/src/types/preorder";

export const statusFilters: { label: string; value: PreorderStatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const sortOptions: { label: string; value: PreorderSortBy }[] = [
  { label: "Name", value: "name" },
  { label: "Created At", value: "createdAt" },
  { label: "Starts At", value: "startsAt" },
  { label: "Ends At", value: "endsAt" },
];

export const orderOptions: { label: string; value: SortOrder }[] = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

export const preorderWhenOptions: { label: string; value: PreorderWhen }[] = [
  { label: "out-of-stock", value: "OUT_OF_STOCK" },
  { label: "regardless-of-stock", value: "REGARDLESS_OF_STOCK" },
];
