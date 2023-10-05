import getCurrentUser from "@/services/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

export async function PATCH(request: NextRequest) {
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

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

    if (!conversation) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    if (!conversation.isGroup) {
      return new NextResponse("Conversation isnt group conversation", {
        status: 400,
      });
    }

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        users: {
          connect: {
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
          "conversation:addUser",
          updatedConversation
        );
      }
    });

    return new NextResponse("User added to conversation", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(null);
  }
}
