import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getAuthSession } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (session?.user.role !== "admin") {
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
    const billboard = await prismadb.billboard.findMany();
    return NextResponse.json({ msg: "success", billboard });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
