import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useGetToken = () => {
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
  const [headers, setHeaders] = useState({
    authorization: cookies.access_token,
  });

  const navigate = useNavigate();
  useEffect(() => {
    const checkTokenExpiration = async () => {
      const expiration = decodeTokenExpiration(cookies.access_token);

      // Check if the token has expired
      if (expiration && expiration < Date.now() / 1000) {
        // Token has expired, try to refresh
        const success = await refreshAccessToken();

        if (success) {
          // Update the headers with the new access token
          setHeaders({ authorization: cookies.access_token });
        } else {
          navigate("/");
        }
      }
    };

    checkTokenExpiration();
  }, [cookies.access_token]);

  const decodeTokenExpiration = (token: string) => {
    try {
      if (!token) return null;

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.exp;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch("/refresh-token", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setCookie("access_token", data.token, { path: "/" });
        return true;
      } else {
        console.error("Refresh token request failed:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Refresh token request failed:", error);
      return false;
    }
  };

  return { headers };
};
