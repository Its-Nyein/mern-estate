import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Listing = () => {
  const params = useParams();
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
  console.log(error);
  console.log(loading);
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
          </div>
        )}
      </div>
    </main>
  );
};

export default Listing;
