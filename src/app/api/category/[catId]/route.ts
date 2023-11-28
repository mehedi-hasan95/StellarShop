import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { catId: string } }
) {
  try {
    const category = await prismadb.category.findMany({
      where: {
        id: params.catId,
      },
      include: {
        Products: true,
      },
    });
    return NextResponse.json({ msg: "success", category });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
