import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { SignInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // send data to backend
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });
      const resData = await res.json();
      dispatch(SignInSuccess(resData));
      navigate("/");
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
