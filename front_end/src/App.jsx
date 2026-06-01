
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import Body from "./Components/Body";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Error from "./Components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ProductPage from "./Components/ProductPage";
import Footer from "./Components/Footer";
import SignUp from "./Components/SignUp"
import Login from "./Components/Login";
import Profile from "./Components/Profile";

const AppLayout = () => {
  return (
    <div className="app bg-light min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      // In your App.js or router configuration
      {
        path : "/product/:id",
        element : <ProductPage />
      }
      ,
      {
       path: "/profile",
       element: <Profile />
      }
    ],
    errorElement: <Error />,
  },
]);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(<RouterProvider router={appRouter} />);
