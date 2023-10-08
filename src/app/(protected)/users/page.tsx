import getUsers from "@/services/getUsers";
import React from "react";
import UserList from "./components/UserList";

const page = async () => {
  const users = await getUsers();

  return (
    <div className="h-full w-full mt-[70px] md:mt-0">
      <UserList users={users} />
    </div>
  );
};

export default page;
