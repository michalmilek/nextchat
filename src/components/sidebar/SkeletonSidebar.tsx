import React from "react";

const SkeletonSidebar = () => {
  return (
    <nav
      className={`hidden md:fixed top-0 bottom-0 md:flex flex-col z-50 shadow-xl md:w-[200px] h-screen bg-gray-800 justify-between`}>
      <aside className={`flex flex-col h-screen bg-gray-800 text-white`}>
        <button
          className="p-4 text-white fixed top-0 left-0 bg-gray-800 md:hidden"
          aria-label="Toggle Sidebar">
          {/* Skeleton */}
        </button>
        <div className={` pt-4 flex-grow `}>
          <div className="p-4">
            <h1 className="text-2xl font-bold block text-center">User list</h1>
          </div>
          <ul className={`space-y-2 block`}>
            <li className="w-full h-[30px] animate-pulse bg-gray-700"></li>
            <li className="w-full h-[30px] animate-pulse bg-gray-700"></li>
            <li className="w-full h-[30px] animate-pulse bg-gray-700"></li>
            <li className="w-full h-[30px] animate-pulse bg-gray-700"></li>
          </ul>
          {/* Skeleton */}
        </div>
      </aside>
      <div>{/* Skeleton */}</div>
    </nav>
  );
};

export default SkeletonSidebar;
