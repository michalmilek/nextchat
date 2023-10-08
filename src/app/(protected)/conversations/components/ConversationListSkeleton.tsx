import React from "react";

const ConversationListSkeleton = () => {
  return (
    <div className="flex flex-col border-r shadow items-center w-full md:w-[400px] h-screen pt-10 md:pt-0">
      <div className="flex items-center space-x-2 mb-4 w-full justify-between p-4">
        <div className="w-16 h-6 bg-gray-300 animate-pulse"></div>
        <div className="w-6 h-6 bg-gray-300 animate-pulse"></div>
      </div>
      <div className="w-full h-12 bg-gray-300 animate-pulse"></div>
      <div className="w-full h-12 bg-gray-300 animate-pulse"></div>
      <div className="w-full h-12 bg-gray-300 animate-pulse"></div>
      <div className="w-full h-12 bg-gray-300 animate-pulse"></div>

      <div className="w-full h-12 bg-gray-300 animate-pulse my-4"></div>
      <ul className="w-full flex flex-col gap-4">
        <li className="w-full h-12 bg-gray-300 animate-pulse"></li>
        <li className="w-full h-12 bg-gray-300 animate-pulse"></li>
        <li className="w-full h-12 bg-gray-300 animate-pulse"></li>
        <li className="w-full h-12 bg-gray-300 animate-pulse"></li>
        <li className="w-full h-12 bg-gray-300 animate-pulse"></li>
      </ul>
    </div>
  );
};

export default ConversationListSkeleton;
