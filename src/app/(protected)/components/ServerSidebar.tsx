import Sidebar from "@/components/sidebar/Sidebar";
import getCurrentUser from "@/services/getCurrentUser";
import getUsers from "@/services/getUsers";
import React from "react";

const ServerSidebar = async () => {
  const currentUser = await getCurrentUser();
  const users = await getUsers();
  return (
    <Sidebar
      users={users}
      currentUser={currentUser!}
    />
  );
};

export default ServerSidebar;
