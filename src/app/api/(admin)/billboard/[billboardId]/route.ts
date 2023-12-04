import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const session = await getAuthSession();
    if (session?.user.role !== "admin") {
      return new NextResponse("Unauthorize user", { status: 401 });
    }
    const body = req.json();
    const { label, image, catId } = body as any;
    console.log(params.billboardId);
    // if (!label || !image || !catId) {
    //   return NextResponse.json(
    //     { error: "Missing required properties" },
    //     { status: 400 }
    //   );
    // }
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
