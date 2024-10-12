import { Outlet } from "react-router-dom";
import DesktopSidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const DashboardLayout = () => {
  return (
    <>
      <div className="h-screen w-full">
        <DesktopSidebar />
        <div
          className={`flex flex-col flex-1 transition-all duration-300 md:ml-[72px] lg:ml-64`}
        >
          <Header title="" />
          <main className=" p-6 md:px-4 md:pt-8 bg-gray-100  dark:bg-dot-black/[0.2] bg-dot-black/[0.2]" style={{height: `calc(100vh - 53px)`}}>
            <div className="overlay-area  absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10"></div>

            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
