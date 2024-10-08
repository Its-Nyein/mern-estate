import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        // Should match the proxy path
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resData = await response.json();

      if (resData.success === false) {
        setError(resData.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 items-center max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6 text-white">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          required
          className="border p-3 rounded-lg focus:outline-none"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          required
          className="border p-3 rounded-lg focus:outline-none"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          required
          minLength="8"
          className="border p-3 rounded-lg focus:outline-none"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-700/70 p-3 uppercase rounded-lg text-white hover:opacity-90 disabled:opacity-75"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-4 mt-5 text-white text-center justify-center">
        <p>Have an account?</p>
        <Link to="/sign-in" className="text-[#38bdf8]">
          Sign In
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
