import React from "react";
import { Brain, Target, Clock, Heart } from "lucide-react";

const WhyBuildHabit = () => {
  const benefits = [
    {
      icon: <Brain className="w-10 h-10 text-indigo-500" />,
      title: "Improves Mental Clarity",
      description:
        "Building consistent habits helps reduce decision fatigue and boosts focus throughout your day.",
    },
    {
      icon: <Target className="w-10 h-10 text-green-500" />,
      title: "Achieve Your Goals",
      description:
        "Small daily actions compound over time, turning your long-term goals into achievable realities.",
    },
    {
      icon: <Clock className="w-10 h-10 text-orange-500" />,
      title: "Build Discipline",
      description:
        "Habits train your brain to stay consistent — even when motivation fades.",
    },
    {
      icon: <Heart className="w-10 h-10 text-pink-500" />,
      title: "Boost Wellbeing",
      description:
        "Healthy habits create balance and improve your overall quality of life.",
    },
  ];

  return (
    <section className="bg-[#FCF4EF] shadow-sm py-16 px-6 md:px-12 lg:px-20 text-center my-20 border border-dotted rounded-2xl">
      <h2 className="text-4xl font-bold text-gray-700 mb-6">
        Why Build Habits?
      </h2>
      <p className=" max-w-2xl mx-auto mb-12">
        Building habits is the foundation for lasting growth. Whether it's
        fitness, learning, or mindfulness — small, consistent actions make the
        biggest impact.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl shadow-md hover:shadow-lg transition bg-gray-50"
          >
            <div className="flex justify-center mb-4 hover:scale-110">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyBuildHabit;
