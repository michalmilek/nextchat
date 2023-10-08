"use client";

import Button from "@/components/buttons/Button";
import { signOut } from "next-auth/react";
import React from "react";
import Content from "./components/Content";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";

const Page = () => {
  return (
    <main
      className={`h-full w-full md:flex justify-center items-center hidden`}>
      <span className="text-xl font-bold">Select a user to talk</span>
    </main>
  );
};

export default Page;
