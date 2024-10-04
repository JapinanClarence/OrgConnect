import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const UserItem = () => {
  return (
    <div className="grid grid-flow-col items-center border-5  p-2 border-t-2">
      <Avatar className="col-span-1">
        <AvatarImage src="https://github.com/shadcn.png" alt="user-profile" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="col-span-5">
        <div className="text-[16px] font-bold">John Doe</div>
        <div className="text-[13px] font-nuetral-500">johnD@gmail.com</div>
      </div>
      <DropdownMenu className="col-span-1">
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="bg-transparent">
            <MoreVertical size={24} className="col-span-1" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserItem;
