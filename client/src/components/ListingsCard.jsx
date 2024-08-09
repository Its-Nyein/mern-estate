import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { SiMaplibre } from "react-icons/si";

const ListingsCard = ({ listing }) => {
  return (
    <div className="bg-[#07101b] shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageURLs[0]}
          alt="listing image"
          className="h-[330px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 text-[#94a3b8] flex flex-col gap-2">
          <p className="font-semibold truncate">{listing.name}</p>
          <div className="flex gap-2">
            <SiMaplibre className="text-xl text-[#304a69]" />
            <p className="truncate">{listing.address}</p>
          </div>
          <span className="line-clamp-4">{listing.description}</span>
          <div className="font-semibold">
            ${" "}
            {listing.offer
              ? listing.price.toLocaleString("en-US")
              : listing.discountPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </div>
          <div className="flex gap-4 font-bold text-sm">
            <span>
              {listing.bathrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bathrooms} bed`}
            </span>
            <span>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bed`}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

ListingsCard.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default ListingsCard;
