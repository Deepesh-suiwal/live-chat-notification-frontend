import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import GoogleCallback from "../pages/GoogleCallback";
import VerifyEmail from "../pages/VerifyEmail";
import PublicRoute from "./PublicRoute";
import ForgotPassword from "../pages/Forgot-password";
import VerifyResetOtp from "../pages/Verify-reset-otp";
import ResetPassword from "../pages/Reset-password";

const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/user/google/callback",
        element: <GoogleCallback />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-reset-otp",
        element: <VerifyResetOtp />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  // PROTECTED ROUTES
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "dashboard",
            element: <h1>Dashboard Page</h1>,
          },
        ],
      },
    ],
  },

  // 404 PAGE (PUBLIC)
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
