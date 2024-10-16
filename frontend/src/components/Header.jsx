import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileNav from "@/components/MobileNav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";

const Header = () => {
  const { logout, userData } = useAuth();
  const [showUserDialog, setShowUserDialog] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const location = useLocation();

  // Split the current path into segments
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Helper to generate the path for each breadcrumb item
  const generatePath = (index) =>
    `/${pathSegments.slice(0, index + 1).join("/")}`;

  const fullname = `${userData.firstname} ${
    userData.middlename ? userData.middlename[0] + ". " : ""
  }${userData.lastname}`;

  
  
  return (
    <>
      <header className="top-0 flex h-[53px] items-center border-b bg-zinc-100 px-4 shadow-sm sticky z-10">
        <MobileNav />

        <Breadcrumb>
          <BreadcrumbList className="hidden md:flex ">
            {/* Home Breadcrumb */}
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className={pathSegments.length === 0 ? "text-zinc-900" : ""}
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            {pathSegments.map((segment, index) => {
              const isLastSegment = index === pathSegments.length - 1;
              return (
                <React.Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={generatePath(index)}
                      className={isLastSegment ? "text-zinc-900" : ""} // Active state styles
                    >
                      {/* Capitalize the segment */}
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer size-10">
                <AvatarFallback className="text-gray-500 bg-gray-200">
                  AD
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{fullname}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowUserDialog(true)}>
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

     <UserProfile userData={userData} open={showUserDialog} onOpenChange={setShowUserDialog}/>
    </>
  );
};

export default Header;
