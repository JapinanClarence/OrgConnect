import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, MoveLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";

const PageHead = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-10 z-10 ">
      <div className="px-3 py-2 bg-slate-50 shadow-sm border-b  flex items-center justify-between">
        <Link to={"/"}>
          <ChevronLeft className="" size={25} />
        </Link>
        <Button className="rounded-full" size="icon" variant="ghost">
          <Search />
        </Button>
      </div>
    </header>
  );
};

export default PageHead;
