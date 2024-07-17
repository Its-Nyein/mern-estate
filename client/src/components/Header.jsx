import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-800 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold flex flex-wrap text-sm sm:text-xl">
            <span className="text-slate-200">Real</span>
            <span className="text-slate-400">Estate</span>
          </h1>
        </Link>
        <form className="bg-[#38bdf81a] flex items-center rounded-xl p-3">
          <input
            type="text"
            placeholder="Search . . ."
            className="bg-transparent text-[#38bdf8] focus:outline-none w-22 sm:w-65 placeholder-[#38bdf8] indent-2"
          />
          <FaSearch className="bg-slate-60 text-[#38bdf8] cursor-pointer" />
        </form>
        <ul className="flex gap-4 items-center text-gray-50">
          <Link to="/">
            <li className="hidden sm:inline hover:underline cursor-pointer hover:text-[#38bdf8]">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline cursor-pointer hover:text-[#38bdf8]">
              About
            </li>
          </Link>
          <Link to="sign-in">
            <li className="sm:inline cursor-pointer hover:underline hover:text-[#38bdf8]">
              SignIn
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
