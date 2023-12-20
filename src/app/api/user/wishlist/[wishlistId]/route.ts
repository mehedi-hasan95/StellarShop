import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { wishlistId: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session?.id) {
      return NextResponse.json({ msg: "Please login", status: 401 });
    }
    const body = await req.json();
    const { productId } = body;
    const wishList = await prismadb.wishlist.create({
      data: {
        productId,
        userId: session.id,
      },
    });
    return NextResponse.json({ msg: "success", wishList });
  } catch (error) {
    return NextResponse.json({ msg: "faill POST", error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { wishlistId: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session?.id) {
      return NextResponse.json({ msg: "Please login", status: 401 });
    }
    const wishList = await prismadb.wishlist.delete({
      where: {
        id: params.wishlistId,
        userId: session.id,
      },
    });
    return NextResponse.json({ msg: "success", wishList });
  } catch (error) {
    return NextResponse.json({ msg: "faill Delete", error });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { wishlistId: string } }
) {
  const session = await getCurrentUser();
  try {
    const wishList = await prismadb.wishlist.findFirst({
      where: {
        productId: params.wishlistId,
        userId: session?.id,
      },
    });
    return NextResponse.json({ msg: "success", wishList });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
