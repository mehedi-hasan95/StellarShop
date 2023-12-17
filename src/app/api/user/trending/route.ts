import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const omittedDay = new Date();
    omittedDay.setDate(omittedDay.getDate() - 365);
    const product = await prismadb.products.findMany({
      where: {
        createdAt: {
          gte: omittedDay,
        },
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
        user: true,
      },
      orderBy: {
        views: "desc",
      },
      take: 5,
    });
    return NextResponse.json({ msg: "success", product });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
