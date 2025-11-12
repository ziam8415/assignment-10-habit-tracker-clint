import React from "react";
import { Link } from "react-router";

const AllHabitCard = ({ habit }) => {
  console.log(habit);
  return (
    <div className="card bg-base-100 shadow-lg hover:scale-103">
      <figure className="px-10 pt-10">
        <img src={habit.image} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-gray-700 text-2xl font-bold">
          {habit.title}
        </h2>
        <p className="text-gray-600 ">Category : {habit.category}</p>
        <div className="card-actions">
          <Link to={`/see/${habit._id}`}>
            <button className="btn w-full bg-[#FFC4C4] text-gray-800 font-bold py-2 rounded-lg hover:bg-[#efbfc3] transition">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllHabitCard;
