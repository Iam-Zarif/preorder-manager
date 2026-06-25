import { getPrisma } from "@/src/lib/prisma";
import { preorderInputSchema } from "@/src/lib/validations/preorder";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, { params }: Context) {
  const { id } = await params;
  const preorder = getPrisma().preorder.findUnique({
    where: { id },
  });

  if (!preorder) {
    return NextResponse.json(
      { success: false, message: "Preorder not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data: preorder });
}

export async function PUT(req: Request, { params }: Context) {
  const { id } = await params;
  const body = preorderInputSchema.safeParse(await req.json());

  if (!body.success) {
    return NextResponse.json(
      { success: false, message: "Invalid preorder data" },
      { status: 400 },
    );
  }

  const updated = getPrisma().preorder.update({
    where: { id },
    data: {
      name: body.data.name,
      products: body.data.products,
      preorderWhen: body.data.preorderWhen,
      startsAt: new Date(body.data.startsAt),
      endsAt: body.data.endsAt ? new Date(body.data.endsAt) : null,
      status: body.data.status,
    },
  });

  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(_req: Request, { params }: Context) {
  const { id } = await params;
  const prisma = getPrisma();

  try {
    await prisma.preorder.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to delete preorder" },
      { status: 500 },
    );
  }
}


