import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import LazyLoader from "@/components/LazyLoader";
import Users from "@/pages/user/Users";
import { PublicRoutes, PrivateRoutes } from "./ProtectedRoutes";
import { useAuth } from "@/contextStore/Index";
import Drawer from "@/components/Drawer";

//render pages
const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const Home = lazy(() => import("@/pages/home/Home"));
const ContactUs = lazy(() => import("@/pages/contact/ContactUs"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const Login = lazy(() => import("@/pages/login/Login"));
const Register = lazy(() => import("@/pages/register/Register"));
const SignUp = lazy(() => import("@/pages/signup/SignUp"));
const PatientOnboard = lazy(() =>
  import("@/pages/onboard-patient/PatientOnboard")
);
const VerifyAccount = lazy(() => import("@/pages/verifyAccount/VerifyAccount"));
const ResetPassword = lazy(() => import("@/pages/passwordReset/ResetPassword"));
const ForgotPassword = lazy(() => import("@/pages/login/ForgotPassword"));
const OnboardingLayout = lazy(() => import("@/layouts/OnboardingLayout"));

const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const Appointments = lazy(() => import("@/pages/appointment/Appointments"));
const Rooms = lazy(() => import("@/pages/room/Rooms"));
const Payments = lazy(() => import("@/pages/payment/Payment"));
const Doctors = lazy(() => import("@/pages/doctor/Doctors"));
const Patients = lazy(() => import("@/pages/patient/Patients"));
const InPatients = lazy(() => import("@/pages/inpatient/InPatients"));
const Settings = lazy(() => import("@/pages/setting/Settings"));
const User = lazy(() => import("@/pages/user/Users"));

export default function AppRoutes() {
  const { accessToken, user } = useAuth();
  const routes = [
    {
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PublicRoutes accessToken={accessToken} >
            <RootLayout />
          </PublicRoutes>
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/Contact_Us",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <ContactUs />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: <Register />
        },
      ],
    },
    {
      path:"account",
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PublicRoutes accessToken={accessToken} >   
            <AuthLayout />
          </PublicRoutes>
        </Suspense>
      ),
      children: [
        {
          path: "signin",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <ForgotPassword />
            </Suspense>
          ),
        },
        {
          path: "signup",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <SignUp />
            </Suspense>
          ),
        },
        {
          path: "reset-password",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <ResetPassword />
            </Suspense>
          ),
        },
      ],
    },
    {
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PrivateRoutes accessToken={accessToken} user={user}>
            <OnboardingLayout />
          </PrivateRoutes>
        </Suspense>
      ),
      children: [
        {
          path: "verify-account",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <VerifyAccount />
            </Suspense>
          ),
        },
        {
          path: "patient-onboard",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <PatientOnboard />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PrivateRoutes accessToken={accessToken} user={user}>
            <DashboardLayout />
          </PrivateRoutes>
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "appointments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Appointments />
            </Suspense>
          ),
        },
        {
          path: "rooms",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Rooms />
            </Suspense>
          ),
        },
        {
          path: "payments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Payments />
            </Suspense>
          ),
        },
        {
          path: "doctors",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Doctors />
            </Suspense>
          ),
        },
        {
          path: "patients",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Patients />
            </Suspense>
          ),
        },
        {
          path: "inPatients",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <InPatients />
            </Suspense>
          ),
        },
        {
          path: "settings",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Settings />
            </Suspense>
          ),
        },
        {
          path: "users",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Users />
            </Suspense>
          ),
        },
        {
          path: "drawer",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Drawer />
            </Suspense>
          ),
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
