import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
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
        sellerId: session?.user.id as string,
      },
    });
    return NextResponse.json({ msg: "success", products });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();
    const products = await prismadb.products.findMany({
      where: {
        sellerId: session?.user.id,
      },
      include: {
        images: true,
      },
    });
    return NextResponse.json({ msg: "success", products });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
