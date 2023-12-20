import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getCurrentUser();
    if (session?.role !== "admin") {
      return NextResponse.json({ msg: "User is unauthorize" }, { status: 401 });
    }
    const body = await req.json();
    const billboard = await prismadb.billboard.create({
      data: body,
    });
    return NextResponse.json({ msg: "success", billboard });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function GET(req: Request) {
  try {
    const billboard = await prismadb.billboard.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ msg: "success", billboard });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
