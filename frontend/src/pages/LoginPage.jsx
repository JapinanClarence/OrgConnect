import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="h-screen w-full p-5 md:p-0 md:bg-gray-100  md:bg-grid-small-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
