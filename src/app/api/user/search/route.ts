import prismadb from "@/lib/prismadb";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let title = searchParams.get("title");

  const filter: Prisma.ProductsWhereInput = {};
  try {
    if (title) {
      filter.title = {
        contains: title,
      };
    }
    const posts = await prismadb.products.findMany({
      where: filter,
    });
    return NextResponse.json({ msg: "success", posts });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
