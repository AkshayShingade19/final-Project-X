import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Feed from './Feed';
import Profile from './Profile';
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/home",
        element: <Home />,
        children: [
            {
                index: true, // this will load Feed when visiting /home
                element: <Feed />
            },
            {
                path: "profile/:id", // nested properly as /home/profile/:id
                element: <Profile />
            }
        ]
    }
]);
const Body = () => {
    return <RouterProvider router={appRouter} />
};
 
export default Body;