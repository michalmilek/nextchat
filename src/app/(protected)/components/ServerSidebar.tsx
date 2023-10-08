import SkeletonSidebar from "@/components/sidebar/SkeletonSidebar";
import getCurrentUser from "@/services/getCurrentUser";
import getUsers from "@/services/getUsers";
import dynamic from "next/dynamic";
import React from "react";
const Sidebar = dynamic(() => import("@/components/sidebar/Sidebar"), {
  loading: () => <SkeletonSidebar />,
  ssr: false,
});

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
