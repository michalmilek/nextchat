"use client";

import React, { useState } from "react";
import { FaEnvelope, FaImage, FaSmile } from "react-icons/fa";
import { useForm, FieldValues } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostMessage } from "@/services/messages/messagesServices";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import Picker from "emoji-picker-react";

const schema = yup.object().shape({
  message: yup.string().required("Message is required"),
});

const FooterMessage = ({ conversationId }: { conversationId: string }) => {
  const [showPicker, setShowPicker] = useState(false);
  const { mutate: postMessage } = usePostMessage();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      message: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FieldValues) => {
    postMessage({ message: data.message, image: "", conversationId });
    reset();
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  const inputValue = watch("message");

  return (
    <main className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left w-full">
      <div className="p-4 flex flex-col items-start justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center w-full gap-3 relative">
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
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="ug4qd9yy">
            <FaImage className="text-gray-500 hover:text-gray-700 cursor-pointer" />
          </CldUploadButton>
          <button
            type="button"
            about="emoji picker"
            onClick={() => setShowPicker(true)}
            className="ml-2">
            <FaSmile className="text-gray-500 hover:text-gray-700 cursor-pointer" />
          </button>
          {showPicker && (
            <div className="absolute bottom-0 right-0">
              <Picker
                onEmojiClick={(emoji) => {
                  setValue("message", inputValue + emoji.emoji);
                  setShowPicker(false);
                }}
              />
            </div>
          )}
        </form>
        {errors.message && (
          <p className="text-red-500 text-sm mt-2">{errors.message.message}</p>
        )}
      </div>
    </main>
  );
};

export default FooterMessage;
