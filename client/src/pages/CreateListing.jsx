import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageURLs: [],
    name: "",
    description: "",
    address: "",
    price: 50,
    discountPrice: 0,
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    parking: false,
    offer: false,
    type: "rent",
  });
  console.log(formData);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleImageUpload = () => {
    if (files.length > 0 && files.length + formData.imageURLs.length < 7) {
      setUploadLoading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(imageStore(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageURLs: formData.imageURLs.concat(urls),
          });
          setImageUploadError(false);
          setUploadLoading(false);
        })
        .catch((err) => {
          setImageUploadError(
            "Image upload fail (AllowType: Image and MaxSize: 2MB)"
          );
          console.log(err);
          setUploadLoading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploadLoading(false);
    }
  };

  const imageStore = async (file) => {
    return new Promise((resolve, reject) => {
      const fileName = new Date().getDate() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
            resolve(downloadedURL);
          });
        }
      );
    });
  };

  const handleOnDelete = (index) => {
    setFormData({
      ...formData,
      imageURLs: formData.imageURLs.filter((_, idx) => idx != index),
    });
  };

  const handleOnChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageURLs < 1)
        return setError("You must choose at least one image");
      if (+formData.price < +formData.discountPrice)
        return setError("Discount price should be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
      }
      setLoading(false);
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6 text-white">
        Create Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-5">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            maxLength="62"
            minLength="10"
            required
            className="border rounded-lg p-3 focus:outline-none"
            onChange={handleOnChange}
            value={formData.name}
          />
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            required
            className="border rounded-lg p-3 focus:outline-none"
            onChange={handleOnChange}
            value={formData.description}
          />
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            required
            className="border rounded-lg p-3 focus:outline-none"
            onChange={handleOnChange}
            value={formData.address}
          />

          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="sell"
                id="sell"
                className="w-5"
                onChange={handleOnChange}
                checked={formData.type === "sell"}
              />
              <span className="text-white">Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="rent"
                id="rent"
                className="w-5"
                onChange={handleOnChange}
                checked={formData.type === "rent"}
              />
              <span className="text-white">Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
                onChange={handleOnChange}
                checked={formData.parking}
              />
              <span className="text-white">Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnish"
                id="furnished"
                className="w-5"
                onChange={handleOnChange}
                checked={formData.furnished}
              />
              <span className="text-white">Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                className="w-5"
                onChange={handleOnChange}
                checked={formData.offer}
              />
              <span className="text-white">Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                max="10"
                min="1"
                required
                className="p-3 rounded-md text-center focus:outline-none"
                onChange={handleOnChange}
                value={formData.bedrooms}
              />
              <span className="text-white">Bedrooms</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                max="10"
                min="1"
                required
                className="p-3 rounded-md text-center focus:outline-none"
                onChange={handleOnChange}
                value={formData.bathrooms}
              />
              <span className="text-white">Bathrooms</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                name="price"
                id="price"
                max="1000000"
                min="50"
                required
                className="py-3 px-5 rounded-md text-center focus:outline-none"
                onChange={handleOnChange}
                value={formData.price}
              />
              <div className="text-white flex flex-col">
                <span>Regular Price</span>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex gap-2">
                <input
                  type="number"
                  name="discountPrice"
                  id="discountPrice"
                  max="1000000"
                  min="0"
                  required
                  className="py-3 px-5 rounded-md text-center focus:outline-none"
                  onChange={handleOnChange}
                  value={formData.discountPrice}
                />
                <div className="text-white flex flex-col">
                  <span>Discounted Price</span>
                  <span className="text-xs">($/month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold text-[#38bdf8]">
            Images:
            <span className="font-normal text-[#38bdf8] ml-2">
              The first image will be the cover (max-6)
            </span>
          </p>
          <div className="flex gap-2">
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              multiple
              className="border border-sky-400 rounded p-3 w-full text-white cursor-pointer"
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              disabled={uploadLoading}
              onClick={handleImageUpload}
              className="border border-transparent p-3 text-white bg-green-900 uppercase rounded hover:shadow-lg  hover:opacity-90 disabled:opacity-80"
            >
              {uploadLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-600 text-xs font-semibold">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageURLs.length > 0 &&
            formData.imageURLs.map((url, index) => (
              <div
                key={index}
                className="flex justify-between border border-[#38bdf8] rounded p-3 items-center"
              >
                <img
                  src={url}
                  alt="image"
                  className="w-40 h-36 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleOnDelete(index)}
                  className="text-red-600 p-3 font-semibold hover:opacity-90 uppercase"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploadLoading}
            className="p-3 bg-green-900 text-white uppercase rounded hover:opacity-90 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
          {error && (
            <p className="text-red-600 text-xs font-semibold">{error}</p>
          )}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
