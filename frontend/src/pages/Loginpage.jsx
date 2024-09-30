import { BackgroundBeams } from "./../components/ui/background-beams";

const Loginpage = () => {
  return (
    <div className="h-screen w-full -z-10 text-gray-100 bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
       
      <div className="max-w-2xl mx-auto p-4">
        <div className="p-5 rounded-md bg-white  border border-gray-500  w-[400px] max-w-md z-10 an">
          <div className="flex flex-col items-center">
            <img
              src="OrgConnect-transparent.svg"
              alt="OrgConnect logo"
              className="w-20 h-20"
            />
          </div>
          <div className="mt-5">
            <p className="text-md text-gray-900">
              Fill in the form to get started.
            </p>
            <input type="text" className=""/>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Loginpage;
