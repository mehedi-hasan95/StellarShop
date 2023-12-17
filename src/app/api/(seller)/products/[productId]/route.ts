import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getAuthSession();

    if (session?.user.role !== "seller") {
      return NextResponse.json({ msg: "Unauthorize User" }, { status: 401 });
    }
    const unAuthorizeUser = await prismadb.products.findUnique({
      where: {
        slug: params.productId,
      },
    });
    if (!unAuthorizeUser) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }
    if (unAuthorizeUser.sellerId !== session.user.id) {
      return NextResponse.json({ msg: "Unauthorize User" }, { status: 401 });
    }

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
        images: {
          deleteMany: {},
        },
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getAuthSession();

    if (session?.user.role !== "seller") {
      return NextResponse.json({ msg: "Unauthorize User" }, { status: 401 });
    }
    const unAuthorizeUser = await prismadb.products.findUnique({
      where: {
        slug: params.productId,
      },
    });
    if (!unAuthorizeUser) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }
    if (unAuthorizeUser.sellerId !== session.user.id) {
      return NextResponse.json({ msg: "Unauthorize User" }, { status: 401 });
    }
    const product = await prismadb.products.delete({
      where: {
        slug: params.productId,
      },
    });
    return NextResponse.json({ msg: "success", product });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
