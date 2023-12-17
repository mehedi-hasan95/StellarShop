import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { getAuthSession } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (session?.user.role !== "admin") {
      redirect("/");
    }
    const body = await req.json();
    const { name, image, divisionId, slug } = body;
    const district = await prismadb.district.create({
      data: { name, image, divisionId, slug },
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
