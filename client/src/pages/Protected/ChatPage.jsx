import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "../../components/Chat";
import { useUserDetailsQuery } from "../../redux/service";

const ChatPage = () => {
  const { userId } = useParams(); // Chat receiver
  const { myInfo } = useSelector((state) => state.service);

  const { data: userDetails, isLoading } = useUserDetailsQuery(userId, {
    skip: !userId,
  });

  console.log("🧾 userId from URL:", userId);
  console.log("🧍 myInfo._id:", myInfo?._id);
  console.log("👤 userDetails:", userDetails);

  if (!myInfo?._id || !userId || isLoading || !userDetails) {
    return <p>Loading chat...</p>;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <Chat
          currentUserId={myInfo._id}
          currentUserName={myInfo.userName}
          chatWithUserId={userId}
          // chatWithUserName={userDetails?.userName}
          // chatWithUserPic={userDetails?.profilePic}
          chatWithUserName={userDetails?.user?.userName}
          chatWithUserPic={userDetails?.user?.profilePic}

        />
      </div>
    </div>
  );
};

export default ChatPage;
