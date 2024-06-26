import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function Layout() {
  return (
    <main className="container mx-auto min-h-screen w-full flex flex-col items-center justify-between">
      <NavBar />
      <Outlet />
      <footer className="my-10">
        <p>© 2024 Infogram</p>
      </footer>
    </main>
  );
}

export default Layout;
