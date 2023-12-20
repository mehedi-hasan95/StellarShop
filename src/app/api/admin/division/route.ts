import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const session = await getCurrentUser();
    if (session?.role !== "admin") {
      redirect("/");
    }
    const body = await req.json();
    const { name, image, slug } = body;
    const division = await prismadb.division.create({
      data: { name, image, slug },
    });
    return NextResponse.json({ msg: "success", division });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function GET(req: Request) {
  try {
    const division = await prismadb.division.findMany();
    return NextResponse.json({ msg: "success", division });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
