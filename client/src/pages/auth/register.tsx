import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { icons } from "@/assets/icons";
import { UserErrors } from "@/models/errors";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "@/components/CustomToast";

const Register = () => {
  const [registerUser, setRegisterUser] = useState<{
    username: string;
    password: string;
    confirmPassword: string;
  }>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFieldChange = (fieldName: string, value: string) => {
    setRegisterUser((prevUser) => ({
      ...prevUser!,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (registerUser?.password !== registerUser?.confirmPassword) {
      return ErrorToast("ERROR: Passwords don't match!");
    }

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, {
        username: registerUser?.username,
        password: registerUser?.password,
      });

      setRegisterUser({
        username: "",
        password: "",
        confirmPassword: "",
      });
      SuccessToast("Registration Complete, now please login!");
      navigate("/");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response.data.type === UserErrors.USERNAME_ALREADY_EXISTS)
        ErrorToast("ERROR: Username already in use!");
      else ErrorToast("ERROR: Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TabsContent value="register">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create an Account!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={registerUser?.username}
                onChange={(e) => handleFieldChange("username", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="text"
                value={registerUser?.password}
                onChange={(e) => handleFieldChange("password", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="text"
                value={registerUser?.confirmPassword}
                onChange={(e) =>
                  handleFieldChange("confirmPassword", e.target.value)
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">
              {loading ? (
                <span className="h-6">{icons.spinner}</span>
              ) : (
                "Create Account"
              )}
            </Button>

            <TabsList className="bg-transparent">
              <TabsTrigger value="login" className="text-sm opacity-70">
                have an account?!
              </TabsTrigger>
            </TabsList>
          </CardFooter>
        </Card>
      </form>
    </TabsContent>
  );
};

export default Register;
