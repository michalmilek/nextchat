"use client";

import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import ConversationItem from "./ConversationItem";
import { FaComment, FaUsers } from "react-icons/fa";
import MakeGroupChat from "./MakeGroupChat";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";
import MakeSingleChat from "./MakeSingleChat";
import useSearchForUser from "@/hooks/useSearchForUser";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList = ({ initialItems, users }: ConversationListProps) => {
  const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);
  const { filteredConversations, setSearchTerm, searchTerm } =
    useSearchForUser(initialItems);

  const handleSelectedConversation = (index: number) => {
    setSelectedConversation(index);
  };

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversationId: string) => {
      setItems((current) =>
        current.filter((conversation) => conversation.id !== conversationId)
      );
    };

    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
      pusherClient.unsubscribe(pusherKey);
    };
  }, [pusherKey, router]);

  return (
    <div className="h-full flex flex-col border-r shadow items-center w-[400px]">
      <div className="flex items-center space-x-2 mb-4 w-full justify-between p-4">
        <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
        <FaComment className="w-6 h-6 text-gray-800" />
      </div>
      <MakeGroupChat users={users} />
      <MakeSingleChat users={users} />
      <input
        type="text"
        id="user-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-[90%] p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for user(email or name)"
      />
      {filteredConversations.map((item, index) => (
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
