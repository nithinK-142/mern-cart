import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

export interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const defaultVal: IAuthContext = {
  isAuthenticated: false,
  setIsAuthenticated: () => null,
};

export const AuthContext = createContext<IAuthContext>(defaultVal);

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const [cookies] = useCookies(["access_token"]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    cookies.access_token && cookies.access_token !== ""
  );

  const contextValue: IAuthContext = {
    isAuthenticated,
    setIsAuthenticated,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
