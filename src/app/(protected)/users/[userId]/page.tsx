import getUser from "@/services/getUser";
import React from "react";
import UserProfile from "./components/UserProfile";

const Page = async ({ params }: { params: { userId: string } }) => {
  const user = await getUser(params.userId);

  if (!user) {
    return (
      <main className="h-full w-full flex justify-center items-center">
        LOADING...
      </main>
    );
  }

  return (
    <main className="h-full w-full flex justify-center items-center">
      <UserProfile user={user} />
    </main>
  );
};

export default Page;
