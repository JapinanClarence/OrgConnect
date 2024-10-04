import Signupform from "@/components/auth/Signupform";

const Signuppage = () => {
  const handleSignup = (e) => {
    e.preventDefault();
  };
  
  return (
    <div className="h-screen w-full dark:bg-black bg-gray-100  dark:bg-grid-small-black/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-gray [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Signupform />
    </div>
  );
};

export default Signuppage;
