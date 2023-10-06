import React from "react";

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full w-full flex justify-center items-center">
      {children}
    </main>
  );
};

export default Content;
