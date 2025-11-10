import React from "react";
import Swal from "sweetalert2";

const Card = ({ habit, handleDeleteBid }) => {
  console.log(habit);

  return (
    <div className="card bg-neutral text-neutral-content w-ful">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{habit.title}</h2>
        <div className="flex  justify-between gap-5">
          <h3>Category : {habit.category}</h3>
          <h3>Current Streak</h3>
        </div>
        <p>Habit started at {habit.date}</p>
        <div className="flex gap-1">
          <button className="btn btn-primary">Update</button>
          <button
            onClick={() => {
              handleDeleteBid(habit._id);
            }}
            className="btn btn-ghost"
          >
            Delete
          </button>
          <button className="btn btn-ghost">Mark Complete</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
