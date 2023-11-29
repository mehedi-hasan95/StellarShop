import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await prismadb.products.update({
      data: {
        views: { increment: 1 },
      },
      where: {
        id: params.productId,
      },
      include: {
        images: true,
      },
    });
    if (product) {
      return NextResponse.json({ msg: "success", product });
    } else {
      return NextResponse.json({ msg: "error" });
    }
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
