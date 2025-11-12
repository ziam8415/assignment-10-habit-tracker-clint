import React, { useEffect, useState } from "react";
import AllHabitCard from "../Component/AllHabitCard";

const PublicHabit = () => {
  const [allHabits, setAllHabits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/allHabits")
      .then((res) => res.json())
      .then((data) => setAllHabits(data));
  }, []);

  const categories = ["Morning", "Work", "Fitness", "Evening", "study"];

  const handelCategory = (category) => {
    console.log(category);
    fetch(`http://localhost:3000/allHabits/${category}`)
      .then((res) => res.json())
      .then((data) => setAllHabits(data));
  };

  const handelSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    console.log(searchText);
    fetch(`http://localhost:3000/search?search=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setAllHabits(data);
        e.target.reset();
      });
  };

  return (
    <div className="text-center">
      <h1 className="pt-15 pb-5  text-4xl text-gray-700  font-bold">
        Explore Public Habits
      </h1>
      <p className="text-gray-600">
        Discover how others are building better lives through small daily
        actions. Get inspired, <br /> learn from shared routines, and find
        motivation to keep growing every day.
      </p>

      <div className="flex justify-between my-10">
        {/* dropdown */}
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn m-1">
            Category
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => {
                    handelCategory(category);
                  }}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* search */}
        <div className="text-center">
          <form className="flex gap-1" onSubmit={handelSearch}>
            <label className="input">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" name="search" placeholder="Search" />
            </label>
            <button
              type="submit"
              className="btn bg-[#EE6983] text-xl text-white font-semibold py-2 rounded-lg hover:bg-[#ce313e] transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
        {allHabits.map((habit) => (
          <AllHabitCard key={habit._id} habit={habit}></AllHabitCard>
        ))}
      </div>
    </div>
  );
};

export default PublicHabit;
