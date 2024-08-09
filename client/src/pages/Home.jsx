import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import ListingsCard from "../components/ListingsCard";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      const res = await fetch(`/api/listing/get?type=rent&limit=4`);
      const data = await res.json();
      setRentListings(data);
    };

    const fetchSaleListings = async () => {
      const res = await fetch(`/api/listing/get?type=sell&limit=4`);
      const data = await res.json();
      setSaleListings(data);
    };

    fetchOfferListings();
  }, []);
  return (
    <div>
      <div className="flex flex-col p-20 gap-5 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-200 font-bold text-3xl sm:text-6xl">
          Discover your next <span className="text-slate-500">place</span>
          <br />
          with confidence and ease
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          M3RNEstate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </p>
        <Link
          to={`/search`}
          className="text-slate-500 font-bold hover:text-[#38bdf8] hover:underline"
        >
          Let&apos;s get started...
        </Link>
      </div>

      <Swiper modules={[Navigation]} navigation={true}>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing.id}>
              <div
                className="h-[500px]"
                style={{
                  background: `url(${listing.imageURLs[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="flex flex-col p-16 gap-5 px-3 max-w-6xl mx-auto">
        {offerListings && offerListings.length > 0 && (
          <div className="border-b">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-500 mb-3">
                Recent Offers...
              </h2>
              <Link
                to={`/search?offer=true`}
                className="text-slate-500 font-bold hover:text-[#38bdf8] hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 mb-10">
              {offerListings.map((listing) => (
                <ListingsCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="border-b">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-500 mb-3">
                Recent Rent
              </h2>
              <Link
                to={`/search?type=rent`}
                className="text-slate-500 font-bold hover:text-[#38bdf8] hover:underline"
              >
                Show more rents...
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 mb-10">
              {rentListings.map((listing) => (
                <ListingsCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="border-b">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-500 mb-3">
                Recent Sale
              </h2>
              <Link
                to={`/search?type=sell`}
                className="text-slate-500 font-bold hover:text-[#38bdf8] hover:underline"
              >
                Show more sale...
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 mb-10">
              {saleListings.map((listing) => (
                <ListingsCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
