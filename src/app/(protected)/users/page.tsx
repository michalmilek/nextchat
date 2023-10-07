import getUsers from "@/services/getUsers";
import React from "react";
import UserList from "./components/UserList";

const page = async () => {
  const users = await getUsers();

  return (
    <div className="h-full w-full border-2 border-black mt-[70px]">
      <UserList users={users} />
    </div>
  );
};

export default page;
