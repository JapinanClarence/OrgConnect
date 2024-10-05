import { Outlet } from "react-router-dom";
import DesktopSidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Header from "@/components/Header";

const DashboardLayout = () => {
  return (
    <div className="h-screen text-gray-100 w-full flex  dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]  ">
      {/* <div className="overlay-area  absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10"></div> */}

      {/* Layout with Sidebar (Desktop) and Mobile Nav */}
      <div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] z-10">
        {/* Sidebar for Desktop */}
        <DesktopSidebar />

        {/* Main Content Area */}
        <div className="flex flex-col w-full">
          {/* Header */}
          <Header/>

          {/* Page content */}
          <main >
            {/* Render child routes */}
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
