import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { reviewId: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user.id) {
      return NextResponse.json({ msg: "Un", status: 400 });
    }
    const body = await req.json();
    const { review, comment, productId } = body;
    const reviews = await prismadb.review.create({
      data: {
        review,
        comment,
        productId,
        userId: session.user.id,
      },
    });
    return NextResponse.json({ msg: "success", reviews });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { reviewId: string } }
) {
  try {
    const reviews = await prismadb.review.findMany({
      where: {
        productId: params.reviewId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return NextResponse.json({ msg: "success", reviews });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
