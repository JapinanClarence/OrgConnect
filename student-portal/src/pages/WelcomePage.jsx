import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Download } from "lucide-react";
const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col p-5">
      <div className="absolute left-0 pt-4 px-5 top-0 right-0 flex ">
        <img
          src="NavLogo lightmode.svg"
          alt="OrgConnect logo"
          className="w-36 ml-0 mr-auto"
        />
                <div>
          <Button variant="outline" className="h-9">
              Login
          </Button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center text-center gap-2">
        <div>
          <h1 className="text-2xl font-bold">Welcome to</h1>
          <h2 className="text-4xl h-12 font-bold font-accent bg-clip-text text-transparent bg-gradient-to-r  from-orange-400 to-yellow-500">
            OrgConnect
          </h2>
        </div>
        <div className="">
          <Button variant="outline" className="mx-auto" size="sm">
            <Download /> Install OrgConnect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
