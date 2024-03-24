import { AuthContext, IAuthContext } from "@/context/auth-context";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ErrorToast } from "./CustomToast";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies(["access_token"]);
  const { isAuthenticated, setIsAuthenticated } =
    useContext<IAuthContext>(AuthContext);
  const [showErrorToast, setShowErrorToast] = useState(false);

  useEffect(() => {
    if (
      !cookies.access_token ||
      !localStorage.getItem("username") ||
      !localStorage.getItem("userID")
    ) {
      setIsAuthenticated(false);
      setShowErrorToast(true);
    }
  }, [cookies.access_token, setIsAuthenticated]);

  useEffect(() => {
    if (showErrorToast) {
      ErrorToast("You're not logged in, please log in.");
      setShowErrorToast(false);
    }
  }, [showErrorToast]);

  if (!isAuthenticated) return <Navigate to="/auth" />;
  else return <>{children}</>;
};

export default ProtectedRoute;
