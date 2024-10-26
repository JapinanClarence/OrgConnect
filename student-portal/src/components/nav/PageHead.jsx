import React from "react";
import { ArrowLeft, ChevronLeft, MoveLeft, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const PageHead = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <header className="fixed top-0 left-0 w-full h-10 z-10 ">
      <div className="px-3 py-2 bg-slate-50 shadow-sm border-b  flex items-center justify-between">
        <button className="" onClick={handleClick}>
          <ChevronLeft size={25} />
        </button>
      </div>
      <div></div>
    </header>
  );
};

export default PageHead;
