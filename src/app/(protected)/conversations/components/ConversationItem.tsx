"use client";

import Avatar from "@/components/Avatar";
import GroupAvatar from "@/components/GroupAvatar";
import useOtherUser from "@/hooks/useOtherUser";
import { FullConversationType } from "@/types";
import clsx from "clsx";
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

  const isLastMessageNewConversation =
    lastMessageText === "Started a conversation";

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
        {data.isGroup ? (
          <GroupAvatar users={data.users} />
        ) : (
          <Avatar
            email={otherUser?.email!}
            image={otherUser.image}
            alt={otherUser.name || otherUser.id}
          />
        )}
        <div className="w-full flex items-center justify-between h-full">
          <div className="flex flex-col items-center justify-between">
            <p className="font-bold text-sm">{data.name || otherUser.name}</p>
            <span
              className={`${clsx(
                hasSeen && "font-bold",
                isLastMessageNewConversation && "font-normal"
              )} text-xs`}>
              {lastMessageText}
            </span>
          </div>
        </div>
        {lastMessage?.createdAt && (
          <p className="text-xs text-gray-500 justify-self-end">
            {format(new Date(lastMessage.createdAt), "p")}
          </p>
        )}
      </div>
    </button>
  );
};

export default ConversationItem;
