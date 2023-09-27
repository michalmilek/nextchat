import AuthContext from "@/context/AuthContext";
import QueryContext from "@/context/QueryContext";
import ToasterContext from "@/context/ToasterContext";
import ServerSidebar from "../components/ServerSidebar";
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
