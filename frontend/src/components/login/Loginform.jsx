import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
const Loginform = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = false;
  const handleLogin = (e) => {
    e.preventDefault();
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
          <div className="">
            <label htmlFor="" className="text-gray-600 text-sm">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600"
              placeholder="Enter Username..."
              required
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
              placeholder="Enter Password..."
              required
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
