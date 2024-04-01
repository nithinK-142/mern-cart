import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./login";
import Register from "./register";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAllContext";

const AuthPage = () => {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) return <Navigate to="/shop" />;

  return (
    <div className="flex justify-center mt-20 mb-16">
      <Tabs defaultValue="login" className="w-[340px] sm:w-[400px]">
        <TabsList className="grid w-full h-10 grid-cols-2 mb-2">
          <TabsTrigger value="login" className="text-base">
            Login
          </TabsTrigger>
          <TabsTrigger value="register" className="text-base">
            Register
          </TabsTrigger>
        </TabsList>
        <Login />
        <Register />
      </Tabs>
    </div>
  );
};

export default AuthPage;
