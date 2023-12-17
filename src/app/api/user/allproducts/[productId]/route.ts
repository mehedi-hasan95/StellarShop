import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

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
        slug: params.productId,
      },
      include: {
        images: true,
        category: true,
        district: true,
        division: true,
        user: true,
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
