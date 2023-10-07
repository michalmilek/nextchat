"use client";

import getCurrentUser from "@/services/getCurrentUser";
import { User } from "@prisma/client";
import React, { useState } from "react";
import Avatar from "./Avatar";
import { HiUserCircle } from "react-icons/hi";
import { Dialog } from "@headlessui/react";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { HiXMark } from "react-icons/hi2";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

const UserProfile = ({ currentUser }: { currentUser: User }) => {
  const [profilePicture, setProfilePicture] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: currentUser.name || "",
    },
  });

  const onSubmit = async (data: { name: string }) => {
    try {
      await axios.patch(`/api/user/${currentUser.id}/changeName`, {
        name: data.name,
      });
      toast.success("User named changed succesfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvatarChange = (result: any) => {
    axios.patch(`/api/user/${currentUser.id}/changeAvatar`, {
      avatarUrl: result?.info?.secure_url,
    });
    toast.success("Avatar will change with next site refresh.");
  };

  return (
    <>
      <button
        className="p-4 shadow-md items-center flex flex-col text-gray-200 hover:bg-gray-700"
        onClick={toggleModal}>
        <Avatar
          email={currentUser.email!}
          image={currentUser.image}
          alt={currentUser.name || currentUser.id}
        />
        <h2 className="text-xl font-bold text-center">{currentUser.name}</h2>
        <p className="text-gray-300 text-center">{currentUser.email}</p>
      </button>
      <Dialog
        open={isModalOpen}
        onClose={toggleModal}
        className="fixed z-[60] inset-0 overflow-y-auto">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Panel className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <Dialog.Title className="bg-gray-100 px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Profile
                </h3>
                <button
                  className="text-gray-400 hover:text-gray-800 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                  onClick={toggleModal}>
                  <HiXMark className="h-6 w-6" />
                </button>
              </div>
            </Dialog.Title>
            <Dialog.Description className="px-4 py-5 sm:p-6">
              <div className="w-full flex items-center justify-center flex-col">
                <Avatar
                  email={currentUser.email!}
                  image={profilePicture || currentUser.image}
                  alt={currentUser.name || currentUser.id}
                />
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <div className="mt-2">
                    <p className="text-sm leading-5 text-gray-500"></p>
                  </div>
                  <CldUploadButton
                    onUpload={handleAvatarChange}
                    options={{ maxFiles: 1 }}
                    uploadPreset="ug4qd9yy"
                    className="border-2 border-gray-500 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 w-full">
                    Upload Image
                  </CldUploadButton>
                </div>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name">
                  Name
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  defaultValue={currentUser.name || ""}
                  type="text"
                  id="name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.name.message}
                  </p>
                )}
                <button className="border-2 border-gray-500 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 w-full mt-4">
                  Save
                </button>
              </form>
            </Dialog.Description>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default UserProfile;
