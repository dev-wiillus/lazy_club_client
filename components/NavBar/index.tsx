import React from "react";
import RoleChanger from "./RoleChanger";
import Logo from "./Logo";
import Menu from "./Menu";
import Avatar from "./Avatar";

export default function NavBar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start gap-2">
        <Menu />
        <Logo />
      </div>
      <div className="navbar-end gap-2">
        <RoleChanger />
        <Avatar />
      </div>
    </div>
  );
}
