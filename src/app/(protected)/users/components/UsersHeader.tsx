"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const UsersHeader = () => {
  const router = useRouter();
  return (
    <div className="left-0 right-0 z-10 h-[70px] flex justify-start items-center pl-16 md:px-2 py-4 shadow-xl fixed bg-white md:relative">
      <button
        onClick={() => router.back()}
        className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
        <FaArrowLeft className="mr-2" />
        Back
      </button>
    </div>
  );
};

export default UsersHeader;
