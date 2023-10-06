"use client";

import Avatar from "@/components/Avatar";
import DynamicImage from "@/components/DynamicImage";
import { pusherClient } from "@/libs/pusher";
import { FullMessageType } from "@/types";
import { User } from "@prisma/client";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { find } from "lodash";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { animateScroll } from "react-scroll";

const Chat = ({
  initialMessages,
  conversationId,
  me,
}: {
  initialMessages: FullMessageType[];
  conversationId: string;
  me: User;
}) => {
  const [messages, setMessages] = useState(initialMessages);

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "messages-container",
      duration: 200,
      smooth: "easeInOutQuart",
    });
  };

  useEffect(() => {
    if (conversationId) {
      axios.post(`/api/conversations/${conversationId}/seen`);
    }
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
    };


    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("messages:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("messages:update", updateMessageHandler);
    };
  }, [conversationId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (messages) {
        scrollToBottom();
      }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [messages]);

  return (
    <div
      id="messages-container"
      className="flex flex-col space-y-2 h-full w-full justify-start pb-8 overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex flex-col bg-white p-4 rounded-lg shadow w-full h-auto ${
            message.sender.name !== me?.name ? "items-end" : "items-start"
          }`}>
          <div className="flex items-center space-x-2">
            <Avatar
              email={message.sender.email!}
              image={message.sender.image}
              alt={message.sender.name || message.sender.id}
            />
            <div
              suppressHydrationWarning
              className="text-gray-500 text-sm">
              {message.sender.name} -{" "}
              {formatDistanceToNow(new Date(message.createdAt))} ago
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
              <DynamicImage
                src={message.image}
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
