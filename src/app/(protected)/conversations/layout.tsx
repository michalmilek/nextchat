import ServerConversationList from "./components/ServerConversationList";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-screen h-screen justify-start items-center">
      <ServerConversationList />
      {children}
    </div>
  );
};

export default layout;
