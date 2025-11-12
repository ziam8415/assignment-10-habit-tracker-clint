import React from "react";
import { Pencil, Clock, BarChart3, Trophy } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Pencil className="w-10 h-10 text-indigo-500" />,
      title: "Step 1: Create a Habit",
      description:
        "Start small — add a habit you can stick with daily. The key is consistency, not perfection.",
    },
    {
      icon: <Clock className="w-10 h-10 text-green-500" />,
      title: "Step 2: Track Your Progress",
      description:
        "Mark each day you complete your habit. Watch your streaks grow as you stay on track.",
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-orange-500" />,
      title: "Step 3: Stay Consistent",
      description:
        "Check your stats, reflect on your journey, and adjust your habits as needed.",
    },
    {
      icon: <Trophy className="w-10 h-10 text-pink-500" />,
      title: "Step 4: Celebrate Wins",
      description:
        "Every small win matters! Celebrate milestones and keep your motivation high.",
    },
  ];

  return (
    <section className="bg-white rounded-2xl py-20 px-6 md:px-12 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">How It Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-3">
          Follow these simple steps to start building habits that actually last.
        </p>
      </div>

      <div className="relative flex flex-col md:flex-row items-center md:justify-between max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center md:w-1/4 relative"
          >
            {/* Connector line */}
            {index !== steps.length - 1 && (
              <div className="hidden md:block absolute top-10 right-[-50%] w-full h-[3px] bg-gray-200 z-0"></div>
            )}

            <div className="z-10 bg-gray-50 p-6 rounded-full shadow-md mb-4 hover:scale-105 transition">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm max-w-xs">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
