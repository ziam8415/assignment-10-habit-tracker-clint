import React, { use, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import getDailyStreak from "../getDailyStreak";
import {
  Calendar,
  Flame,
  Folder,
  Pencil,
  Trash2,
  CheckCircle,
} from "lucide-react";

const Card = ({ habit, handleDeleteBid }) => {
  const [streak, setStreak] = useState(0);
  const [isCompletedToday, setIsCompletedToday] = useState(false);

  const today = new Date().toLocaleDateString("en-GB").split("/").join("-");

  useEffect(() => {
    if (habit?.completionHistory) {
      const newStreak = getDailyStreak(habit.completionHistory);
      setStreak(newStreak);
      setIsCompletedToday(habit.completionHistory.includes(today));
    }
  }, [habit, today]);

  const handelMarkCompleteBtn = () => {
    const date = today;
    const history = habit.completionHistory;

    if (history?.includes(date)) {
      Swal.fire({
        icon: "info",
        title: "Already Completed!",
        text: "You’ve already marked this habit complete today.",
        showConfirmButton: true,
      });
      return;
    }

    const completeHistory = [date, ...history];

    setIsCompletedToday(completeHistory.includes(date));

    setStreak(getDailyStreak(completeHistory));

    const update = { completionHistory: completeHistory };
    //console.log("mark clicked", date, history, update);

    fetch(`http://localhost:3000/habits/${habit._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("Updated:", data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your habit has been Updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.error(err));
  };

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
    <div className="card bg-white hover:scale-103 w-ful">
      <div>
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition duration-300 space-y-4">
          {/*  Header Section */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Flame className="w-5 h-5 text-pink-500" />
              {habit.title}
            </h2>
          </div>

          {/* 🔹 Category & Streak */}
          <div className="flex justify-between items-center text-gray-600 text-lg font-medium border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-gray-500" />
              <span>{habit.category}</span>
            </div>

            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span>{streak} Day Streak</span>
            </div>
          </div>

          {/* 🔹 Start Date */}
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-5 h-5" />
            <p>Started on {habit.formattedDate}</p>
          </div>

          {/* 🔹 Action Buttons */}
          <div className="flex flex-wrap justify-between mt-4">
            <button
              onClick={handelUpdate}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition"
            >
              <Pencil className="w-4 h-4" /> Update
            </button>

            <button
              onClick={() => handleDeleteBid(habit._id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 font-medium transition"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
          <div className="flex justify-center mt-5">
            <button
              disabled={isCompletedToday}
              onClick={handelMarkCompleteBtn}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                isCompletedToday
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-100 hover:bg-green-200 text-green-700"
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              {isCompletedToday ? "Completed Today" : "Mark Complete"}
            </button>
          </div>
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
                  className="btn w-full bg-[#FFC4C4] text-gray-800 font-bold py-2 rounded-lg hover:bg-[#efbfc3] transition"
                >
                  Update Habit
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
