import { Outlet } from "react-router-dom";
import DesktopSidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const DashboardLayout = () => {
  return (
    // <div className="text-gray-100 dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]  ">
    //   <div className="overlay-area  absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10"></div>
    // </div>
    <>
      <div className="h-screen w-full">
        <DesktopSidebar />
        <div className={`flex flex-col flex-1 transition-all duration-300 md:ml-[72px] lg:ml-64`}>
          <Header />
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
