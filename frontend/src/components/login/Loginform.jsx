const Loginform = () => {
  return (
    <div className="m-10 px-10 py-8 rounded-lg space-y-4 bg-white w-96 max-w-96">
      <form action="" id="login-form">
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
            <button
              id="submit"
              className="bg-gray-900 hover:bg-gray-800 text-md text-white rounded-md px-3 py-2 w-full"
            >
              Login
            </button>
            <p className="text-sm text-slate-900 mt-5 text-center">
              Don't have an account?{" "}
              <span className="font-bold">Create an account</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Loginform;
