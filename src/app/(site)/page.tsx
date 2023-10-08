import React from "react";
import AuthForm from "./components/AuthForm";

const Page = () => {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-black">
          CHAT APP
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default Page;
