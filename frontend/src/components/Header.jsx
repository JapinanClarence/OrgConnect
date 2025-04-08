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
import apiClient from "@/api/axios";

const Header = () => {
  const { logout, userData, token } = useAuth();
  const [showUserDialog, setShowUserDialog] = useState();
  const navigate = useNavigate();
  const [orgName, setOrgName] = useState(null);

  const handleLogout = () => {
    logout();
  };

  const location = useLocation();

  // Split the current path into segments
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Helper to generate the path for each breadcrumb item
  const generatePath = (index) =>
    `/${pathSegments.slice(0, index + 1).join("/")}`;

  // Check and fetch org name if ID is in the path
  useEffect(() => {
    const fetchOrgName = async () => {
      const orgIndex = pathSegments.findIndex((seg) => seg === "organization");
      const orgId = pathSegments[orgIndex + 1];

      if (orgIndex !== -1 && orgId) {
        try {
          const res = await apiClient.get(`/superadmin/organization/${orgId}`, {
            headers: { Authorization: token },
          });
          setOrgName(res.data.data.name); // Adjust based on your response structure
        } catch (error) {
          console.error("Error fetching org name:", error);
        }
      }
    };

    fetchOrgName();
  }, [location.pathname]);
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
              const isOrgId = pathSegments[index - 1] === "organization";

              return (
                <React.Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={generatePath(index)}
                      className={isLastSegment ? "text-zinc-900" : ""}
                    >
                      {/* If this segment is an org ID, show the fetched orgName */}
                      {isOrgId && orgName
                        ? orgName
                        : segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
        {/* mobile icon */}
        <div className="ml-auto ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer">
                <Avatar className="cursor-pointer size-10">
                  <AvatarImage src={userData.profilePicture} />
                  <AvatarFallback className="text-gray-500 bg-gray-200">
                    {userData.username[0] + userData.username[1]}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:inline lg:ml-3 text-sm font-bold">
                  {userData.username}{" "}
                  <p className="font-normal">{userData.email}</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userData.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};

export default Header;
