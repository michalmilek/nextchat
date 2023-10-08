import React from "react";
import UsersHeader from "./components/UsersHeader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="max-h-screen md:h-screen w-screen md:w-[calc(100vw-70px)] flex flex-col md:justify-start">
      <UsersHeader />
      {children}
    </main>
  );
};

export default layout;
