import { getPrisma } from "@/src/lib/prisma";
import { preorderInputSchema } from "@/src/lib/validations/preorder";
import { NextResponse } from "next/server";

const allowedSortFields = [
  "name",
  "products",
  "createdAt",
  "startsAt",
  "endsAt",
] as const;

export async function GET(req: Request) {
  const prisma = getPrisma();
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status");

  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(
    50,
    Math.max(1, Number(searchParams.get("limit") || 10)),
  );

  const sortByRaw = searchParams.get("sortBy") || "createdAt";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";

  const safeSortBy = allowedSortFields.includes(
    sortByRaw as (typeof allowedSortFields)[number],
  )
    ? sortByRaw
    : "createdAt";

  const where: { status?: boolean } = {};

  if (status === "active") where.status = true;
  if (status === "inactive") where.status = false;

  const [data, total] = await Promise.all([
    prisma.preorder.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [safeSortBy]: order,
      },
    }),
    prisma.preorder.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(req: Request) {
  const prisma = getPrisma();
  const body = preorderInputSchema.safeParse(await req.json());

  if (!body.success) {
    return NextResponse.json(
      { success: false, message: "Invalid preorder data" },
      { status: 400 },
    );
  }

  const created = await prisma.preorder.create({
    data: {
      name: body.data.name,
      products: body.data.products,
      preorderWhen: body.data.preorderWhen,
      startsAt: new Date(body.data.startsAt),
      endsAt: body.data.endsAt ? new Date(body.data.endsAt) : null,
      status: body.data.status,
    },
  });

  return NextResponse.json({
    success: true,
    data: created,
  });
}
