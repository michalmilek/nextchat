import getConversations from "@/services/getConversations";
import React from "react";
import ConversationList from "./ConversationList";

const ServerConversationList = async () => {
  const conversations = await getConversations();
  return <ConversationList initialItems={conversations} />;
};

export default ServerConversationList;
