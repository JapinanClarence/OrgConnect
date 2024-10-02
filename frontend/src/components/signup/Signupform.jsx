import { motion } from "framer-motion";
import Input from "../ui/input";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const Signupform = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="m-10 p-8 rounded-xl space-y-4 bg-white max-w-lg shadow border border-slate-300"
    >
      <div className="leading-loose">
        <img
          src="OrgConnect-transparent.svg"
          alt="OrgConnect logo"
          className="w-16 h-16 mx-auto"
        />
        <h1 className="font-bold text-2xl text-gray-900">Sign up</h1>
        <p className="text-sm text-gray-600">
          Fill in the form to get started.
        </p>
      </div>
      <div className="">
        <form action="" id="signup-form">
          <div className="lg:flex gap-3">
            <div className="">
              <label htmlFor="" className="text-gray-600 text-sm">
                Firstname
              </label>
              <Input
                id="firstname"
                type="text"
                required
              />
            </div>
            <div className="">
              <label htmlFor="" className="text-gray-600 text-sm">
                Lastname
              </label>
              <input
                id="lastname"
                type="text"
                className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600"
                required
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="text-gray-600 text-sm">
              Middlename
            </label>
            <input
              id="middlename"
              type="text"
              className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600"
            />
          </div>
          <div className="lg:flex gap-3">
            <div className="">
              <label htmlFor="" className="text-gray-600 text-sm">
                Age
              </label>
              <input
                id="age"
                type="number"
                min={"0"}
                className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600"
                required
              />
            </div>
            <div className="">
              <label htmlFor="" className="text-gray-600 text-sm">
                Course
              </label>
              <input
                id="course"
                type="text"
                className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600"
                required
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="text-gray-600 text-sm">
              Contact number
            </label>
            <input
              id="contact-number"
              type="text"
              maxLength="11"
              className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600"
              required
            />
          </div>
          <div className="">
            <label htmlFor="" className="text-gray-600 text-sm">
              Email
            </label>
            <input
              id="email"
              type="text"
              maxLength="12"
              className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600"
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
              minLength="8"
              className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600"
              required
            />
          </div>
          <div className="mt-10">
            <button
              id="submit"
              className="bg-gray-900 hover:bg-gray-800 text-md text-white rounded-md px-3 py-2 w-full"
            >
              Signup
            </button>
            <p className="text-sm text-slate-900 mt-5 text-center">
              Already have an account?{" "}
              <Link className="font-bold hover:underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Signupform;
