"use client";

import useConversation from "@/hooks/useConversation";
import React from "react";

const Page = () => {
  const { isOpen } = useConversation();
  return <div>Page</div>;
};

export default Page;
