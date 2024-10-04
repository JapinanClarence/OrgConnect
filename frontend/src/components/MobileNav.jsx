// components/MobileNav.js
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package2, Home, ShoppingCart, Package, Users, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import UserItem from "@/components/UserItem";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5 text-gray-900" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col bg-gray-900 text-white">
        <nav className="grid gap-2 text-lg font-medium">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <img src="NavLogo.svg" className="w-48" />
            {/* <span>Acme Inc</span> */}
          </Link>
          <Link to="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link to="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link to="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link to="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
            <Users className="h-5 w-5" />
            Customers
          </Link>
          <Link to="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
            <LineChart className="h-5 w-5" />
            Analytics
          </Link>
        </nav>
        <div className="mt-auto">
          <UserItem />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
