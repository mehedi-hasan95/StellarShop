import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { divisionId: string } }
) {
  try {
    const session = await getAuthSession();
    const body = await req.json();
    if (session?.user.role !== "admin") {
      return NextResponse.json({ msg: "Unauthorize User" }, { status: 401 });
    }

    const division = await prismadb.division.update({
      where: { slug: params.divisionId },
      data: body,
    });
    return NextResponse.json({ msg: "success", division });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { divisionId: string } }
) {
  try {
    const session = await getAuthSession();
    if (session?.user.role !== "admin") {
      return NextResponse.json({ msg: "Unauthorize User" }, { status: 401 });
    }

    const division = await prismadb.division.delete({
      where: { slug: params.divisionId },
    });
    return NextResponse.json({ msg: "success", division });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
