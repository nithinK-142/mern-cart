import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./login";
import Register from "./register";

export const AuthPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Tabs defaultValue="login" className="w-[400px] h-[400px]">
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
