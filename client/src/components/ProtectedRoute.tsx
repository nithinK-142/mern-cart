import { ShopContext } from "@/context/shop-context";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ErrorToast } from "./CustomToast";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies(["access_token"]);
  const { isAuthenticated, setIsAuthenticated } = useContext(ShopContext);

  useEffect(() => {
    if (
      !cookies.access_token ||
      !localStorage.getItem("username") ||
      !localStorage.getItem("userID")
    ) {
      setIsAuthenticated(false);
    }
  }, [cookies.access_token, setIsAuthenticated]);

  console.log(isAuthenticated);
  if (!isAuthenticated) {
    ErrorToast("You're not logged in, please log in.");
    return <Navigate to="/auth" />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
