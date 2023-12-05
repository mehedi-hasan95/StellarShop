import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await prismadb.products.update({
      data: {
        views: { increment: 1 },
      },
      where: {
        slug: params.productId,
      },
      include: {
        images: true,
        category: true,
        district: true,
        division: true,
        user: true,
      },
    });
    if (product) {
      return NextResponse.json({ msg: "success", product });
    } else {
      return NextResponse.json({ msg: "error" });
    }
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
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
      slug,
    } = body;

    // delete previous data
    await prismadb.products.update({
      where: {
        slug: params.productId,
      },
      data: {
        title,
        images: {
          deleteMany: {},
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
        slug,
      },
    });
    const product = await prismadb.products.update({
      where: {
        slug: params.productId,
      },
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
        slug,
      },
    });
    return NextResponse.json({ msg: "success", product });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
