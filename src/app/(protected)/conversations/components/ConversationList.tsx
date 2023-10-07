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
import { moveElementToStart } from "@/utils/helpers";
import { usePathname } from "next/navigation";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList = ({ initialItems, users }: ConversationListProps) => {
  const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [selectedConversation, setSelectedConversation] =
    useState<FullConversationType | null>(null);
  const { filteredConversations, setSearchTerm, searchTerm } =
    useSearchForUser(items);

  const handleSelectedConversation = (conversation: FullConversationType) => {
    setSelectedConversation(conversation);
  };

  const pathname = usePathname();

  const isConversation = useMemo(() => {
    if (pathname) {
      const cutPathname = pathname.split("/").pop();
      if (cutPathname === "conversations") return "";

      return cutPathname;
    }

    return "";
  }, [pathname]);

  const router = useRouter();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      const newArray = items.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages,
          };
        }

        return currentConversation;
      });

      const indexToMove = newArray.findIndex(
        (conversationEl) => conversationEl.id === conversation.id
      );
      const readyArray = moveElementToStart(newArray, indexToMove);

      setItems(readyArray as FullConversationType[]);
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

    const updateUserHandler = (updatedConversation: FullConversationType) => {
      setItems((previousConversations) => {
        const arrayWithoutUpdatedConversation = previousConversations.filter(
          (conversation) => conversation.id !== updatedConversation.id
        );
        return [updatedConversation, ...arrayWithoutUpdatedConversation];
      });
    };

    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:remove", removeHandler);
    pusherClient.bind("conversation:addUser", updateUserHandler);
    pusherClient.bind("conversation:deleteUser", updateUserHandler);

    return () => {
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
      pusherClient.unbind("conversation:addUser", updateUserHandler);
      pusherClient.unbind("conversation:deleteUser", updateUserHandler);
      pusherClient.unsubscribe(pusherKey);
    };
  }, [pusherKey, router, items]);

  return (
    <div
      className={`flex flex-col border-r shadow items-center ${
        isConversation ? "hidden" : "w-full"
      } md:w-[400px] h-screen pt-10 md:pt-0`}>
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
      <ul className="w-full h-full overflow-y-auto mt-2">
        {filteredConversations.map((item, index) => (
          <li key={item.id + item.name + index}>
            <ConversationItem
              handleSelectedConversation={handleSelectedConversation}
              index={index}
              data={item}
              selected={item.id === selectedConversation?.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
