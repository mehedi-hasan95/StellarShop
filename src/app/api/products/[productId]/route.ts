import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await prismadb.products.findUnique({
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
      redirect("/");
    }
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
