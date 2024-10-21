import LoginForm from "@/components/auth/LoginForm";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  return (
    <div className="w-full h-screen relative flex justify-center">
      <div className="absolute left-0 p-2">
        <img
          src="OrgConnect-transparent.svg"
          alt="OrgConnect logo"
          className="size-14 mx-auto"
        />
      </div>
       
      <div className="p-10 my-auto w-full">
        <Label>Welcome Back</Label>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
