import { type ClassValue, clsx } from "clsx";

import type { PreorderWhen } from "@/src/types/preorder";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDateTime(value: string | null) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(value));
}

export function toInputDateTime(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  return offsetDate.toISOString().slice(0, 16);
}

export function fromInputDateTime(value: string) {
  return value ? new Date(value).toISOString() : "";
}

export function formatPreorderWhen(value: PreorderWhen) {
  return value === "OUT_OF_STOCK" ? "out-of-stock" : "regardless-of-stock";
}
