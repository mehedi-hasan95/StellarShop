import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, role, password } = body;
    const hasbedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        name,
        email,
        role,
        hasbedPassword,
      },
    });
    return NextResponse.json({ msg: "success", user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
