"use client";

import Avatar from "@/components/Avatar";
import { ConfirmModal } from "@/components/ConfirmModal";
import GroupAvatar from "@/components/GroupAvatar";
import useOtherUser from "@/hooks/useOtherUser";
import { pusherClient } from "@/libs/pusher";
import { FullConversationType } from "@/types";
import { Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import AddUserToChat from "./AddUserToChatModal";

interface SidebarProps {
  isShowing: boolean;
  onClose: () => void;
  conversation: Conversation & {
    users: User[];
  };
  users: User[];
}

const ChatDetails: React.FC<SidebarProps> = ({
  users,
  isShowing,
  onClose,
  conversation: initialData,
}) => {
  const session = useSession();
  const [conversation, setConversation] = useState(initialData);
  const otherUser = useOtherUser(conversation);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const deleteConversation = () => {
    axios.delete(`/api/conversations/${conversation.id}`);
    toast.success("Conversation deleted successfully");
    setIsModalOpen(false);

    router.refresh();
  };

  const deleteUserFromConversation = (userId: string) => {
    axios.delete(
      `/api/conversations/deleteUser?userId=${userId}&conversationId=${conversation.id}`
    );
    toast.success("User deleted successfully");
  };

  const addUserToConversation = (userId: string) => {
    axios.patch(
      `/api/conversations/addUser?userId=${userId}&conversationId=${conversation.id}`
    );
    toast.success("User added successfully");
    setIsAddUserOpen(false);
  };

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const removeHandler = (updatedConversation: FullConversationType) => {
      setConversation(updatedConversation);
    };

    const addHandler = (updatedConversation: FullConversationType) => {
      setConversation(updatedConversation);
    };

    pusherClient.bind("conversation:deleteUser", removeHandler);
    pusherClient.bind("conversation:addUser", addHandler);

    return () => {
      pusherClient.unbind("conversation:deleteUser", removeHandler);
      pusherClient.unbind("conversation:addUser", addHandler);
      pusherClient.unsubscribe(pusherKey);
    };
  }, [pusherKey, router]);

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
                  <ul className="list-disc pl-4 overflow-y-auto">
                    {conversation.users.map((user) => (
                      <li
                        key={user.id}
                        className="flex items-center justify-between">
                        <button
                          value={`Delete ${
                            user.name || user.id
                          } from conversation`}
                          role="delete button"
                          type="button"
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => {
                            deleteUserFromConversation(user.id);
                          }}>
                          <FaTimes />
                        </button>
                        <span>{user.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-bold text-lg">{otherUser.name}</p>
                )}
                <p className="text-gray-500 text-sm">
                  {conversation.isGroup
                    ? `Conversation created at: ${format(
                        new Date(conversation.createdAt),
                        "P"
                      )}`
                    : `Joined: ${format(new Date(otherUser.createdAt), "P")}`}
                </p>
                {!conversation.isGroup && (
                  <p className="text-gray-500 text-sm">{otherUser.email}</p>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-col items-start gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2">
                Delete Conversation
              </button>
              {conversation.isGroup && (
                <button
                  onClick={() => {
                    if (conversation.isGroup) {
                      setIsAddUserOpen(true);
                    }
                  }}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
                  Add users
                </button>
              )}
            </div>
          </div>
        </div>
      </Transition>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteConversation}
        title="Do you want to delete this conversation?"
      />
      <AddUserToChat
        addUserToConversation={addUserToConversation}
        title="Add user to conversation"
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        users={users}
        conversationUsers={conversation.users}
      />
    </>
  );
};

export default ChatDetails;
