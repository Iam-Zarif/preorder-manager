import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

const allowedSortFields = [
  "name",
  "products",
  "createdAt",
  "startsAt",
] as const;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status");

  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(
    50,
    Math.max(1, Number(searchParams.get("limit") || 10)),
  );

  const sortByRaw = searchParams.get("sortBy") || "createdAt";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";

  const safeSortBy = allowedSortFields.includes(sortByRaw as any)
    ? sortByRaw
    : "createdAt";

  const where: any = {};

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
  const body = await req.json();

  const created = await prisma.preorder.create({
    data: {
      name: body.name,
      products: Number(body.products),
      preorderWhen: body.preorderWhen,
      startsAt: new Date(body.startsAt),
      endsAt: body.endsAt ? new Date(body.endsAt) : null,
      status: body.status ?? true,
    },
  });

  return NextResponse.json({
    success: true,
    data: created,
  });
}
