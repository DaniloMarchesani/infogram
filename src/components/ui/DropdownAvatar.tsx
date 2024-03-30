import React, { Suspense } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Skeleton,
  Avatar,
} from "@nextui-org/react";
import { useAuth } from "../../context/AuthContext";

const { VITE_BASE_BACKEND_URL } = import.meta.env;


function DropdownAvatar() {

    const { logout, profile } = useAuth();

  return (
    <Dropdown>
      <Suspense fallback={<Skeleton className="cursor-pointer size-7" />}>
        <DropdownTrigger>
          {/* <Button 
              variant="bordered" 
            >
              Open Menu
            </Button> */}
          <Avatar
            fallback={"...loading"}
            src={`${VITE_BASE_BACKEND_URL}images${profile?.avatarUrl}`}
            className="cursor-pointer size-7"
          />
        </DropdownTrigger>
      </Suspense>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="edit">Edit Profile</DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem key="Logout" className="text-danger" color="danger" onClick={() => logout() }>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropdownAvatar;
