import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import getDailyStreak from "../getDailyStreak";
import { Star } from "lucide-react";

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
          // Swal.fire({
          //   position: "center",
          //   icon: "success",
          //   title: "Your habit has been Updated.",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
          // e.target.reset();
          // modalRef.current.close();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="text-center">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img src={data.image} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{data.title}</h1>
            <p className="text-xl mt-2 text-gray-600 font-bold">
              Category : {data.category}
            </p>
            <p className="py-6">{data.description}</p>
            <button
              disabled={isCompletedToday}
              onClick={handelMarkCompleteBtn}
              className={`btn btn-primary ${
                isCompletedToday
                  ? " btn-accent bg-amber-300  cursor-not-allowed"
                  : ""
              }`}
            >
              {isCompletedToday ? "Completed Today" : "Mark Complete"}
            </button>
          </div>
        </div>
      </div>

      <div>
        <p>streak : {streak}</p>
      </div>

      <progress
        className="progress progress-primary w-56"
        value={streak}
        max="30"
      ></progress>

      <div>
        <h1 className="text-2xl text-gray-600 font-bold">Creator info</h1>
        <div className="mx-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>
                  <Star />
                </th>
                <td>{data.creatorName}</td>
                <td>{data.creatorEmail}</td>
                <td>{data.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default See;
