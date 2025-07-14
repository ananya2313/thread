import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FaInstagram } from "react-icons/fa";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProfileModal } from "../../../redux/slice";
import {
  useFollowUserMutation,
  useUserDetailsQuery,
} from "../../../redux/service";
import { useEffect, useState } from "react";
import EditProfile from "../../../components/modals/EditProfile";
import { Bounce, toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { MdChat } from "react-icons/md";

const ProfileLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const { data } = useUserDetailsQuery(userId, {
    skip: !userId,
  });

  const [followUser, followUserData] = useFollowUserMutation();
  const { darkMode, myInfo } = useSelector((state) => state.service);

  const [myAccount, setMyAccount] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const _300 = useMediaQuery("(min-width:300px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const user = data?.user;

  useEffect(() => {
    if (user && myInfo) {
      setMyAccount(user._id === myInfo._id);
      setIsFollowing(user.followers?.some((f) => f._id === myInfo._id));
    }
  }, [user, myInfo]);

  const handleFollow = async () => {
    if (user) await followUser(user._id);
  };

  const handleOpenEditModal = () => {
    dispatch(editProfileModal(true));
  };

  useEffect(() => {
    if (followUserData.isSuccess) {
      toast.success(followUserData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });
    } else if (followUserData.isError) {
      toast.error(followUserData.error?.data?.msg || "Follow failed", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [followUserData]);

  return (
    <>
      <Helmet>
        <title>{user ? `${user.userName} | Threads Clone` : "Threads Clone"}</title>
      </Helmet>

      <Stack
        flexDirection={"column"}
        gap={2}
        p={2}
        m={2}
        width={_700 ? "800px" : "90%"}
        mx={"auto"}
      >
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
          <Stack gap={1}>
            <Typography fontWeight="bold" fontSize={_300 ? "2rem" : "1rem"}>
              {user?.userName || "User"}
            </Typography>
            <Stack flexDirection="row" alignItems="center" gap={1}>
              <Typography fontSize={_300 ? "1rem" : "0.8rem"}>
                {user?.email || ""}
              </Typography>
              <Chip label="threads.net" size="small" sx={{ fontSize: _300 ? "0.8rem" : "0.6rem" }} />
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" gap={1}>
            {/* ✅ Chat icon visible only for your own profile */}
            {myAccount && (
              <IconButton
                onClick={() => navigate("/messages")}
                sx={{
                  border: "1px solid gray",
                  borderRadius: "10px",
                  mr: 1,
                }}
              >
                <MdChat size={_300 ? 28 : 20} />
              </IconButton>
            )}

            <Avatar
              src={user?.profilePic}
              alt={user?.userName}
              sx={{ width: _300 ? 60 : 40, height: _300 ? 60 : 40 }}
            />
          </Stack>
        </Stack>

        <Typography variant="subtitle2">{user?.bio || ""}</Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography color="gray" variant="subtitle2">
            {user?.followers?.length
              ? `${user.followers.length} followers`
              : "No Followers"}
          </Typography>
          <FaInstagram size={_300 ? 40 : 24} />
        </Stack>
      </Stack>

      <Button
        size="large"
        sx={{
          color: darkMode ? "whitesmoke" : "black",
          width: _700 ? "800px" : "90%",
          mx: "auto",
          border: "1px solid gray",
          borderRadius: "10px",
          ":hover": { cursor: "pointer" },
        }}
        onClick={myAccount ? handleOpenEditModal : handleFollow}
      >
        {myAccount ? "Edit Profile" : isFollowing ? "Unfollow" : "Follow User"}
      </Button>

      {/* ✅ Show Message button for OTHER user's profile */}
      {!myAccount && user?._id && (
        <Link to={`/chat/${user._id}`} style={{ textDecoration: "none" }}>
          <Button
            size="large"
            sx={{
              mt: 1,
              color: darkMode ? "whitesmoke" : "black",
              width: _700 ? "800px" : "90%",
              mx: "auto",
              border: "1px solid gray",
              borderRadius: "10px",
              ":hover": {
                cursor: "pointer",
                backgroundColor: darkMode ? "#333" : "#f0f0f0",
              },
            }}
          >
            💬 Message
          </Button>
        </Link>
      )}

      {/* ✅ Navigation Tabs */}
      <Stack
        flexDirection="row"
        justifyContent="space-evenly"
        my={5}
        pb={2}
        borderBottom="2px solid gray"
        fontSize={_500 ? "1.2rem" : _300 ? "1.1rem" : "0.9rem"}
        width={_700 ? "800px" : "90%"}
        mx="auto"
      >
        <Link to={`/profile/threads/${user?._id}`} className={`link ${darkMode ? "mode" : ""}`}>
          Threads
        </Link>
        <Link to={`/profile/replies/${user?._id}`} className={`link ${darkMode ? "mode" : ""}`}>
          Replies
        </Link>
        <Link to={`/profile/reposts/${user?._id}`} className={`link ${darkMode ? "mode" : ""}`}>
          Reposts
        </Link>
      </Stack>

      <Outlet />
      <EditProfile />
    </>
  );
};

export default ProfileLayout;
