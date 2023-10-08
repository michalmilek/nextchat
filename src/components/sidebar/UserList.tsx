"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import Avatar from "../Avatar";
import { usePostConversation } from "@/services/conversations/conversationServices";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";

const UserList = ({ users }: { users: User[] }) => {
  const router = useRouter();
  const maxHeight600 = useMediaQuery({
    query: "(max-height: 680px)",
  });

  return (
    <div className="max-h-96 overflow-y-auto">
      <header className="p-4 text-white">List of users</header>
      <ul
        className={`flex flex-col justify-center items-start ${clsx(
          maxHeight600 && "h-[200px] overflow-y-auto pt-10 xl:py-0 xl:pt-0 z-10"
        )}`}>
        {users.map((user) => (
          <li
            key={user.id + user.email!}
            className="flex gap-4 items-center py-2 px-4 hover:bg-gray-700 transition-all rounded-md w-full">
            <button
              className="flex gap-2 items-center flex-wrap w-full h-full"
              onClick={() => router.push(`/users/${user.id}`)}>
              <Avatar
                email={user.email || user.id}
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
