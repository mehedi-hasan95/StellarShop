import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { wishlistId: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user.id) {
      return NextResponse.json({ msg: "Please login", status: 401 });
    }
    const body = await req.json();
    const { productId } = body;
    const wishList = await prismadb.wishlist.create({
      data: {
        productId,
        userId: session.user.id,
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
    const session = await getAuthSession();
    if (!session?.user.id) {
      return NextResponse.json({ msg: "Please login", status: 401 });
    }
    const wishList = await prismadb.wishlist.delete({
      where: {
        id: params.wishlistId,
        userId: session.user.id,
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
  const session = await getAuthSession();
  try {
    const wishList = await prismadb.wishlist.findFirst({
      where: {
        productId: params.wishlistId,
        userId: session?.user.id,
      },
    });
    return NextResponse.json({ msg: "success", wishList });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
