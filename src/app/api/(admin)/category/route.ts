import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, image } = body;
    const category = await prismadb.category.create({
      data: { name, image },
    });
    return NextResponse.json({ msg: "success", category });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function GET(req: Request) {
  try {
    const category = await prismadb.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json({ msg: "success", category });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
