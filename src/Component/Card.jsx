import React, { use, useRef } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Card = ({ habit, handleDeleteBid }) => {
  //console.log(habit);
  const { user } = use(AuthContext);
  const modalRef = useRef(null);

  const handelUpdate = () => {
    modalRef.current.showModal();
    console.log(habit._id);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log("update button click");
    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const image = e.target.imageUrl.value;
    const creatorName = user.displayName;
    const creatorEmail = user.email;
    const time = Date.now();

    const updateHabit = {
      title,
      description,
      category,
      image,
      creatorEmail,
      creatorName,
      time,
    };
    console.log(updateHabit);

    fetch(`http://localhost:3000/habits/${habit._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateHabit),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Updated:", data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your habit has been Updated.",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
          modalRef.current.close();
        }
      })
      .catch((err) => console.error(err));
  };

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
          <button
            onClick={() => {
              handelUpdate();
            }}
            className="btn btn-primary"
          >
            Update
          </button>

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

        <div>
          <dialog
            ref={modalRef}
            id="my_modal_5"
            className="modal text-black modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                {/* Habit Title */}
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-1">
                    Habit Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={habit.title}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={habit.description}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={habit?.category || "Morning"}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Work">Work</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Evening">Evening</option>
                    <option value="Study">Study</option>
                  </select>
                </div>

                {/* Upload Image URL */}
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-1">
                    Upload Image (URL)
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    defaultValue={habit.image}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                {/* User Email  */}
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-1">
                    User Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    readOnly
                    className="w-full border border-gray-200 bg-gray-100 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed"
                  />
                </div>

                {/* User Name */}
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-1">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.displayName}
                    readOnly
                    className="w-full border border-gray-200 bg-gray-100 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Habit
                </button>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Card;
