import { getPrisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(_req: Request, { params }: Context) {
  const { id } = await params;
  const prisma = getPrisma();
  const preorder = await prisma.preorder.findUnique({ where: { id } });

  if (!preorder) {
    return NextResponse.json(
      { success: false, message: "Preorder not found" },
      { status: 404 },
    );
  }

  const updated = await prisma.preorder.update({
    where: { id },
    data: { status: !preorder.status },
  });

  return NextResponse.json({ success: true, data: updated });
}
