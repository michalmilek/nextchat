import AuthContext from "@/context/AuthContext";
import QueryContext from "@/context/QueryContext";
import ToasterContext from "@/context/ToasterContext";
import React from "react";
import ServerSidebar from "./components/ServerSidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-screen h-screen justify-start items-center">
      <ServerSidebar />
      {children}
    </div>
  );
};

export default layout;
