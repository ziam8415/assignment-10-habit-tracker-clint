import React from "react";

import Lottie from "lottie-react";
import notFoundAnim from "../assets/animations/Error 404.json";
import { Link } from "react-router";
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-15 bg-gray-50 px-4">
      {/* Animation */}
      <div className="w-80 md:w-96 mb-8">
        <Lottie animationData={notFoundAnim} loop={true} />
      </div>

      {/* Text */}

      <p className="text-xl md:text-2xl text-gray-600 mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Go Home Button */}
      <Link to="/">
        <button className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
