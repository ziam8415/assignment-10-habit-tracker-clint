import React, { useEffect, useState } from "react";
import AllHabitCard from "../Component/AllHabitCard";
import WhyBuildHabit from "../Component/WhyBuildHabit";
import HomeSlider from "../Component/HomeSlider";
import HowItWorks from "../Component/HowItWorks ";
import JoinCommunity from "../Component/JoinCommunity";

//lottie
import Lottie from "lottie-react";
import loadingAnim from "../assets/animations/Loading.json";
import emptyAnim from "../assets/animations/Empty box.json";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/newestHabits")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
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
        {isLoading && (
          <div className="flex justify-center items-center h-[300px]">
            <Lottie animationData={loadingAnim} loop={true} className="w-48" />
          </div>
        )}

        {!isLoading && data?.length === 0 && (
          <div className="flex flex-col justify-center items-center text-center">
            <Lottie animationData={emptyAnim} loop={true} className="w-60" />
            <p className="text-gray-500 mt-4 text-lg font-semibold">
              No habits found. Start by adding your first one!
            </p>
          </div>
        )}

        {!isLoading && data?.length > 0 && (
          <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {data.map((d) => (
              <AllHabitCard key={d._id} habit={d} />
            ))}
          </div>
        )}

        {/* <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {data.map((d) => (
            <AllHabitCard key={d._id} habit={d}></AllHabitCard>
          ))}
        </div> */}
      </div>
      <div>
        <WhyBuildHabit></WhyBuildHabit>
      </div>
      <div>
        <HowItWorks></HowItWorks>
      </div>
      <div>
        <JoinCommunity></JoinCommunity>
      </div>
    </div>
  );
};

export default Home;
