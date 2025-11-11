import React from "react";
import { Link } from "react-router";

const AllHabitCard = ({ habit }) => {
  console.log(habit);
  return (
    <div className="card bg-base-100 border shadow-sm">
      <figure className="px-10 pt-10">
        <img src={habit.image} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{habit.title}</h2>
        <p>Category : {habit.category}</p>
        <div className="card-actions">
          <Link to={`/see/${habit._id}`}>
            <button className="btn btn-primary">See Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllHabitCard;
