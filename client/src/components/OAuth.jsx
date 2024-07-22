import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

const OAuth = () => {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={handleGoogleClick}
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
