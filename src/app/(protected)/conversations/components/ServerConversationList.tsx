import getConversations from "@/services/getConversations";
import React from "react";
import ConversationList from "./ConversationList";
import getUsers from "@/services/getUsers";

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
