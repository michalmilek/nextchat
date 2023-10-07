"use client";

import { Transition } from "@headlessui/react";
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";
import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";
import GroupAvatar from "@/components/GroupAvatar";
import useMe from "@/hooks/useMe";
import useActiveList from "@/hooks/useActiveList";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const otherUser = useOtherUser(conversation);
  const { members } = useActiveList();
  const statusText = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;

    return members.indexOf(otherUser.email || otherUser.id) !== -1
      ? "Active"
      : "Offline";
  }, [conversation, members, otherUser.email, otherUser.id]);

  return (
    <header className="border-b shadow w-full p-4 flex justify-between pl-20 md:pl-4">
      <div className="flex items-center justify-start gap-4">
        <button
          onClick={() => {
            router.back();
          }}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-600 transition-all text-white font-bold py-2 px-4 rounded md:hidden">
          <FaArrowLeft />
        </button>
        {conversation.isGroup ? (
          <GroupAvatar users={conversation.users} />
        ) : (
          <Avatar
            email={otherUser.email || otherUser.id}
            image={otherUser.image}
            alt={conversation.name || otherUser.name || otherUser.id}
          />
        )}
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