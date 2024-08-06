const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="border-b-2 md:border-r-2 md:min-h-screen p-5">
        <form className="flex flex-col gap-6">
          <div className="flex gap-2 items-center">
            <label className="text-white font-semibold">Term:</label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              className="p-3 rounded-md focus:outline-none"
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
                checked
              />
              <span>Rent&Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="rent" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="sale" id="sale" className="w-5" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" id="offer" className="w-5" />
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
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnish"
                id="furnish"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-white font-semibold">Sort:</label>
            <select
              name="sort"
              id="sort"
              className="p-3 rounded-md focus:outline-none"
            >
              <option>High Price</option>
              <option>Low Price</option>
              <option>Latest</option>
              <option>Oldest</option>
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
