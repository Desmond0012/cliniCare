import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import { LazyLoader } from "@/components/LazyLoader";
import { PublicRoutes, PrivateRoutes, VerifyRoutes } from "./ProtectedRoutes";
import { useAuth } from "@/contextStore/Index";
import HealthRecord from "@/pages/setting/healthRocord/HealthRecord";
import ErrorBoundary from "@/components/ErrorBoundary";

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
const Users = lazy(() => import("@/pages/user/Users"))
const Account = lazy(() => import("@/pages/setting/account/account"));
const Password = lazy(() => import("@/pages/setting/password/Password"));
const PatientAppointment = lazy(() => import("@/pages/appointment/PatientAppointment"));
const PatientPayments = lazy(() => import("@/pages/payment/PatientPayments"))


export default function AppRoutes() {
  const { accessToken, user } = useAuth();
  const routes = [
    {
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PublicRoutes accessToken={accessToken}>
            <RootLayout />
          </PublicRoutes>
        </Suspense>
      ),
      errorElement: <ErrorBoundary/>,
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
          element: <Register />,
        },
      ],
    },
    {
      path: "/account",
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PublicRoutes accessToken={accessToken}>
            <AuthLayout />
          </PublicRoutes>
        </Suspense>
      ),
       errorElement: <ErrorBoundary/>,
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
          <VerifyRoutes accessToken={accessToken} user={user}>
            <OnboardingLayout />
          </VerifyRoutes>
        </Suspense>
      ),
       errorElement: <ErrorBoundary/>,
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
       errorElement: <ErrorBoundary/>,
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
          path: "patient-appointments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <PatientAppointment />
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
          path: "patient-payments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <PatientPayments />
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
          children:[
            {
              path: "account",
               element: (
            <Suspense fallback={<LazyLoader />}>
              <Account />
            </Suspense>
          ),
            },
            {
              path: "password",
               element: (
            <Suspense fallback={<LazyLoader />}>
              <Password />
            </Suspense>
          ),
            },
             {
              path: "health",
               element: (
            <Suspense fallback={<LazyLoader />}>
              <HealthRecord />
            </Suspense>
          ),
            },
          ],
        },
        {
          path: "users",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Users />
            </Suspense>
          ),
        },
           
        
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
