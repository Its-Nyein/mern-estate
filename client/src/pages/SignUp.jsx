import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-3 items-center max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6 text-white">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg focus:outline-none shadow-current"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg focus:outline-none"
        />
        <button className="bg-blue-700/70 p-3 uppercase rounded-lg text-white hover:opacity-90 disabled:opacity-75">
          Sign Up
        </button>
        <button className="bg-rose-700/70 p-3 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-75">
          Google
        </button>
      </form>
      <div className="flex gap-4 mt-5 text-white text-center justify-center">
        <p>Have an account?</p>
        <Link to="/sign-in" className="hover:text-[#38bdf8]">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
