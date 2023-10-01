"use client";

import { Transition } from "@headlessui/react";
import { FaEllipsisV } from "react-icons/fa";
import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
  handleMenuOpen: () => void;
  handleMenuClose: () => void;
  isOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({
  conversation,
  isOpen,
  handleMenuOpen,
  handleMenuClose,
}) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;

    return "Active";
  }, [conversation]);

  return (
    <header className="border-b shadow w-full p-4 flex justify-between">
      <div className="flex items-center justify-start gap-4">
        <Avatar
          image={otherUser.image}
          alt={conversation.name || otherUser.name || otherUser.id}
        />
        <div className="flex-1 flex items-start justify-center flex-col">
          <p className="font-bold text-lg">
            {conversation.name || otherUser.name}
          </p>
          <span className="text-gray-500 text-sm">{statusText}</span>
        </div>
      </div>
      <button onClick={handleMenuOpen}>
        <FaEllipsisV />
      </button>
    </header>
  );
};

export default Header;