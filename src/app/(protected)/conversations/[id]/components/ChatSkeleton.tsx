const ChatSkeleton = () => {
  return (
    <div
      id="messages-container"
      className="flex flex-col space-y-2 h-full w-full justify-start pb-8 overflow-y-auto">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className={`flex flex-col bg-white p-4 rounded-lg shadow w-full h-auto ${
            index % 2 === 0 ? "items-start" : "items-end"
          } animate-pulse`}>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="w-20 h-4 bg-gray-300"></div>
          </div>
          <div className="w-32 h-4 bg-gray-300 mt-2"></div>
        </div>
      ))}
    </div>
  );
};

export default ChatSkeleton;
