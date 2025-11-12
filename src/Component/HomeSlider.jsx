import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// ✅ Import Swiper styles here (no need for separate step)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HomeSlider = () => {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca",
      title: "Build Habits That Last",
      text: "Start small, stay consistent, and transform your life step by step.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1577563682708-4f022ec774fb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1267",
      title: "Track Your Daily Progress",
      text: "Measure growth through action — every day counts!",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      title: "Stay Inspired with the Community",
      text: "See what others are achieving and share your journey.",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto ">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="rounded-2xl shadow-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-[300px] md:h-[400px] bg-cover bg-center flex flex-col justify-center items-center text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="bg-black/50 p-6 rounded-2xl text-center max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  {slide.title}
                </h2>
                <p className="text-lg opacity-90">{slide.text}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
