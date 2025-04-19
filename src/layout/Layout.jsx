import React from "react";
import logo from "../assets/images/Logo.svg";
import avatarImg from "../assets/images/user.jpeg";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <nav className="flex justify-between items-center h-[80px] px-10 border-b border-[#E6E9FA]">
        <img src={logo} alt="Logo" />
        <div className="flex items-center gap-1">
          <p className="text-center font-normal text-[14px] flex flex-col items-center">
            Nauman <span className="text-[#7C8BA0] text-[12px]">Admin</span>
          </p>
          <img
            className="w-[46px] h-[46px] rounded-full object-cover"
            src={avatarImg}
            alt="user"
          />
        </div>
      </nav>
      {children}
      <footer className="flex justify-center items-center h-[80px] mt-8">
        <p className="text-[#7C8BA0] w-[90%] flex justify-between text-[14px]">
          © 2025 Revutopia. All Rights Reserved.
          <span className="text-[#2A9D8F] underline cursor-pointer">
            Become a partner
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
