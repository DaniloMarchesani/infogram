import { Routes, Route } from "react-router-dom";
import Layout from "./components/ui/Layout";
import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {

  return (
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={< Homepage/>} ></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Route>
          <Route path="/profile">
              <Route index element={<>Profile page</>}></Route>
          </Route>
      </Routes>
  )
}

export default App
