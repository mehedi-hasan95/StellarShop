import { NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (session?.user.role !== "admin") {
      redirect("/");
    }
    const body = await req.json();
    const { name, image, divisionId } = body;
    const district = await prismadb.district.create({
      data: { name, image, divisionId },
    });
    return NextResponse.json({ msg: "success", district });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function GET(req: Request) {
  try {
    const district = await prismadb.district.findMany();
    return NextResponse.json({ msg: "success", district });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
