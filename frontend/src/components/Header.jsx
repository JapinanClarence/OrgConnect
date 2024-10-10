import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, MenuIcon } from "lucide-react";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import MobileNav from "@/components/MobileNav";

const Header = ({ title }) => {
  return (
    <header className="sticky top-0 z-30 flex h-[53px] items-center border-b bg-zinc-200 px-4 shadow-md">
      <MobileNav/>
      <h1 className="text-xl font-semibold ml-2">Homepage</h1>
    </header>
  );
};

export default Header;
