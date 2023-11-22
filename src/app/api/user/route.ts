import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
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
