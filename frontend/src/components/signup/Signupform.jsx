import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircle, CircleAlert } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-hot-toast";

const Signupform = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [username, setUsername] = useState("");
  const [studentId, setStudentId] = useState("");

  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const isSuccess = await signup(
       { firstname,
        lastname,
        middlename,
        age,
        course,
        username,
        studentId,
        email,
        password,
        contactNumber}
      );

      toast.success("Registered Successfully");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

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
        <form onSubmit={handleSignup}>
          {error && (
            <p className="bg-red-200 rounded-md border border-red-500 text-red-500 text-xs p-3 mb-2">
              {error}
            </p>
          )}
          <div className="md:flex gap-3">
            <div className="">
              <label htmlFor="" className="text-gray-600 text-sm">
                Firstname
              </label>
              <input
                id="firstname"
                type="text"
                className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600"
                required
                onChange={(e) => setFirstname(e.target.value)}
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
                onChange={(e) => setLastname(e.target.value)}
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
              onChange={(e) => setMiddlename(e.target.value)}
            />
          </div>
          <div className="md:flex gap-3">
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
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="">
              <label htmlFor="" className="text-gray-600 text-sm">
                Student Id
              </label>
              <input
                id="studentId"
                type="text"
                className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600"
                required
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
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
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>
          <div className="md:flex gap-3">
            <div className="">
              <label htmlFor="" className="text-gray-600 text-sm">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
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
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="text-gray-600 text-sm">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600"
              required
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-md text-white rounded-md px-3 py-2 w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderCircle className="w-6 h-6 text-gray-500 mx-auto animate-spin" />
              ) : (
                "Signup"
              )}
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
