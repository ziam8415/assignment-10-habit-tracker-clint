import React from "react";
import { Link } from "react-router";
import { Folder, ArrowRightCircle } from "lucide-react";

const AllHabitCard = ({ habit }) => {
  console.log(habit);
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* 🔹 Image */}
      <figure className="px-6 pt-6">
        <img
          src={habit.image}
          alt={habit.title}
          className="rounded-lg object-cover w-full h-48"
        />
      </figure>

      {/* 🔹 Card Content */}
      <div className="p-6 text-center space-y-3">
        <h2 className="text-2xl font-semibold text-gray-800">{habit.title}</h2>

        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Folder className="w-4 h-4 text-gray-500" />
          <p className="text-sm font-medium">{habit.category}</p>
        </div>

        {/* 🔹 Button */}
        <div className="pt-3">
          <Link to={`/see/${habit._id}`}>
            <button className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition">
              See Details
              <ArrowRightCircle className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllHabitCard;
