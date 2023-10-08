import ServerConversationList from "./components/ServerConversationList";

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) => {
  console.log("🚀 ~ id:", params);
  return (
    <div className="flex w-screen h-screen justify-start items-center md:ml-[200px]">
      <ServerConversationList />
      {children}
    </div>
  );
};

export default layout;
