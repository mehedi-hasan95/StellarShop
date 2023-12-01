import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const product = await prismadb.products.findMany({
      where: {
        createdAt: {
          gte: threeDaysAgo,
        },
      },
      include: {
        user: true,
        images: {
          select: {
            url: true,
          },
        },
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ msg: "success", product });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
