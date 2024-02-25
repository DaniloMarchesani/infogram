import React from "react";
import Logo from "./Logo";
import { Button } from "@nextui-org/react";
import ThemeSwitch from "../theme/ThemeSwitch";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className="w-full">
      <nav className="flex justify-between items-center">
        <Logo />
        <div className="flex items-center justify-center gap-2">
          <Button size="md" variant="solid" color="primary">
            <NavLink to={"/login"}>Login</NavLink>
          </Button>
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
