import getConversations from "@/services/getConversations";
import React from "react";
import getUsers from "@/services/getUsers";
import dynamic from "next/dynamic";
import ConversationListSkeleton from "./ConversationListSkeleton";
const ConversationList = dynamic(() => import("./ConversationList"), {
  loading: () => <ConversationListSkeleton />,
  ssr: false,
});

const ServerConversationList = async () => {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <ConversationList
      initialItems={conversations}
      users={users}
    />
  );
};

export default ServerConversationList;
