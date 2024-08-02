import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { SiMaplibre } from "react-icons/si";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";

const Listing = () => {
  const params = useParams();
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/getListing/${params.id}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setListingData(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.id]);

  return (
    <main>
      {loading && (
        <p className="text-center text-2xl my-7 text-white">Loading...</p>
      )}
      {error && (
        <p className="text-center text-2xl my-7 text-white">
          Something went wrong!
        </p>
      )}
      <div>
        {listingData && !loading && !error && (
          <div>
            <Swiper modules={[Navigation]} navigation={true}>
              {listingData.imageURLs.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="h-[550px]"
                    style={{
                      background: `url(${image}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="fixed text-3xl top-[13%] right-[3%] z-10 cursor-pointer border border-transparent rounded-full size-10 flex items-center justify-center bg-slate-700">
              <FaRegShareSquare
                className="text-[#38bdf8]"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            <div>
              {copied && (
                <p className="top-[20%] right-[3%] fixed z-10 rounded-md bg-slate-700 p-2 text-[#38bdf8]">
                  Link copied
                </p>
              )}
            </div>
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7">
              <div className="mt-5 flex text-white text-xl font-semibold">
                {listingData.name} - ${" "}
                {listingData.offer
                  ? listingData.price.toLocaleString("en-US")
                  : listingData.discountPrice.toLocaleString("en-US")}
                {listingData.type === "rent" && " / month"}
              </div>

              <div className="mt-5 flex items-center gap-2 text-white mb-3">
                <SiMaplibre className="text-2xl text-red-800" />
                {listingData.address}
              </div>

              <div className="flex gap-4">
                <p className="p-3 bg-red-900 w-full max-w-[200px] rounded-md text-center items-center text-white">
                  {listingData.type === "Rent" ? "For Rent" : "For Sale"}
                </p>
                {listingData.offer && (
                  <p className="p-3 w-full bg-green-900 max-w-[200px] rounded-md text-center items-center text-white">
                    ${+listingData.price - +listingData.discountPrice}
                  </p>
                )}
              </div>

              <div className="text-gray-300 mt-5 mb-3">
                <span className="text-lg text-gray-50 font-semibold">
                  Description -{" "}
                </span>
                {listingData.description}
              </div>

              <ul className="text-green-800 font-semibold gap-4 sm:gap-6 items-center my-3 flex whitespace-nowrap flex-wrap">
                <li className="flex gap-3">
                  <FaBed className="text-2xl" />
                  {listingData.bedrooms > 1
                    ? `${listingData.bedrooms} beds`
                    : `${listingData.bedrooms} bed`}
                </li>
                <li className="flex gap-3">
                  <FaBath className="text-xl" />
                  {listingData.bathrooms > 1
                    ? `${listingData.bathrooms} beds`
                    : `${listingData.bathrooms} bed`}
                </li>
                <li className="flex gap-3">
                  <FaParking className="text-xl" />
                  {listingData.parking ? "Parking Spot" : "No Parking"}
                </li>
                <li className="flex gap-3">
                  <FaChair className="text-xl" />
                  {listingData.furnished ? "Furnished" : "Unfurnished"}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Listing;
