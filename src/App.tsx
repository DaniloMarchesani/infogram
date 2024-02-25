import { Routes, Route } from "react-router-dom";
import Layout from "./components/ui/Layout";
import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Profile";

function App() {

  return (
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={< Homepage/>} ></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Route>
          <Route path="/profile">
              <Route index element={<Profile />}></Route>
          </Route>
          <Route path="*"></Route>
      </Routes>
  )
}

export default App
