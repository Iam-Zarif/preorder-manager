import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const existing = await prisma.preorder.findUnique({
    where: { id: params.id },
  });

  if (!existing) {
    return NextResponse.json(
      { message: "Preorder not found" },
      { status: 404 },
    );
  }

  const updated = await prisma.preorder.update({
    where: { id: params.id },
    data: {
      status: !existing.status,
    },
  });

  return NextResponse.json(updated);
}
// src/app/api/preorders/status/[id]/route.ts
