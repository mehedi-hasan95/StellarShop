import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(req: Request) {
  try {
    const session = await getCurrentUser();
    if (session?.role !== "admin") {
      redirect("/");
    }
    const user = await prismadb.user.findMany({
      where: {
        role: "buyer",
      },
    });
    return NextResponse.json({ msg: "success", user });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
