"use client";

import Avatar from "@/components/Avatar";
import { FullMessageType } from "@/types";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { FaCheck } from "react-icons/fa";

const chatMessages = [
  {
    id: 1,
    text: "Hello!",
    sender: "Alice",
    timestamp: new Date("2023-09-01T10:00:00"),
  },
  {
    id: 2,
    text: "Hi there!",
    sender: "Bob",
    timestamp: new Date("2023-09-01T10:01:00"),
  },
];

const Chat = ({
  initialMessages,
  conversationId,
}: {
  initialMessages: FullMessageType[];
  conversationId: string;
}) => {
  useEffect(() => {
    if (conversationId) {
      axios.post(`/api/conversations/${conversationId}/seen`);
    }
  }, [conversationId]);

  return (
    <div className="flex flex-col space-y-2 h-full w-full justify-start">
      {initialMessages.map((message) => (
        <div
          key={message.id}
          className="flex flex-col bg-white p-4 rounded-lg shadow w-full h-auto">
          <div className="flex items-center space-x-2">
            <Avatar
              image={message.sender.image}
              alt={message.sender.name || message.sender.id}
            />
            <div className="text-gray-500 text-sm">
              {message.sender.name} - {formatDistanceToNow(message.createdAt)}{" "}
              ago
            </div>
            {message.seenIds.filter((id) => id !== message.senderId).length >
              0 && (
              <span aria-label="Seen">
                <FaCheck />
              </span>
            )}
          </div>
          {message.image ? (
            <div className="max-h-[300px] max-w-[300px] mt-2 cursor-pointer relative aspect-square">
              <Image
                src={message.image}
                objectFit="cover"
                fill
                className="rounded-md border-2 border-gray-800 h-full w-full max-h-[300px] max-w-[300px] relative hover:scale-105 transition-all"
                alt=""
              />
            </div>
          ) : (
            <p className="text-gray-800">{message.body}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Chat;
