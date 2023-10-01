"use client";

import Avatar from "@/components/Avatar";
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
        <div className="fixed inset-0 bg-black"></div>
      </Transition>

      <Transition
        show={isShowing}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500">
            <FaTimes />
          </button>

          <div className="px-4 py-2">
            <div className="flex items-center gap-4">
              <Avatar
                image={otherUser.image}
                alt={otherUser.name || otherUser.id}
              />
              <div>
                <p className="font-bold text-lg">{otherUser.name}</p>
                <p className="text-gray-500 text-sm">
                  Joined: {format(otherUser.createdAt, "P")}
                </p>
                <p className="text-gray-500 text-sm">{otherUser.email}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col items-start gap-2">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2">
                Delete Conversation
              </button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
                Edit User
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default ChatDetails;
