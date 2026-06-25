"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  deletePreorder,
  getPreorders,
  togglePreorderStatus,
} from "@/src/services/preorder.service";
import type {
  Preorder,
  PreorderMeta,
  PreorderSortBy,
  PreorderStatusFilter,
  SortOrder,
} from "@/src/types/preorder";

const emptyMeta: PreorderMeta = { total: 0, page: 1, limit: 8, totalPages: 1 };

export function usePreorders() {
  const [items, setItems] = useState<Preorder[]>([]);
  const [meta, setMeta] = useState(emptyMeta);
  const [status, setStatus] = useState<PreorderStatusFilter>("all");
  const [sortBy, setSortBy] = useState<PreorderSortBy>("createdAt");
  const [order, setOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const query = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      limit: "8",
      sortBy,
      order,
    });

    if (status !== "all") params.set("status", status);
    return `?${params.toString()}`;
  }, [order, page, sortBy, status]);

  const load = useCallback(async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await getPreorders(query);
      setItems(response.data);
      setMeta(response.meta);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load");
    } finally {
      setLoading(false);
    }
  }, [query]);

  const refreshWithoutFullTableLoading = useCallback(async () => {
    setMessage("");

    try {
      const response = await getPreorders(query);
      setItems(response.data);
      setMeta(response.meta);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update");
    }
  }, [query]);


  useEffect(() => {
    queueMicrotask(() => {
      void load();
    });
  }, [load]);

  return {
    items,
    meta,
    status,
    sortBy,
    order,
    page,
    loading,
    message,
    setStatus: (value: PreorderStatusFilter) => {
      setPage(1);
      setStatus(value);
    },
    setSortBy,
    setOrder,
    setPage,
    refresh: load,
    remove: async (id: string) => {
      setMessage("");
      try {
        await deletePreorder(id);
        await refreshWithoutFullTableLoading();
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Unable to delete");
        await refreshWithoutFullTableLoading();
      }
    },
    toggleStatus: async (id: string) => {
      setMessage("");
      try {
        await togglePreorderStatus(id);
        await load();
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "Unable to update status",
        );
        await load();
      }
    },
  };
}
