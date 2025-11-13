import { use, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Card from "../Component/Card";
import Swal from "sweetalert2";

//lottie
import Lottie from "lottie-react";
import loadingAnim from "../assets/animations/Loading.json";
import emptyAnim from "../assets/animations/Empty box.json";

const MyHabits = () => {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  //console.log(habits);

  useEffect(() => {
    axiosSecure.get(`/habits?email=${user?.email}`).then((data) => {
      console.log("secure bids data", data);
      setHabits(data.data);
      setIsLoading(false);
    });
  }, [user, axiosSecure]);

  const handleDeleteBid = (_id) => {
    console.log("clicked", _id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/habits/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your habit has been deleted.",
                icon: "success",
              });

              //
              const remainingHabits = habits.filter(
                (habit) => habit._id !== _id
              );
              setHabits(remainingHabits);
            }
          });
      }
    });
  };

  return (
    <div className="pb-20">
      <h1 className="pt-15 pb-5 text-center text-4xl text-gray-700  font-bold">
        My Habits
      </h1>

      {isLoading && (
        <div className="flex justify-center items-center h-[300px]">
          <Lottie animationData={loadingAnim} loop={true} className="w-48" />
        </div>
      )}

      {!isLoading && habits?.length === 0 && (
        <div className="flex flex-col justify-center items-center text-center">
          <Lottie animationData={emptyAnim} loop={true} className="w-60" />
          <p className="text-gray-500 mt-4 text-lg font-semibold">
            No habits found. Start by adding your first one!
          </p>
        </div>
      )}

      {!isLoading && habits?.length > 0 && (
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {habits.map((habit) => (
            <Card
              key={habit._id}
              handleDeleteBid={handleDeleteBid}
              habit={habit}
            ></Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHabits;
