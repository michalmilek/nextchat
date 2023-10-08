"use client";

import Avatar from "@/components/Avatar";
import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-10 py-10 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8">List of users</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ld:grid-cols-3 xl:grid-cols-4 w-full mt-10">
        {users.map((user) => (
          <Link
            href={`/users/${user.id}`}
            key={user.id}
            className="p-4 border border-gray-300 rounded-md shadow-md">
            <div className="flex items-center gap-3">
              <Avatar
                alt={user.name! + "avatar"}
                email={user.email!}
                image={user.image}
              />
              <h2 className="text-lg font-semibold">{user.name}</h2>
            </div>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">
              Created: {user.createdAt.toLocaleString()}
            </p>
            <p className="text-gray-500">
              Updated: {user.updatedAt.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserList;
