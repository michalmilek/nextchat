"use client";

import React, { useState } from "react";
import Header from "./Header";
import Chat from "./Chat";
import FooterMessage from "./FooterMessage";
import ChatDetails from "./ChatDetails";
import { FullMessageType } from "@/types";
import { Conversation, User } from "@prisma/client";

interface Props {
  initialMessages: FullMessageType[];
  conversationId: string;
  conversation: Conversation & {
    users: User[];
  };
}

const ClientSiteStructure = ({
  conversation,
  initialMessages,
  conversationId,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex h-screen w-full flex-col justify-between items-start">
        <Header
          isOpen={isOpen}
          handleMenuOpen={() => setIsOpen(true)}
          handleMenuClose={() => setIsOpen(false)}
          conversation={conversation}
        />
        <Chat
          initialMessages={initialMessages}
          conversationId={conversationId}
        />
        <FooterMessage conversationId={conversationId} />
      </div>
      <ChatDetails
        conversation={conversation}
        isShowing={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default ClientSiteStructure;
