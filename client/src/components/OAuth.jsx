import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
  return (
    <div
      className="flex bg-red-700 p-3 rounded-lg text-white hover:opacity-95 
      disabled:opacity-75 gap-2 text-center justify-center cursor-pointer"
    >
      <FcGoogle className="text-2xl" />
      <button type="button" className="uppercase">
        Continue with google
      </button>
    </div>
  );
};

export default OAuth;
