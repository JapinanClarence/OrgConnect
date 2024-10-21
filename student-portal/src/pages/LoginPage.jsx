import LoginForm from "@/components/auth/LoginForm";


const LoginPage = () => {
  return (
    <div className="w-full h-screen relative px-7">
      <div className="absolute left-0 pt-4 px-5 top-0 right-0 ">
        <img
          src="navlogo lightmode.svg"
          alt="OrgConnect logo"
          className="w-36 ml-0 mr-auto"
        />
      </div>

      <div className="w-full h-full flex flex-col justify-center gap-10">
        <div className="">
          <h1 className="text-2xl font-semibold">Welcome Back 👋</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the form to get started.
          </p>
        </div>
        <LoginForm />
        <div className="">
          <p className="text-sm text-zinc-800 text-center align-middle ">
            Dont have an account?{" "}
            <a href="/signup" className="font-semibold">
              Signup.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
