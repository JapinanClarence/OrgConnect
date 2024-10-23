import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    // bg-grid-small-black/[0.2]
    <div className="w-full h-screen relative px-7 bg-grid-small-black/[0.2] ">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10"></div>
      <div className="absolute left-0 pt-4 px-5 top-0 right-0 ">
        <img
          src="NavLogo lightmode.svg"
          alt="OrgConnect logo"
          className="w-36 ml-0 mr-auto"
        />
      </div>

      <div className="w-full h-full flex flex-col justify-center ">
        <div className="mb-2">
          <h1 className="text-2xl font-bold">Welcome to</h1>
          <h2 className="text-4xl h-12 font-bold font-accent bg-clip-text text-transparent bg-gradient-to-r  from-orange-400 to-yellow-500">
            OrgConnect
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Fill in the form to get started.
          </p>
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
