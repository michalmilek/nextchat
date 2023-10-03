"use client";

import Avatar from "@/components/Avatar";
import GroupAvatar from "@/components/GroupAvatar";
import useOtherUser from "@/hooks/useOtherUser";
import { Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { Fragment } from "react";
import { FaTimes } from "react-icons/fa";

interface SidebarProps {
  isShowing: boolean;
  onClose: () => void;
  conversation: Conversation & {
    users: User[];
  };
}

const ChatDetails: React.FC<SidebarProps> = ({
  isShowing,
  onClose,
  conversation,
}) => {
  const otherUser = useOtherUser(conversation);

  return (
    <>
      <Transition
        as={Fragment}
        show={isShowing}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-50"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-50"
        leaveTo="opacity-0">
        <div className="fixed inset-0 bg-black z-20"></div>
      </Transition>

      <Transition
        show={isShowing}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <div className="fixed z-20 inset-y-0 right-0 w-64 bg-white shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500">
            <FaTimes />
          </button>

          <div className="px-4 py-2">
            {conversation.isGroup && (
              <p className="font-bold text-lg text-center">Group Details</p>
            )}
            <div className="flex items-center gap-4">
              {conversation.isGroup ? (
                <GroupAvatar users={conversation.users} />
              ) : (
                <Avatar
                  image={otherUser.image}
                  alt={otherUser.name || otherUser.id}
                />
              )}
              <div>
                {conversation.isGroup ? (
                  <ul className="list-disc pl-4">
                    {conversation.users.slice(0, 3).map((user) => (
                      <li key={user.id}>{user.name}</li>
                    ))}
                    {conversation.users.length > 3 && (
                      <li>+{conversation.users.length - 3} more</li>
                    )}
                  </ul>
                ) : (
                  <p className="font-bold text-lg">{otherUser.name}</p>
                )}
                <p className="text-gray-500 text-sm">
                  {conversation.isGroup
                    ? `Conversation created at: ${format(
                        conversation.createdAt,
                        "P"
                      )}`
                    : `Joined: ${format(otherUser.createdAt, "P")}`}
                </p>
                {!conversation.isGroup && (
                  <p className="text-gray-500 text-sm">{otherUser.email}</p>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-col items-start gap-2">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2">
                Delete Conversation
              </button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
                {conversation.isGroup ? "Edit Users" : "Edit User"}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default ChatDetails;
