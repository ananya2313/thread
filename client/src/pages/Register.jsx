import {
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLoginMutation, useSigninMutation } from "../redux/service";
import { Bounce, toast } from "react-toastify";
import Loading from "../components/common/Loading";

const Register = () => {
  const _700 = useMediaQuery("(min-width:700px)");

  const [signinUser, signinUserData] = useSigninMutation();
  const [loginUser, loginUserData] = useLoginMutation();

  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleLogin = () => {
    setLogin((pre) => !pre);
  };

  const handleLogin = async () => {
    const data = {
      email,
      password,
    };
    await loginUser(data);
  };

  // const handleRegister = async () => {
  //   const data = {
  //     userName,
  //     email,
  //     password,
  //   };
  //   await signinUser(data);
  // };

  // const handleRegister = async () => {
  //   const data = {
  //     userName,
  //     email,
  //     password,
  //   };
  
  //   try {
  //     const response = await signinUser(data).unwrap(); // Unwraps the response safely
  //     toast.success(response.msg, {
  //       position: "top-center",
  //       autoClose: 2500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       theme: "colored",
  //       transition: Bounce,
  //     });
  
  //     // Auto-login with registered email & password
  //     const loginResponse = await loginUser({ email, password }).unwrap();
  //     toast.success(loginResponse.msg, {
  //       position: "top-center",
  //       autoClose: 2500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       theme: "colored",
  //       transition: Bounce,
  //     });
  
  //     // Optionally store the token in localStorage
  //     localStorage.setItem("token", loginResponse.token);
  
  //     // Redirect to dashboard or homepage
  //     window.location.href = "/dashboard"; // Change this to your desired page
  
  //   } catch (error) {
  //     toast.error(error?.data?.msg || "Registration failed!", {
  //       position: "top-center",
  //       autoClose: 2500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       theme: "colored",
  //       transition: Bounce,
  //     });
  //   }
  // };
  const handleRegister = async () => {
    const data = {
      userName,
      email,
      password,
    };
  
    try {
      // Register the user
      const response = await signinUser(data).unwrap(); // Unwrap the response safely
      toast.success(response.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
  
      // Auto-login with registered email & password
      const loginResponse = await loginUser({ email, password }).unwrap();
      toast.success(loginResponse.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
  
      // Optionally store the token in localStorage
      localStorage.setItem("token", loginResponse.token);
  
      // Redirect to dashboard or homepage
      window.location.href = "/"; // Change this to your desired page
  
    } catch (error) {
      toast.error(error?.data?.msg || "Registration failed!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  
  

  // useEffect(() => {
  //   if (signinUserData.isSuccess) {
  //     toast.success(signinUserData.data.msg, {
  //       position: "top-center",
  //       autoClose: 2500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       theme: "colored",
  //       transition: Bounce,
  //     });
  //   }
  //   if (signinUserData.isError) {
  //     toast.error(signinUserData.error.data.msg, {
  //       position: "top-center",
  //       autoClose: 2500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       theme: "colored",
  //       transition: Bounce,
  //     });
  //   }
  // }, [signinUserData.isSuccess, signinUserData.isError]);

  useEffect(() => {
    if (signinUserData.isSuccess && signinUserData.data?.msg) {
      toast.success(signinUserData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
    if (signinUserData.isError && signinUserData.error?.data?.msg) {
      toast.error(signinUserData.error.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [
    signinUserData.isSuccess,
    signinUserData.isError,
    signinUserData.data?.msg,
    signinUserData.error?.data?.msg,
  ]);
  

  // useEffect(() => {
  //   if (loginUserData.isSuccess) {
  //     toast.success(loginUserData.data.msg, {
  //       position: "top-center",
  //       autoClose: 2500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       theme: "colored",
  //       transition: Bounce,
  //     });
  //   }
  //   if (loginUserData.isError) {
  //     toast.error(loginUserData.error.data.msg, {
  //       position: "top-center",
  //       autoClose: 2500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       theme: "colored",
  //       transition: Bounce,
  //     });
  //   }
  // }, [loginUserData.isSuccess, loginUserData.isError]);


  useEffect(() => {
    if (loginUserData.isSuccess && loginUserData.data?.msg) {
      toast.success(loginUserData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
    if (loginUserData.isError && loginUserData.error?.data?.msg) {
      toast.error(loginUserData.error.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [
    loginUserData.isSuccess,
    loginUserData.isError,
    loginUserData.data?.msg,
    loginUserData.error?.data?.msg,
  ]);
  

  if (signinUserData.isLoading || loginUserData.isLoading) {
    return (
      <Stack height={"90vh"} alignItems={"center"} justifyContent={"center"}>
        <Loading />
      </Stack>
    );
  }

  return (
    <>
      <Stack
        width={"100%"}
        height={"100vh"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={
          _700
            ? {
                backgroundImage: 'url("/register-bg.webp")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 600px",
              }
            : null
        }
      >
        <Stack
          flexDirection={"column"}
          width={_700 ? "40%" : "90%"}
          gap={2}
          mt={_700 ? 20 : 0}
        >
          <Typography
            variant="h5"
            fontSize={_700 ? "1.5rem" : "1rem"}
            fontWeight={"bold"}
            alignSelf={"center"}
          >
            {login ? " Login with Email" : " Register with Email"}
          </Typography>
          {login ? null : (
            <TextField
              variant="outlined"
              placeholder="Enter your userName..."
              onChange={(e) => setUserName(e.target.value)}
            />
          )}
          <TextField
            variant="outlined"
            placeholder="Enter your Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Enter your Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            size="large"
            sx={{
              width: "100%",
              height: 52,
              bgcolor: "green",
              color: "white",
              fontSize: "1rem",
              ":hover": {
                bgcolor: "blue",
                cursor: "pointer",
              },
            }}
            onClick={login ? handleLogin : handleRegister}
          >
            {login ? "Login" : "  Sign Up"}
          </Button>
          <Typography
            variant="subtitle2"
            fontSize={_700 ? "1.3rem" : "1rem"}
            alignSelf={"center"}
          >
            {login ? "Don`t have an account ?" : " Already have an accout ?"}
            <span className="login-link" onClick={toggleLogin}>
              {" "}
              {login ? "Sign up" : "Login"}
            </span>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Register;