"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import Avatar from "../Avatar";
import { usePostConversation } from "@/services/conversations/conversationServices";

const UserList = ({ users }: { users: User[] }) => {
  const { mutate, isLoading, isSuccess } = usePostConversation();
  return (
    <div className="max-h-96 overflow-y-auto">
      <header className="p-4 text-white">UserList</header>
      <ul className="flex flex-col justify-center items-start">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex gap-4 items-center py-2 px-4 hover:bg-gray-700 transition-all rounded-md w-full">
            <button
              className="flex gap-2 items-center flex-wrap w-full h-full"
              onClick={() => mutate(user.id)}>
              <Avatar
                image={user.image}
                alt={user.name || user.id}
              />
              <span>{user.name || user.id}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
