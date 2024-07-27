const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6 text-white">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-5">
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
          />
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            required
            className="border rounded-lg p-3 focus:outline-none"
          />
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            required
            className="border rounded-lg p-3 focus:outline-none"
          />

          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" name="sell" id="sell" className="w-5" />
              <span className="text-white">Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="rent" id="rent" className="w-5" />
              <span className="text-white">Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
              />
              <span className="text-white">Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnish"
                id="furnish"
                className="w-5"
              />
              <span className="text-white">Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" id="offer" className="w-5" />
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
              />
              <span className="text-white">Bathrooms</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                name="price"
                id="price"
                max="10"
                min="1"
                required
                className="py-3 px-5 rounded-md text-center focus:outline-none"
              />
              <div className="text-white flex flex-col">
                <span>Regular Price</span>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                name="discountPrice"
                id="discountPrice"
                max="10"
                min="1"
                required
                className="py-3 px-5 rounded-md text-center focus:outline-none"
              />
              <div className="text-white flex flex-col">
                <span>Discounted Price</span>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold text-white">
            Images:
            <span className="font-normal text-[#38bdf8]">
              The first image will be the cover(max-6)
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
            />
            <button className="border border-transparent p-3 text-white bg-green-900 uppercase rounded hover:shadow-lg  hover:opacity-90 disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-green-900 text-white uppercase rounded hover:opacity-90 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
