"use client";

import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { FullConversationType } from "@/types";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";

interface ConversationItemProps {
  index: number;
  handleSelectedConversation: (index: number) => void;
  data: FullConversationType;
  selected?: boolean;
}

const ConversationItem = ({
  data,
  selected,
  index,
  handleSelectedConversation,
}: ConversationItemProps) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!userEmail) return false;

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);
  return (
    <button
      className={`flex items-center transition-all justify-between p-4 ${
        selected ? "bg-gray-200" : "hover:bg-gray-100"
      }`}
      onClick={() => {
        handleSelectedConversation(index);
        handleClick();
      }}>
      <div className="flex items-center justify-start gap-4">
        <Avatar
          image={otherUser.image}
          alt={otherUser.name || otherUser.id}
        />
        <div className="flex flex-col items-center justify-between">
          <p className="font-bold">{data.name || otherUser.name}</p>
          <span>{lastMessageText}</span>
        </div>
      </div>
      {lastMessage?.createdAt && (
        <p className="text-sm text-gray-500">
          {format(new Date(lastMessage.createdAt), "p")}
        </p>
      )}
    </button>
  );
};

export default ConversationItem;
