import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const product = await prismadb.products.findMany({
      orderBy: {
        views: "desc",
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
      take: 5,
    });
    return NextResponse.json({ msg: "success", product });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
