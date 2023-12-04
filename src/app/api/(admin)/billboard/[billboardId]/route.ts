import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { billboardId: string } }
) {
  try {
    const session = await getAuthSession();
    if (session?.user.role !== "admin") {
      return new NextResponse("Unauthorize user", { status: 401 });
    }
    const body = await req.json();
    const { label, image, catId } = body as any;
    if (!label || !image || !catId) {
      return NextResponse.json(
        { error: "Missing required properties" },
        { status: 400 }
      );
    }
    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        image,
        catId,
      },
    });
    return NextResponse.json({ msg: "success", billboard });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json({ msg: "success", billboard });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
