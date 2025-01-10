// router.tsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/Layout/MainLayout";
import HomePage from "@/pages/Home/Home";
import LoginForm from "./pages/Login/Login";
import SignUpForm from "./pages/SignUp/SignUp";
import About from "./pages/About/About";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import RootWrapper from "./Layout/RootWrapper";
import VerificationEmailSent from "./pages/EmailVerification/VerificationEmailSent";
import VerificationStatus from "./pages/EmailVerification/VerificationStatus";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PasswordResetForm from "./pages/ForgotPassword/PasswordResetForm";
import Interview from "./pages/Interview/Interview";
import InterviewLayout from "./Layout/TrainerLayout";
import InterviewHelper from "./pages/Interview/InterviewHelper";
import path from "path";
import TrainerLayout from "./Layout/TrainerLayout";
import AITutor from "./pages/AI_Tutor/AITutor";
import Learning from "./pages/AI_Tutor/Learning";
import ResumeEvaluate from "./pages/ResumeEvaluator/ResumeEvaluator";
import InterviewAssist from "./pages/Interview/InterviewAssist";

const trainerLayout = [];

const mainLayoutRoutes = [
  {
    path: "/",
    index: true,
    element: <HomePage />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/resume",
    element: <ResumeEvaluate />,
  },
];

const interviewLayoutRoutes = [
  {
    path: "",
    index: true,
    element: <InterviewHelper />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootWrapper />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [],
      },
      {
        path: "/",
        element: <MainLayout />,
        children: mainLayoutRoutes,
      },
      {
        path: "/Interview_prep",
        element: <InterviewLayout />,
        children: interviewLayoutRoutes,
      },
      {
        path: "/Login",
        element: <LoginForm />,
      },
      {
        path: "/SignUp",
        element: <SignUpForm />,
      },
      {
        path: "/verifymail",
        element: <VerificationEmailSent />,
      },
      {
        path: "/verifymail/:verificationToken",
        element: <VerificationStatus />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:resetToken",
        element: <PasswordResetForm />,
      },
      {
        path: "/interview",
        element: <Interview />,
      },
      {
        path: "/interview-help",
        element: <InterviewAssist/>,
      },
      {
        path: "/ai-tutor",
        element: <TrainerLayout />,
        children: [
          {
            path: "",
            element: <AITutor />,
          },
          {
            path: "learning",
            element: <Learning />,
          },
        ],
      },
    ],
  },
]);

export default router;
