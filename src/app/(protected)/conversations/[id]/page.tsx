import useConversation from "@/hooks/useConversation";
import getConversationById from "@/services/getConversationById";
import getMessages from "@/services/getMessages";
import React from "react";
import Header from "./components/Header";

interface IParams {
  conversationId: string;
}

const Page = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

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
    <div>
      <Header conversation={conversation} />
    </div>
  );
};

export default Page;
