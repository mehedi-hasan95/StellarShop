import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { districtId: string } }
) {
  try {
    const session = await getCurrentUser();
    if (session?.role !== "admin") {
      return NextResponse.json({ msg: "Unauthorize User", status: 401 });
    }
    const body = await req.json();
    const district = await prismadb.district.update({
      where: {
        slug: params.districtId,
      },
      data: body,
    });
    return NextResponse.json({ msg: "success", district });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { districtId: string } }
) {
  try {
    const session = await getCurrentUser();
    if (session?.role !== "admin") {
      return NextResponse.json({ msg: "Unauthorize User", status: 401 });
    }
    const district = await prismadb.district.delete({
      where: {
        slug: params.districtId,
      },
    });
    return NextResponse.json({ msg: "success", district });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
