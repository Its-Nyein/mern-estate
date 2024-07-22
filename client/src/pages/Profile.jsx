import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 items-center max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6 text-white">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile_avatar"
          className="rounded-full h-40 w-40 self-center object-cover border-4 border-[#38bdf8]"
        />
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg focus:outline-none"
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
        <button
          type="button"
          className="bg-blue-700/70 p-3 uppercase rounded-lg text-white hover:opacity-90 disabled:opacity-75"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between cursor-pointer mt-5">
        <span className="text-red-600 font-semibold">Delete Account</span>
        <span className="text-red-600 font-semibold">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
