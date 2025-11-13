import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import {
  PlusCircle,
  Image,
  BookOpen,
  Tag,
  Mail,
  User,
  Clock,
} from "lucide-react";

const AddHabit = () => {
  const { user } = use(AuthContext);
  //console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const image = e.target.imageUrl.value;
    const reminderTimer = e.target.time.value;
    const creatorName = user.displayName;
    const creatorEmail = user.email;
    const time = Date.now();
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const completionHistory = [];
    console.log(formattedDate);

    const habit = {
      title,
      description,
      category,
      time,
      reminderTimer,
      formattedDate,
      image,
      creatorName,
      creatorEmail,
      completionHistory,
    };

    console.log(habit);

    fetch("http://localhost:3000/addHabit", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(habit),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your habit has been added.",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
        }
      });
  };

  //https://i.ibb.co.com/ksGv7L4m/download-14.jpg
  //https://i.ibb.co.com/ksGv7L4m/download-14.jpg
  //https://i.ibb.co.com/1tJkmKtq/download-16.jpg

  return (
    <div className="py-16 px-4 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-6">
          <PlusCircle className="mx-auto w-10 h-10 text-pink-500" />
          <h2 className="text-3xl font-bold text-gray-800 mt-2">Add Habit</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Habit Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Habit Title
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="title"
                placeholder="Enter habit title"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your habit..."
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <select
                name="category"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              >
                <option>Morning</option>
                <option>Work</option>
                <option>Fitness</option>
                <option>Evening</option>
                <option>Study</option>
              </select>
            </div>
          </div>

          {/* Reminder Time */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reminder Time
            </label>

            <div className="relative">
              <input
                type="time"
                name="time"
                //value={time}
                //onChange={onChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
              />
              <Clock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Image URL
            </label>
            <div className="relative">
              <Image className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="url"
                name="imageUrl"
                placeholder="Paste image link here"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          </div>

          {/* User Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              User Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={user?.email}
                readOnly
                className="w-full border border-gray-200 bg-gray-100 rounded-lg pl-10 pr-3 py-2 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* User Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              User Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={user?.displayName}
                readOnly
                className="w-full border border-gray-200 bg-gray-100 rounded-lg pl-10 pr-3 py-2 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-pink-500 hover:bg-pink-600 text-white border-none flex items-center gap-2"
          >
            Add Habit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHabit;
