import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import getDailyStreak from "../getDailyStreak";
import { Calendar, Folder, Flame, Star, CheckCircle } from "lucide-react";

const See = () => {
  const data = useLoaderData();
  const [streak, setStreak] = useState(0);
  const [isCompletedToday, setIsCompletedToday] = useState(false);
  console.log(data);

  const today = new Date().toLocaleDateString("en-GB").split("/").join("-");

  useEffect(() => {
    if (data?.completionHistory) {
      const newStreak = getDailyStreak(data.completionHistory);
      setStreak(newStreak);
      setIsCompletedToday(data.completionHistory.includes(today));
    }
  }, [data, today]);
  console.log("show", isCompletedToday);

  const handelMarkCompleteBtn = () => {
    const date = today;
    const history = data.completionHistory;

    if (history.includes(date)) {
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

    fetch(`http://localhost:3000/habits/${data._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update),
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
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {/* 🔹 Main Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col lg:flex-row items-center gap-8">
        {/* Image */}
        <img
          src={data.image}
          alt={data.title}
          className="w-full max-w-sm rounded-xl shadow-sm object-cover"
        />

        {/* Details */}
        <div className="flex-1 text-center lg:text-left space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">{data.title}</h1>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-gray-600 font-medium">
            <span className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-gray-500" /> {data.category}
            </span>
            <span className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" /> {streak} Day Streak
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" /> {data.date}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">{data.description}</p>

          <button
            disabled={isCompletedToday}
            onClick={handelMarkCompleteBtn}
            className={`flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-white font-medium transition ${
              isCompletedToday
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            {isCompletedToday ? "Completed Today" : "Mark Complete"}
          </button>
        </div>
      </div>

      {/* 🔹 Progress & Streak */}
      <div className="max-w-4xl mx-auto mt-12 text-center space-y-2">
        <p className="text-lg text-gray-700 font-medium">
          Current Streak:{" "}
          <span className="text-pink-600 font-semibold">{streak}</span>
        </p>
        <progress
          className="progress progress-success w-60"
          value={streak}
          max="30"
        ></progress>
      </div>

      {/* 🔹 Creator Info */}
      <div className="max-w-4xl mx-auto mt-14 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl text-gray-700 font-bold mb-4 text-center">
          Creator Info
        </h2>
        <div className="overflow-x-auto">
          <table className="table text-gray-600 w-full text-center">
            <thead className="bg-gray-100">
              <tr className="text-gray-700">
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <th>
                  <Star className="w-5 h-5 text-yellow-500 mx-auto" />
                </th>
                <td className="font-medium">{data.creatorName}</td>
                <td>{data.creatorEmail}</td>
                <td>{data.formattedDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default See;
