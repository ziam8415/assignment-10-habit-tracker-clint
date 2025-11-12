import React from "react";
import { motion } from "framer-motion";
import { Users, MessageCircle, HeartHandshake } from "lucide-react";

const JoinCommunity = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-indigo-500" />,
      title: "Meet Habit Builders",
      text: "Connect with people who share your drive for growth and consistency.",
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-500" />,
      title: "Share Your Journey",
      text: "Post updates, track streaks, and celebrate daily wins with others.",
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-pink-500" />,
      title: "Support Each Other",
      text: "Encourage others and stay motivated through community accountability.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 my-15 rounded-2xl py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Side - Text & Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Join the Habit Builder Community 🌍
          </h2>
          <p className="text-gray-600 mb-8">
            Building habits is easier when you’re not alone. Our community helps
            you stay inspired, consistent, and supported — every step of the
            way.
          </p>

          {/* Animated feature cards */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2 * index,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-indigo-700 transition"
          >
            Join Now
          </motion.button>
        </motion.div>

        {/* Right Side - Image Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2 flex justify-center"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
            alt="Community"
            className="rounded-2xl shadow-lg w-full max-w-md"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default JoinCommunity;
