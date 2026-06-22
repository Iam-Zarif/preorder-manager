const BASE_URL = "/api/preorders";

export async function getPreorders(params: string = "") {
  const res = await fetch(`${BASE_URL}${params}`);
  return res.json();
}

export async function getPreorderById(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

export async function createPreorder(data: any) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updatePreorder(id: string, data: any) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deletePreorder(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return res.json();
}

export async function togglePreorderStatus(id: string) {
  const res = await fetch(`/api/preorders/status/${id}`, {
    method: "PATCH",
  });

  return res.json();
}
