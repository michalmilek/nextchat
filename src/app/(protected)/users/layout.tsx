import React from "react";
import UsersHeader from "./components/UsersHeader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="md:ml-[200px] max-h-screen w-screen md:w-[calc(100vw-200px)] flex flex-col">
      <UsersHeader />
      {children}
    </main>
  );
};

export default layout;
