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
import { useAuth } from "@/context/AuthContext";

const UserItem = () => {
  const { logout, userData } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // const fullname = userData.middlename
  //   ? `${userData.firstname} ${userData.middlename.charAt(0)}. ${
  //       userData.lastname
  //     }`
  //   : `${userData.firstname} ${userData.lastname}`;
  return (
    <div className="grid grid-flow-col items-center border-5 p-2 border-t-2">
      <Avatar className="col-span-1">
        {/* <AvatarImage src="https://github.com/shadcn.png" alt="user-profile" /> */}
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
      <div className="col-span-5">
        <div className="text-[16px] font-bold">{userData.username}</div>
        <div className="text-[13px] font-neutral-500">{userData.email}</div>
      </div>
      <DropdownMenu className="col-span-1">
        <DropdownMenuTrigger asChild>
          <Button className="p-0">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white ">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserItem;
