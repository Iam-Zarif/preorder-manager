import { notFound } from "next/navigation";

import { PreorderFormPage } from "@/src/components/preorders/PreorderFormPage";
import { getPrisma } from "@/src/lib/prisma";

type EditPreorderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPreorderPage({
  params,
}: EditPreorderPageProps) {
  const { id } = await params;
  const preorder = await getPrisma().preorder.findUnique({ where: { id } });

  if (!preorder) notFound();

  return <PreorderFormPage preorder={JSON.parse(JSON.stringify(preorder))} />;
}

