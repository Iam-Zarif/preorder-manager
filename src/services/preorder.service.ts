import type {
  PreorderListResponse,
  PreorderPayload,
  PreorderResponse,
} from "@/src/types/preorder";

const BASE_URL = "/api/preorders";

async function readJson<T>(res: Response): Promise<T> {
  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export async function getPreorders(params: string = "") {
  const res = await fetch(`${BASE_URL}${params}`);
  return readJson<PreorderListResponse>(res);
}

export async function getPreorderById(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return readJson<PreorderResponse>(res);
}

export async function createPreorder(data: PreorderPayload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return readJson<PreorderResponse>(res);
}

export async function updatePreorder(id: string, data: PreorderPayload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return readJson<PreorderResponse>(res);
}

export async function deletePreorder(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return readJson<{ success: boolean }>(res);
}

export async function togglePreorderStatus(id: string) {
  const res = await fetch(`/api/preorders/status/${id}`, {
    method: "PATCH",
  });

  return readJson<PreorderResponse>(res);
}
