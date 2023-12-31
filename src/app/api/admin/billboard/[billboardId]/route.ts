import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const session = await getCurrentUser();
    if (session?.role !== "admin") {
      return new NextResponse("Unauthorize user", { status: 401 });
    }
    const body = await req.json();
    const { label, image, catId } = body;
    if (!label || !image || !catId) {
      return NextResponse.json(
        { error: "Missing required properties" },
        { status: 400 }
      );
    }
    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        image,
        catId,
      },
    });
    return NextResponse.json({ msg: "success", billboard });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json({ msg: "success", billboard });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const session = await getCurrentUser();
    if (session?.role !== "admin") {
      return new NextResponse("Unauthorize user", { status: 401 });
    }
    const billboard = await prismadb.billboard.delete({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json({ msg: "success", billboard });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
