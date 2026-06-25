# Preorder Manager

## API

### List preorders
**GET** `/api/preorders`

**Query params**
- `page` (number, default `1`)
- `limit` (number, default `10`, max `50`)
- `status` (`"active"` | `"inactive"`) — optional
- `sortBy` (`"name" | "products" | "createdAt" | "startsAt" | "endsAt"`) — default `"createdAt"`
- `order` (`"asc"` | `"desc"`) — default `"desc"`

**Response (200)**
```ts
{
  success: true;
  data: Preorder[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

**Response (error)**
- (not explicitly handled beyond Prisma/server errors)

---

### Create preorder
**POST** `/api/preorders`

**req.body**
```ts
{
  name: string; // min length 1
  products: number; // int >= 1
  preorderWhen: "OUT_OF_STOCK" | "REGARDLESS_OF_STOCK";
  startsAt: string; // date-time string (parsed with new Date)
  endsAt?: string | null; // optional; if provided, parsed with new Date
  status: boolean; // default true
}
```

**Response (200)**
```ts
{
  success: true;
  data: Preorder;
}
```

**Response (400)**
```ts
{ success: false; message: "Invalid preorder data" }
```

---

### Get preorder by id
**GET** `/api/preorders/:id`

**Response (200)**
```ts
{ success: true; data: Preorder }
```

**Response (404)**
```ts
{ success: false; message: "Preorder not found" }
```

---

### Update preorder
**PUT** `/api/preorders/:id`

**req.body**
```ts
{
  name: string;
  products: number;
  preorderWhen: "OUT_OF_STOCK" | "REGARDLESS_OF_STOCK";
  startsAt: string; // parsed with new Date
  endsAt?: string | null;
  status: boolean;
}
```

**Response (200)**
```ts
{ success: true; data: Preorder }
```

**Response (400)**
```ts
{ success: false; message: "Invalid preorder data" }
```

---

### Delete preorder
**DELETE** `/api/preorders/:id`

**Response (200)**
```ts
{ success: true }
```

**Response (500)**
```ts
{ success: false; message: "Unable to delete preorder" }
```

---

### Toggle preorder status
**PATCH** `/api/preorders/status/:id`

**Response (200)**
```ts
{ success: true; data: Preorder }
```

**Response (404)**
```ts
{ success: false; message: "Preorder not found" }
```

---

## Types

### Preorder
```ts
type Preorder = {
  id: string;
  name: string;
  products: number;
  preorderWhen: "OUT_OF_STOCK" | "REGARDLESS_OF_STOCK";
  startsAt: string; // serialized from DateTime
  endsAt: string | null; // nullable
  status: boolean;
  createdAt: string;
  updatedAt: string;
};
```

### Preorder list response
```ts
type PreorderListResponse = {
  success: boolean;
  data: Preorder[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
```

## Frontend / UI

- **Home (`/`)**: preorder list page (`PreorderListPage`).
- **Create (`/preorders/new`)**: preorder form page (`PreorderFormPage`).
- **Edit (`/preorders/:id/edit`)**: loads preorder by id and renders `PreorderFormPage`.

### Data fetching
- `usePreorders` calls:
  - `GET /api/preorders?...` for list + filtering/sorting/pagination
  - `DELETE /api/preorders/:id` for deletion
  - `PATCH /api/preorders/status/:id` for toggling active/inactive

### Form submission
- `PreorderFormPage` submits:
  - `POST /api/preorders` (new)
  - `PUT /api/preorders/:id` (edit)

