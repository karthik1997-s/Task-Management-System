import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoute = () => {
  const validUser = JSON.parse(localStorage.getItem("userDetails")) ? true : false;
  return validUser ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticatedRoute;
