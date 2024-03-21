import React from "react";
import Logo from "./Logo";
import { Button } from "@nextui-org/react";
import ThemeSwitch from "../theme/ThemeSwitch";
import { NavLink, useLocation } from "react-router-dom";
import { User } from "lucide-react";

function NavBar() {

  const { pathname } = useLocation();
  
  
  return (
    <header className="w-full">
      <nav className="flex justify-between items-center">
        <Logo />
        { pathname === "/" ? <div className="flex items-center justify-center gap-2">
          <Button size="md" variant="flat" color="primary">
            <NavLink to={"/login"}><span className="flex items-center justify-between gap-1">Login <User /></span></NavLink>
          </Button>
          <ThemeSwitch />
        </div> : <ThemeSwitch /> }
      </nav>
    </header>
  );
}

export default NavBar;
