import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const AddHabit = () => {
  const { user } = use(AuthContext);
  //console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const date = e.target.date.value;
    const image = e.target.imageUrl.value;
    const creatorName = user.displayName;
    const creatorEmail = user.email;

    const habit = {
      title,
      description,
      category,
      date,
      image,
      creatorName,
      creatorEmail,
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
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-8">
      <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
        Add Habit
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Habit Title */}
        <div>
          <label className="block text-xl font-medium text-gray-700 mb-1">
            Habit Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter habit title"
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
            placeholder="Describe your habit..."
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option>Morning</option>
            <option>Work</option>
            <option>Fitness</option>
            <option>Evening</option>
            <option>Study</option>
          </select>
        </div>

        {/* Reminder Time */}
        <div>
          <label className="block text-xl font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Upload Image URL */}
        <div>
          <label className="block text-xl font-medium text-gray-700 mb-1">
            Upload Image (URL)
          </label>
          <input
            type="url"
            name="imageUrl"
            placeholder="Paste image link here"
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
            value={user.email}
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
            value={user.displayName}
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
    </div>
  );
};

export default AddHabit;
