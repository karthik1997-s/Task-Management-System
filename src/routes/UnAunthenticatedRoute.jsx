import { Navigate, Outlet } from "react-router-dom";

const UnAuthenticatedRoute = () => {
  const validUser = JSON.parse(localStorage.getItem("userDetails")) ? true : false;
  return validUser ? <Navigate to="/" /> : <Outlet/>;
};

export default UnAuthenticatedRoute;
