"use client";

import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import ConversationItem from "./ConversationItem";
import { FaComment } from "react-icons/fa";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList = ({ initialItems }: ConversationListProps) => {
  const [items, setItems] = useState(initialItems);
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);

  const handleSelectedConversation = (index: number) => {
    setSelectedConversation(index);
  };

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <div className="h-full flex flex-col border-r shadow">
      <div className="flex items-center space-x-2 mb-4 w-full justify-between p-4">
        <h2 className="text-lg font-semibold text-gray-700">Conversations</h2>
        <FaComment className="w-6 h-6 text-gray-500" />
      </div>
      {items.map((item, index) => (
        <ConversationItem
          handleSelectedConversation={handleSelectedConversation}
          index={index}
          data={item}
          selected={index === selectedConversation}
          key={item.id + index}
        />
      ))}
    </div>
  );
};

export default ConversationList;
