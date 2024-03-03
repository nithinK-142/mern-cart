import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IShopContext, ShopContext } from "@/context/shop-context";
import { UserErrors } from "@/models/errors";
import { Label } from "@radix-ui/react-label";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import axios from "axios";
import { SyntheticEvent, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { icons } from "@/assets/icons";
import { ErrorToast, WelcomeToast } from "@/components/CustomToast";

const Login = () => {
  const [loginUser, setLoginUser] = useState<{
    username: string;
    password: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();
  const { setIsAuthenticated, addLog } = useContext<IShopContext>(ShopContext);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          username: loginUser?.username,
          password: loginUser?.password,
        }
      );
      setCookies("access_token", result.data.token);
      localStorage.setItem("userID", result.data.userID);
      localStorage.setItem("username", loginUser?.username as string);
      setIsAuthenticated(true);
      navigate("/");
      WelcomeToast(loginUser?.username);
      addLog(loginUser?.username + " logged in.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      let errorMessage: string = "";
      switch (err.response.data.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "User doesnt exist";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong username or password";
          break;
        default:
          errorMessage = "Something went wrong!";
      }
      ErrorToast("ERROR: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setLoginUser((prevUser) => ({
      ...prevUser!,
      [fieldName]: value,
    }));
  };

  return (
    <TabsContent value="login">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Please Login!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                defaultValue={loginUser?.username}
                onChange={(e) => handleFieldChange("username", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                defaultValue={loginUser?.password}
                onChange={(e) => handleFieldChange("password", e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">
              {loading ? <span className="h-6">{icons.spinner}</span> : "Login"}
            </Button>

            <TabsList className="bg-transparent">
              <TabsTrigger value="register" className="text-sm opacity-70">
                Dont have an account?!
              </TabsTrigger>
            </TabsList>
          </CardFooter>
        </Card>
      </form>
    </TabsContent>
  );
};

export default Login;
