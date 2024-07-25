import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

//update storage rules firebase
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [uploadPer, setUploadPer] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [data, setData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleOnChange(file);
    }
  }, [file]);

  const handleOnChange = (file) => {
    //create unique fileName
    const fileName = new Date().getDate() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPer(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
          //keep your uploaded img url
          setData({ ...data, avatar: downloadedURL });
          setUploadError(false);
          setUploadSuccess(true);
        });
      }
    );
  };

  const handleOnUpdate = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData.success === false) {
        dispatch(updateUserFail(resData.message));
        return;
      }
      dispatch(updateUserSuccess(resData));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFail(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const resData = await res.json();
      if (resData.success === false) {
        dispatch(deleteUserFail(resData.message));
        return;
      }
      dispatch(deleteUserSuccess(resData));
    } catch (error) {
      dispatch(deleteUserFail(error.message));
    }
  };

  return (
    <div className="p-3 items-center max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6 text-white">
        Profile
      </h1>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          id="image"
          accept="image/*"
          hidden
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={data.avatar || currentUser.avatar}
          alt="profile_avatar"
          className="rounded-full h-40 w-40 self-center object-cover border-4 border-[#38bdf8]"
        />
        <p className="text-sm font-semibold self-center">
          {uploadError ? (
            <span className="text-red-600">
              Error upload image(image must be less than 2MB)
            </span>
          ) : uploadPer > 0 && uploadPer < 100 ? (
            <span className="text-violet-600">{`Image uploading ${uploadPer}%`}</span>
          ) : uploadPer === 100 && uploadSuccess ? (
            <span className="text-green-600">Image upload successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg focus:outline-none"
          defaultValue={currentUser.username}
          onChange={handleOnUpdate}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg focus:outline-none"
          defaultValue={currentUser.email}
          onChange={handleOnUpdate}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg focus:outline-none"
          onChange={handleOnUpdate}
        />
        <button
          disabled={loading}
          className="bg-blue-700/70 p-3 uppercase rounded-lg text-white hover:opacity-90 disabled:opacity-75"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between cursor-pointer mt-5">
        <span onClick={handleDelete} className="text-red-600 font-semibold">
          Delete Account
        </span>
        <span className="text-red-600 font-semibold">Sign Out</span>
      </div>
      <div className="text-green-600 mt-5">
        {updateSuccess ? "User Updated Successfully" : ""}
      </div>
    </div>
  );
};

export default Profile;
