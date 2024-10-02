import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";

const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login, error, isLoading } = useAuthStore();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const userData = {
            email,
            password,
          };
        //   console.log(userData)
        const isSuccess = await login(userData);

        toast.success("Login successful");
        navigate("/");
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="m-10 p-8 rounded-xl space-y-4 bg-white max-w-3xl w-[450px] shadow border border-slate-300"
    >
      <div className="leading-loose">
        <img
          src="OrgConnect-transparent.svg"
          alt="OrgConnect logo"
          className="w-16 h-16 mx-auto"
        />
        <h1 className="font-bold text-2xl text-gray-900">Login</h1>
        <p className="text-sm text-gray-600">
          Fill in the form to get started.
        </p>
      </div>
      <div className="">
        <form action="" id="login-form" onSubmit={handleLogin}>
        {error && (
            <p className="bg-red-200 rounded-md border border-red-500 text-red-500 text-xs p-3 mb-2">
              {error}
            </p>
          )}
          <div className="">
            <label htmlFor="" className="text-gray-600 text-sm">
              Username
            </label>
            <input
              type="text"
              className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="" className="text-gray-600 text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-10">
            <motion.button
              id="submit"
              className="bg-gray-900 hover:bg-gray-800 text-md text-white rounded-md px-3 py-2 w-full"
              disabled={isLoading}
            >
              {isLoading ? <LoaderCircle className="w-6 h-6 text-gray-500 mx-auto animate-spin" /> : "Login"}
            </motion.button>
            <p className="text-sm text-slate-900 mt-5 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Loginform;
