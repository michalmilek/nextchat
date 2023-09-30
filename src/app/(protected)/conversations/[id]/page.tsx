import useConversation from "@/hooks/useConversation";
import getConversationById from "@/services/getConversationById";
import getMessages from "@/services/getMessages";
import React from "react";
import Header from "./components/Header";
import FooterMessage from "./components/FooterMessage";

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
    <div className="flex h-full w-full flex-col justify-between items-start">
      <Header conversation={conversation} />
      <FooterMessage conversationId={params.id} />
    </div>
  );
};

export default Page;
