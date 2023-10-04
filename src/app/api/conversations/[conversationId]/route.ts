import getCurrentUser from "@/services/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    console.log("kaktus");

    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    await prisma.message.deleteMany({
      where: {
        conversationId: conversationId,
      },
    });

    const conversationToDelete = await prisma.conversation.delete({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    console.log("🚀 ~ conversationToDelete:", conversationToDelete);

    if (!conversationToDelete) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const users = conversationToDelete.users.map((user) => user.email);

    users.forEach((email) => {
      if (email) {
        pusherServer.trigger(email, "conversation:remove", conversationId);
      }
    });

    return NextResponse.json(conversationToDelete);
  } catch (error) {
    console.log(error);
    return NextResponse.json(null);
  }
}
