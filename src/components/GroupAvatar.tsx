import React from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import clsx from "clsx";

interface Props {
  users: User[];
}

const GroupAvatar = ({ users }: Props) => {
  const numToShow = 3;
  const remainingCount = users.length - numToShow;

  return (
    <div className="relative">
      {users.length > 0 && (
        <div className="relative h-12 w-12">
          {users.slice(0, numToShow).map((user, index) => (
            <div
              key={index}
              className={clsx(
                "absolute w-6 h-6  rounded-full",
                index === 0 && `top-0 left-[50%] -translate-x-1/2`,
                index === 1 && `bottom-0 left-0`,
                index === 2 && `bottom-0 right-0`
              )}>
              <Image
                src={user.image || "/avatarPlaceholder.jpg"}
                alt={user.name + " group avatar" || user.id + " group avatar"}
                fill
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full border-2 border-white text-xs font-bold text-gray-600 bg-gray-300">
              +{remainingCount}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupAvatar;
