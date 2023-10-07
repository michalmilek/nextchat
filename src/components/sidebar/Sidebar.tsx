"use client";

import useRoutes from "@/hooks/useRoutes";
import React, { useEffect, useState } from "react";
import SidebarLink from "./SidebarLink";
import { HiMenu, HiX } from "react-icons/hi";
import getCurrentUser from "@/services/getCurrentUser";
import { useMediaQuery } from "react-responsive";
import { User } from "@prisma/client";
import UserList from "./UserList";
import UserProfile from "../UserProfile";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.nav
        initial={{ height: 0, width: 0 }}
        animate={{
          height: isSidebarOpen ? "100%" : 0,
          width: isSidebarOpen ? "200px" : 0,
        }}
        transition={{ duration: 0.3 }}
        className={`flex flex-col z-50 shadow-xl  w-[100px] h-screen bg-gray-800 justify-between ${clsx(
          !isMediumResolution && "fixed h-screen"
        )}`}>
        <aside className={`flex flex-col h-screen bg-gray-800 text-white`}>
          <button
            className="p-4 text-white fixed top-0 left-0 bg-gray-800 md:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar">
            {isSidebarOpen ? <HiX /> : <HiMenu />}
          </button>
          {isSidebarOpen && (
            <div className={` pt-4 flex-grow `}>
              <div className="p-4">
                <h1 className="text-2xl font-bold hidden md:block">
                  Next Chat
                </h1>
              </div>
              <nav>
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
          )}
        </aside>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}>
            <UserProfile currentUser={currentUser} />
          </motion.div>
        )}
      </motion.nav>
    </AnimatePresence>
  );
};

export default Sidebar;
