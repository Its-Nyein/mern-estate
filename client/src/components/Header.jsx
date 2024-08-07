import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("searchTerm", searchTerm);
    const searchQuery = searchParams.toString();
    // searchParams(`/search/${searchQuery}`);
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTermFromURL = searchParams.get("searchTerm");
    if (searchTermFromURL) {
      setSearchTerm(searchTermFromURL);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-800 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold flex flex-wrap text-sm sm:text-xl">
            <span className="text-slate-200">Real</span>
            <span className="text-slate-400">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-[#38bdf81a] flex items-center rounded-xl p-3"
        >
          <input
            type="text"
            placeholder="Search . . ."
            className="bg-transparent text-[#38bdf8] focus:outline-none w-22 sm:w-65 placeholder-[#38bdf8] indent-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="bg-slate-60 text-[#38bdf8] cursor-pointer" />
          </button>
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
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile_avatar"
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10 border-2 border-[#38bdf8]"
              />
            ) : (
              <li className="sm:inline cursor-pointer hover:underline hover:text-[#38bdf8]">
                SignIn
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
