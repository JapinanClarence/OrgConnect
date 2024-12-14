import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLayoutEffect } from "react";

const WelcomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // if already logged in navigate to homepage
  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });

  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Listen for the "beforeinstallprompt" event
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault(); // Prevent the mini-infobar from appearing
      setDeferredPrompt(e); // Save the event for triggering later
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null); // Clear the prompt
      });
    }
  };
  return (
    <div className="w-full h-screen flex flex-col p-5 bg-grid-small-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="absolute left-0 pt-4 px-5 top-0 right-0 flex ">
        <img
          src="OrgConnect.svg"
          alt="OrgConnect logo"
          className="w-12 ml-0 mr-auto"
        />
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/login")}
          >
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
          <Button
            variant="outline"
            className="mx-auto "
            size="sm"
            onClick={handleInstallClick}
          >
            <Download className="size-4 mr-1"/> Install App
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
