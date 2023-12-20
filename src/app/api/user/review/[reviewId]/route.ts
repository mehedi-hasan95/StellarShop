import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { reviewId: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session?.id) {
      return NextResponse.json({ msg: "Un", status: 400 });
    }
    const body = await req.json();
    const { review, comment, productId } = body;
    const existingComment = await prismadb.review.findFirst({
      where: {
        userId: session.id,
        productId: params.reviewId,
      },
    });
    if (existingComment) {
      return NextResponse.json({ msg: "Allready exist", status: 409 });
    }
    const reviews = await prismadb.review.create({
      data: {
        review,
        comment,
        productId,
        userId: session.id,
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
