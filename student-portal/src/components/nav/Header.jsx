import { Bell } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-10 z-10 ">
      <div className="pt-4 px-5  pb-3 bg-slate-50  flex content-center">
        <img
          src="OrgConnect.svg"
          alt="OrgConnect logo"
          className="w-12 ml-0 mr-auto"
        />
      </div>
    </header>

  );
};

export default Header;
