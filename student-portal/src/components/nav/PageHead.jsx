import React from "react";
import { ArrowLeft, ChevronLeft, MoveLeft, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const PageHead = ({ title }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <header className="fixed top-0 left-0 w-full h-10 z-10 ">
      <div className="px-3 py-2 bg-slate-50 shadow-sm border-b  flex gap-2 items-center ">
        <Button variant="ghost" size="icon" className="" onClick={handleClick}>
          <ChevronLeft size={23}/>
        </Button>
        <div className="flex-1  font-medium ">
          <h1>{title}</h1>
        </div>
      </div>
      <div></div>
    </header>
  );
};

export default PageHead;
