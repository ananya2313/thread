import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Protected/Home";
import ProfileLayout from "./pages/Protected/profile/ProfileLayout";
import Replies from "./pages/Protected/profile/Replies";
import Repost from "./pages/Protected/profile/Repost";
import Threads from "./pages/Protected/profile/Threads";
import ProtectedLayout from "./pages/Protected/ProtectedLayout";
import Search from "./pages/Protected/Search";
import Register from "./pages/Register";
import SinglePost from "./pages/Protected/SinglePost";
import { useMyInfoQuery } from "./redux/service";
import ChatPage from "./pages/Protected/ChatPage"; // ✅ new wrapper page
// import ChatList from "./components/ChatList";
import MessageListPage from "./pages/Protected/MessageListPage"; 
const App = () => {
  const { darkMode } = useSelector((state) => state.service);
  // const { data, isError } = useMyInfoQuery();
  const token = localStorage.getItem("token");

  // const { data, isError } = useMyInfoQuery(undefined, {
  //   skip: !token, // ✅ Don't call if token doesn't exist
  // });

  const { data, isError } = useMyInfoQuery(undefined, {
    skip: !token,
    onError: (err) => {
      if (err?.status !== 401) {
        console.error("❌ myInfo fetch error:", err);
      }
    },
  });

  if (isError || !data) {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <>
      <Box minHeight={"100vh"} className={darkMode ? "mode" : ""}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<ProtectedLayout />}>
              <Route exact path="" element={<Home />} />
              <Route exact path="post/:id" element={<SinglePost />} />
              <Route exact path="search" element={<Search />} />
              <Route exact path="chat/:userId" element={<ChatPage />} />
              <Route exact path="messages" element={<MessageListPage />} />

              <Route exact path="profile" element={<ProfileLayout />}>
                <Route exact path="threads/:id" element={<Threads />} />
                <Route exact path="replies/:id" element={<Replies />} />
                <Route exact path="reposts/:id" element={<Repost />} />
              </Route>
            </Route>

            <Route exact path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
};

export default App;
