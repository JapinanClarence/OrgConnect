import React from "react";
import SignupForm from "@/components/auth/SignupForm";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // if already logged in navigate to homepage
  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });
  return (
    // bg-grid-small-black/[0.2]
    <div className="w-full px-7  min-h-screen py-10 flex justify-center items-center bg-grid-small-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10"></div>
      <div className="absolute left-0 pt-4 px-5 top-0 right-0 flex">
        <img
          src="OrgConnect.svg"
          alt="OrgConnect logo"
          className="w-12 ml-0 mr-auto"
        />
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" /> Install App
        </Button>
      </div>

      <div className="w-full h-full mt-12 py-10 ">
        <div className="mb-2">
          <h1 className="text-2xl font-bold">
            Welcome to{" "}
            <span className="h-12 font-bold font-accent bg-clip-text text-transparent bg-gradient-to-r  from-orange-400 to-yellow-500">
              OrgConnect
            </span>
          </h1>

          <p className="text-sm text-muted-foreground mt-2 ">
            Fill in the form to get started.
          </p>
        </div>
        <div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
