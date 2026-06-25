"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  createPreorder,
  updatePreorder,
} from "@/src/services/preorder.service";
import type { PreorderPayload } from "@/src/types/preorder";

export function usePreorderForm(id?: string) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function save(payload: PreorderPayload) {
    setSaving(true);
    setError("");

    try {
      if (id) {
        await updatePreorder(id, payload);
      } else {
        await createPreorder(payload);
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save preorder");
    } finally {
      setSaving(false);
    }
  }

  return { saving, error, save };
}
