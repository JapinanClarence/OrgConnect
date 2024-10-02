// import { BackgroundBeams } from "./../components/ui/background-beams";
import Loginform from "../components/login/Loginform";
const Loginpage = () => {
  return (
    <div className="h-screen w-full dark:bg-black bg-gray-900  dark:bg-grid-small-white/[0.2] bg-grid-small-white/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Loginform/>
      
    </div>
  );
};

export default Loginpage;