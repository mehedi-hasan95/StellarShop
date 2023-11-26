import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();
    if (session?.user.role !== "admin") {
      redirect("/");
    }
    const user = await prismadb.user.findMany({
      where: {
        role: "seller",
      },
    });
    return NextResponse.json({ msg: "success", user });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
