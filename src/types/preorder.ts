export type PreorderWhen = "OUT_OF_STOCK" | "REGARDLESS_OF_STOCK";
export type PreorderStatusFilter = "all" | "active" | "inactive";
export type PreorderSortBy = "name" | "createdAt" | "startsAt" | "endsAt";
export type SortOrder = "asc" | "desc";

export type Preorder = {
  id: string;
  name: string;
  products: number;
  preorderWhen: PreorderWhen;
  startsAt: string;
  endsAt: string | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PreorderPayload = {
  name: string;
  products: number;
  preorderWhen: PreorderWhen;
  startsAt: string;
  endsAt?: string | null;
  status: boolean;
};

export type PreorderMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PreorderListResponse = {
  success: boolean;
  data: Preorder[];
  meta: PreorderMeta;
};

export type PreorderResponse = {
  success: boolean;
  data: Preorder;
  message?: string;
};
