import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const products = await prismadb.products.findMany({
      include: {
        images: true,
        _count: {
          select: {
            wishlist: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ msg: "success", products });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
