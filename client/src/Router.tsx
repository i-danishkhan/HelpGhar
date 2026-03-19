import { createBrowserRouter, Navigate } from "react-router-dom";
import Applayout from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch";
import Error500 from "./pages/Error500";
import WorkerDashboard from "./pages/workerDashboard";
import WorkerComplain from "./pages/workerComplain";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout/>,
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
    element: <WorkerDashboard/>,
  },
    {
    path: "/workerComplain",
    element: <WorkerComplain/>,
  },
], {
  basename: global.basename
});