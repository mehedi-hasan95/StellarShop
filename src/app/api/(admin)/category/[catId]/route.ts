import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { catId: string } }
) {
  try {
    const category = await prismadb.category.findMany({
      where: {
        slug: params.catId,
      },
      include: {
        products: {
          include: {
            images: true,
          },
        },
        billboard: true,
      },
    });
    return NextResponse.json({ msg: "success", category });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { catId: string } }
) {
  try {
    const session = await getAuthSession();
    if (session?.user.role !== "admin") {
      return NextResponse.json({ msg: "Unauthorize User", status: 401 });
    }
    const body = await req.json();
    const category = await prismadb.category.update({
      where: {
        slug: params.catId,
      },
      data: body,
    });
    return NextResponse.json({ msg: "success", category });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { catId: string } }
) {
  try {
    const session = await getAuthSession();
    if (session?.user.role !== "admin") {
      return NextResponse.json({ msg: "Unauthorize User" }, { status: 401 });
    }

    const category = await prismadb.category.delete({
      where: { slug: params.catId },
    });
    return NextResponse.json({ msg: "success", category });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
