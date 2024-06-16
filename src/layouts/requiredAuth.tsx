import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export const RequireAuthAdmin = () => {
  const { role } = useAuth();
  console.log(role);
  switch (role) {
    case "ADMIN":
      return <Outlet />;
    default:
      return <Navigate to="/login" />;
  }
};
