import { createBrowserRouter, Navigate } from "react-router-dom";
import Applayout from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch";
import Error500 from "./pages/Error500";
import WorkerDashboard from "./pages/workerDashboard";
import WorkerComplain from "./pages/workerComplain";
import WorkerProfile from "./pages/workerProfile";
import WorkerStatus from "./pages/workerStatus";

import HouseOwnerDashboard from "./pages/customerDashboard";
import OwnerProfilePage from "./pages/customerProfilePage";
import CustomerComplain from "./pages/customerComplain";
import CustomerStatus from "./pages/customerStatus";

import AdminDashboard from "./pages/adminDashboard";
import AdminProfile from "./pages/adminProfile";
import AdminUserManagementPage from "./pages/adminUserManagementPage";
import AdminResolveDisputePage from "./pages/adminResolveDisputePage";
import AdminIncentivesPage from "./pages/adminIncentivesPage";
import LandingPage from "./pages/landingPage";


import LogIn from "./pages/login";
import SignUp from "./pages/signup";
import UserScreen from "./pages/userScreen";
import WorkerRegistration from "./pages/workerRegistration";
import HouseOwnerRegistration from "./pages/houseOwnerRegistration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/userScreen",
    element: <UserScreen />,
  },
  {
    path: "/workerRegistration",
    element: <WorkerRegistration />,
  },
  {
    path: "/houseOwnerRegistration",
    element: <HouseOwnerRegistration />,
  },
  {
    path: "/error", // ✅ NEW
    element: <Error500 />,
  },
  {
    path: "*",
    element: <NoMatch />,
  },
  {
    path: "/workerDashboard",
    element: <WorkerDashboard />,
  },
  {
    path: "/workerProfile",
    element: <WorkerProfile />,
  },
  {
    path: "/workerComplain",
    element: <WorkerComplain />,
  },
  {
    path: "/workerStatus",
    element: <WorkerStatus />,
  },


  {
    path: "/customerDashboard",
    element: <HouseOwnerDashboard />,
  },
  {
    path: "/customerProfilePage",
    element: <OwnerProfilePage />,
  },
  {
    path: "/customerComplain",
    element: <CustomerComplain />,
  },
  {
    path: "/customerStatus",
    element: <CustomerStatus />,
  },


  {
    path: "/adminDashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/adminProfile",
    element: <AdminProfile />,
  },
  {
    path: "/adminUserManagementPage",
    element: <AdminUserManagementPage />,
  },
  {
    path: "/adminResolveDisputePage",
    element: <AdminResolveDisputePage />,
  },
  {
    path: "/adminIncentivesPage",
    element: <AdminIncentivesPage />,
  },
], {
  basename: global.basename
});