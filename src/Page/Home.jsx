import React, { useEffect, useState } from "react";
import AllHabitCard from "../Component/AllHabitCard";
import WhyBuildHabit from "../Component/WhyBuildHabit";
import HomeSlider from "../Component/HomeSlider";
import HowItWorks from "../Component/HowItWorks ";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/newestHabits")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div>
      {/* carosole */}
      <HomeSlider></HomeSlider>

      {/* 6 newest habit */}
      <div className=" mt-20">
        <h1 className="text-5xl mb-15 text-center text-gray-700 font-bold">
          Resent Added Habits
        </h1>
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {data.map((d) => (
            <AllHabitCard key={d._id} habit={d}></AllHabitCard>
          ))}
        </div>
      </div>
      <div>
        <WhyBuildHabit></WhyBuildHabit>
      </div>
      <div>
        <HowItWorks></HowItWorks>
      </div>
    </div>
  );
};

export default Home;
