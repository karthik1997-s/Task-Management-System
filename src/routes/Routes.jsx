import { useRoutes } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Profile from "../pages/Profile";
import Tasks from "../pages/Tasks";
import Login from "../pages/Login";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnAuthenticatedRoute from "./UnAunthenticatedRoute";
import AddTask from "../pages/TaskForm";
import Home from "../pages/Home";

const routes = [
  {
    path: "/",
    element: <AuthenticatedRoute />,
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
            path: "tasks",
            element: <Tasks />,
          },
          {
            path: "create-task",
            element: <AddTask />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          
        ],
      },
    ],
  },
  {
    path: "",
    element: <UnAuthenticatedRoute />, // Changed from '' to '/login' or any other specific path
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
];

export default function Routes() {
  return useRoutes(routes);
}
