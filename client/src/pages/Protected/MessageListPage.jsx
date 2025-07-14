// src/pages/Protected/MessageListPage.jsx
import { useSelector } from "react-redux";
import ChatList from "../../components/ChatList";

const MessageListPage = () => {
  const { myInfo } = useSelector((state) => state.service);

  if (!myInfo?._id) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ChatList currentUserId={myInfo._id} />
    </div>
  );
};

export default MessageListPage;
