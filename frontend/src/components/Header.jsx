import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import MobileNav from "@/components/MobileNav";

const Header = ({title}) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] bg-gray-100 shadow-sm lg:px-6 z-10">
      {/* Mobile Navigation */}
      <MobileNav />

      {/* Search Bar */}
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full appearance-none bg-background text-gray-900 pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
