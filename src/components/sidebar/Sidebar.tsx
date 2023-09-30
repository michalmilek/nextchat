"use client";

import useRoutes from "@/hooks/useRoutes";
import React, { useEffect, useState } from "react";
import SidebarLink from "./SidebarLink";
import { HiMenu, HiX } from "react-icons/hi";
import getCurrentUser from "@/services/getCurrentUser";
import { useMediaQuery } from "react-responsive";
import { User } from "@prisma/client";
import UserList from "./UserList";

const Sidebar = ({
  currentUser,
  users,
}: {
  currentUser: User;
  users: User[];
}) => {
  const routes = useRoutes();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMediumResolution = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isMediumResolution) {
      setIsSidebarOpen(true);
    }
  }, [isMediumResolution]);

  return (
    <aside className={`flex flex-col h-screen bg-gray-800 text-white`}>
      <button
        className="p-4 text-white fixed top-0 left-0 bg-gray-800 md:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar">
        {isSidebarOpen ? <HiX /> : <HiMenu />}
      </button>
      <div className={`${isSidebarOpen ? "" : "hidden"} pt-4`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold hidden md:block">My Sidebar</h1>
        </div>
        <nav className="flex-grow">
          <div className="sm:hidden"></div>
          <ul
            className={`space-y-2 ${
              isSidebarOpen ? "block" : "hidden sm:block"
            }`}>
            {routes.map((route, index) => (
              <SidebarLink
                href={route.href}
                icon={route.icon}
                label={route.label}
                active={route.active}
                onClick={route.onClick}
                key={route.label + index}
              />
            ))}
          </ul>
        </nav>
        <UserList users={users} />
      </div>
    </aside>
  );
};

export default Sidebar;
