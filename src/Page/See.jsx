import React from "react";
import { useLoaderData } from "react-router";

const See = () => {
  const data = useLoaderData();
  console.log(data);
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
            <button className="btn btn-primary">Mark Complete</button>
          </div>
        </div>
      </div>

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
                <th>1</th>
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
