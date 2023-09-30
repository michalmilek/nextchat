"use client";

import React from "react";
import { FaEnvelope, FaImage, FaSmile } from "react-icons/fa";
import { useForm, FieldValues } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostMessage } from "@/services/messages/messagesServices";

const schema = yup.object().shape({
  message: yup.string().required("Message is required"),
});

const FooterMessage = ({ conversationId }: { conversationId: string }) => {
  const { mutate: postMessage } = usePostMessage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FieldValues) => {
    postMessage({ message: data.message, image: "", conversationId });
  };

  return (
    <main className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left w-full">
      <div className="p-4 flex flex-col items-start justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center w-full">
          <input
            type="text"
            placeholder="Write a message..."
            className="border border-gray-300 rounded-md p-2 w-full min-w-[250px]"
            {...register("message")}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 flex items-center">
            Send <FaEnvelope className="inline-block ml-2" />
          </button>
          <label
            htmlFor="image"
            className="ml-2">
            <FaImage className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
            />
          </label>
          <label
            htmlFor="emoticon"
            className="ml-2">
            <FaSmile className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            <input
              type="file"
              id="emoticon"
              className="hidden"
              accept=".png, .jpg, .jpeg, .gif"
            />
          </label>
        </form>
        {errors.message && (
          <p className="text-red-500 text-sm mt-2">{errors.message.message}</p>
        )}
      </div>
    </main>
  );
};

export default FooterMessage;
