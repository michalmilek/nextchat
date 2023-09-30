"use client";

import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo } from "react";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;

    return "Active";
  }, [conversation]);

  return (
    <header className="border-b shadow w-full p-4">
      <div className="flex items-center justify-start gap-4">
        <Avatar
          image={otherUser.image}
          alt={conversation.name || otherUser.name || otherUser.id}
        />
        <div className="flex items-start justify-center">
          <p>{conversation.name || otherUser.name}</p>
          <span>{statusText}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
