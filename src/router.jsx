import React from "react";
import { createBrowserRouter } from "react-router";
import App from "./App";
import Layout from "./Layout";
import Home from "./Page/Home";
import AddHabit from "./Page/AddHabit";
import MyHabits from "./Page/MyHabits";
import PublicHabit from "./Page/PublicHabit";
import Login from "./Page/Login";
import SingUp from "./Page/SingUp";
import PrivetRoute from "./PrivetRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addHabit",
        element: (
          <PrivetRoute>
            <AddHabit></AddHabit>
          </PrivetRoute>
        ),
      },
      {
        path: "/myHabits",
        element: (
          <PrivetRoute>
            <MyHabits></MyHabits>
          </PrivetRoute>
        ),
      },
      {
        path: "/publicHabits",
        element: <PublicHabit></PublicHabit>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/singUp",
        element: <SingUp></SingUp>,
      },
    ],
  },
]);

export default router;
