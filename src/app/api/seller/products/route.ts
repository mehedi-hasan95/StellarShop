import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const session = await getCurrentUser();
    const body = await req.json();
    const {
      title,
      images,
      isNew,
      desc,
      short_desc,
      views,
      sale,
      price,
      quantity,
      outOfStoke,
      catId,
      divisionId,
      districtId,
      slug,
    } = body;

    const products = await prismadb.products.create({
      data: {
        title,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        isNew,
        desc,
        short_desc,
        views,
        sale,
        price,
        quantity,
        outOfStoke,
        catId,
        divisionId,
        districtId,
        sellerId: session?.id as string,
        slug,
      },
    });
    return NextResponse.json({ msg: "success", products });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getCurrentUser();
    const products = await prismadb.products.findMany({
      where: {
        sellerId: session?.id,
      },
      include: {
        images: true,
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
