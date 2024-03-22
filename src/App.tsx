import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Layout from "./components/ui/Layout";
import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Profile";
import { useAuth } from "./context/AuthContext";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import IUser from "./interfaces/User";
import { NextUIProvider } from "@nextui-org/react";
import CreateProfile from "./pages/profile/CreateProfile";

const { VITE_BACKEND_URL } = import.meta.env;

function App() {
  const { loading: authLoading, logout, setAsLogged, setProfile, profile, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [profileUsername, setProfileUsername] = useState<string>("");

  //UseEffect to check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
      if(location.pathname === "/register") return;
      navigate("/login");
      return;
    }

    axios //If there is a token, check if it is valid
      .get<IUser>(`${VITE_BACKEND_URL}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => { //If the token is valid, set the user as logged in
        console.log("first get IUser then: ", response.data)
        setAsLogged && setAsLogged({ ...response.data, token: token! });
        axios //Get the user profile
          .get(`${VITE_BACKEND_URL}/profile/${response.data.username}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => { //Set the user profile
            console.log("second get profile then: ", response.data)
            setProfileUsername(response.data.username);
            setProfile(response.data);
          });
      }) //If the token is invalid, redirect to login page
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
  }, []);
  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
        <Route path="/profile">
          <Route index element={<Profile />}></Route>
          <Route path="create" element={<CreateProfile profile={profileUsername} />}></Route>
        </Route>
        <Route path="*"></Route>
      </Routes>
    </NextUIProvider>
  );
}

export default App;
