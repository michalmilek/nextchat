import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

interface IParams {
  userId: string;
}

export const PATCH = async (req: Request, { params }: { params: IParams }) => {
  try {
    const { userId } = params;
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Invalid user ID", { status: 404 });
    }

    if (!name) {
      return new NextResponse("Invalid name", { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
      },
    });

    if (!updatedUser) {
      return new NextResponse("Invalid user", { status: 400 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
};
