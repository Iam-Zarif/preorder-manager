import { PreorderWhen } from "@/generated/prisma/enums";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const data = await prisma.preorder.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = await req.json();

  const updated = await prisma.preorder.update({
    where: { id: params.id },
    data: {
      name: body.name,
      products: Number(body.products),
      preorderWhen: body.preorderWhen as "OUT_OF_STOCK" | "REGARDLESS_OF_STOCK",
      startsAt: new Date(body.startsAt),
      endsAt: body.endsAt ? new Date(body.endsAt) : null,
      status: body.status,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  await prisma.preorder.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
