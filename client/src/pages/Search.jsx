import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchSidebar, setSearchSidebar] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "created_at",
    order: "desc",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrlParams = urlParams.get("searchTerm");
    const typeFromUrlParams = urlParams.get("type");
    const offerFromUrlParams = urlParams.get("offer");
    const parkingFromUrlParams = urlParams.get("parking");
    const furnishedFromUrlParams = urlParams.get("furnished");
    const sortFromUrlParams = urlParams.get("sort");
    const orderFromUrlParams = urlParams.get("order");

    if (
      searchTermFromUrlParams ||
      typeFromUrlParams ||
      offerFromUrlParams ||
      parkingFromUrlParams ||
      furnishedFromUrlParams ||
      sortFromUrlParams ||
      orderFromUrlParams
    ) {
      setSearchSidebar({
        searchTerm: searchTermFromUrlParams || "",
        type: typeFromUrlParams || "all",
        offer: offerFromUrlParams === "true" ? true : false,
        parking: parkingFromUrlParams === "true" ? true : false,
        furnished: furnishedFromUrlParams === "true" ? true : false,
        sort: sortFromUrlParams || "created_at",
        order: orderFromUrlParams || "desc",
      });
    }
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSearchSidebar({ ...searchSidebar, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSearchSidebar({ ...searchSidebar, searchTerm: e.target.value });
    }

    if (
      e.target.id === "offer" ||
      e.target.id === "parking" ||
      e.target.id === "furnished"
    ) {
      setSearchSidebar({
        ...searchSidebar,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      setSearchSidebar({ ...searchSidebar, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // create new urlQueryParams
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchSidebar.searchTerm);
    urlParams.set("type", searchSidebar.type);
    urlParams.set("offer", searchSidebar.offer);
    urlParams.set("parking", searchSidebar.parking);
    urlParams.set("furnished", searchSidebar.furnished);
    urlParams.set("sort", searchSidebar.sort);
    urlParams.set("order", searchSidebar.order);
    const paramsQuery = urlParams.toString();
    navigate(`/search?${paramsQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="border-b-2 md:border-r-2 md:min-h-screen p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-2 items-center">
            <label className="text-white font-semibold">Term:</label>
            <input
              type="text"
              name="searchTerm"
              id="searchTerm"
              placeholder="Search..."
              className="p-3 rounded-md focus:outline-none"
              onChange={handleChange}
              value={searchSidebar.searchTerm}
            />
          </div>
          <div className="text-white flex flex-wrap gap-2">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="all"
                id="all"
                className="w-5"
                onChange={handleChange}
                value={searchSidebar.type === "all"}
              />
              <span>Rent&Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="rent"
                id="rent"
                className="w-5"
                onChange={handleChange}
                value={searchSidebar.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="sale"
                id="sale"
                className="w-5"
                onChange={handleChange}
                value={searchSidebar.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={searchSidebar.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="text-white flex flex-wrap gap-2 items-center">
            <label className="font-semibold">Facilities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={searchSidebar.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={searchSidebar.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-white font-semibold">Sort:</label>
            <select
              name="sort_order"
              id="sort_order"
              className="p-3 rounded-md focus:outline-none"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value="price_desc">High Price</option>
              <option value="price_asc">Low Price</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="p-3 text-white bg-slate-700 w-full rounded-md uppercase hover:opacity-90 disabled:opacity-85">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-2xl text-white p-7 border-b">Listing Result:</h1>
      </div>
    </div>
  );
};

export default Search;
