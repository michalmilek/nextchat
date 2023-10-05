import useConversation from "@/hooks/useConversation";
import getConversationById from "@/services/getConversationById";
import getMessages from "@/services/getMessages";
import React from "react";
import Header from "./components/Header";
import FooterMessage from "./components/FooterMessage";
import Chat from "./components/Chat";
import ChatDetails from "./components/ChatDetails";
import ClientSiteStructure from "./components/ClientSiteStructure";
import getCurrentUser from "@/services/getCurrentUser";
import getUsers from "@/services/getUsers";

interface IParams {
  id: string;
}

const Page = async ({ params }: { params: IParams }) => {
  if (!params.id) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span
          className="text-5xl 
 animate-pulse">
          ERROR: NO CONVERSATION ID
        </span>
      </div>
    );
  }

  const conversation = await getConversationById(params.id);
  const messages = await getMessages(params.id);
  const users = await getUsers();

  if (!conversation) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span
          className="text-5xl 
 animate-pulse">
          ERROR: WRONG CONVERSATION ID
        </span>
      </div>
    );
  }

  return (
    <ClientSiteStructure
      conversation={conversation}
      initialMessages={messages}
      conversationId={params.id}
      users={users}
    />
  );
};

export default Page;
