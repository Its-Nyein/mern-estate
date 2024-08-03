import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [contactLandlord, setContactLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      const res = await fetch(`/api/user/${listing?.userRef}`);
      const data = await res.json();

      setContactLandlord(data);
    };
    fetchLandlord();
  }, [listing?.userRef]);

  return (
    <div className="my-2 flex flex-col">
      <hr />
      {contactLandlord && (
        <div className="text-gray-300 mt-3">
          Contact{" "}
          <span className="font-semibold">{contactLandlord.username}</span>
          &nbsp;to{" "}
          <span className="font-semibold">{listing.name.toLowerCase()}</span>
        </div>
      )}
      <textarea
        name="message"
        id="message"
        rows="2"
        placeholder="Enter your message here..."
        className="w-full border-none my-3 p-3 focus:outline-none rounded-lg"
        value={message}
        onChange={onChange}
      ></textarea>
      <Link
        to={`mailto:${contactLandlord.email}?subbject=Regarding ${listing.name}&body=${message}`}
        className="bg-slate-700 p-3 text-white rounded-md text-center uppercase hover:opacity-90 disabled:opacity-85"
      >
        Send Message
      </Link>
    </div>
  );
};

Contact.propTypes = {
  listing: PropTypes.shape({
    userRef: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contact;
