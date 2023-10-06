"use client";

import Button from "@/components/buttons/Button";
import { signOut } from "next-auth/react";
import React from "react";
import Content from "./components/Content";

const page = () => {
  return (
    <Content>
      <span className="text-xl font-bold">Select a user to talk</span>
    </Content>
  );
};

export default page;
