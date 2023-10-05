import getCurrentUser from "@/services/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const conversationId = searchParams.get("conversationId");
    const currentUser = await getCurrentUser();

    if (!userId) {
      return new NextResponse("UserID doesnt exist", { status: 404 });
    }
    if (!conversationId) {
      return new NextResponse("ConversationID doesnt exist", { status: 404 });
    }

    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
      },
    });

    if (!updatedConversation) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    const users = updatedConversation.users.map((user) => user.email);

    users.forEach((email) => {
      if (email) {
        pusherServer.trigger(
          email,
          "conversation:deleteUser",
          updatedConversation
        );
      }
    });

    return new NextResponse("User removed from conversation", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(null);
  }
}
