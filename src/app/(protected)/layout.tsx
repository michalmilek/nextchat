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
