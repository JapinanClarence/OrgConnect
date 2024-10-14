import React from "react";
import { Link, useLocation } from "react-router-dom";
import MobileNav from "../components/MobileNav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";


const Header = ({ title }) => {
  const location = useLocation();

  // Split the current path into segments
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Helper to generate the path for each breadcrumb item
  const generatePath = (index) =>
    `/${pathSegments.slice(0, index + 1).join("/")}`;

  return (
    <header className="sticky top-0 z-30 flex h-[53px] items-center border-b bg-zinc-100 px-4 shadow-sm">
      <MobileNav />

      <Breadcrumb>
        <BreadcrumbList>
          {/* Home Breadcrumb */}
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className={
                pathSegments.length === 0 ? "text-zinc-900" : ""
              }
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
    </header>
  );
};

export default Header;
