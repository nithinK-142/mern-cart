import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserErrors } from "@/utils/errors";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "@/assets/icons";
import { ErrorToast, UserToast } from "@/components/CustomToast";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  loginSchema,
  loginSchemaType,
  defaultValues,
} from "@/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthContext, useShopContext } from "@/hooks/useAllContext";
import { PasswordInput } from "@/components/ui/password-input";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface AccessToken extends JwtPayload {
  id: string;
  username: string;
}

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { addLog } = useShopContext();
  const { setIsAuthenticated } = useAuthContext();

  const form = useForm();

  const { handleSubmit, control } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<loginSchemaType> = async (formData) => {
    try {
      setLoading(true);
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
        {
          username: formData?.username,
          password: formData?.password,
        }
      );

      form.reset();

      const { id, username } = jwtDecode<AccessToken>(result.data.access_token);
      localStorage.setItem("userID", id);
      localStorage.setItem("username", username);

      setIsAuthenticated(true);
      navigate("/shop");
      UserToast(`Welcome, ${username} 👏`);
      addLog(username + " logged in.");
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

  return (
    <TabsContent value="login">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Please Login!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormField
                control={control}
                name="username"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        required
                      />
                    </FormControl>
                    <FormDescription className="font-medium text-red-600">
                      {formState.errors.username?.message}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        required
                      />
                    </FormControl>
                    <FormDescription className="font-medium text-red-600">
                      {formState.errors.password?.message}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit">
                {loading ? (
                  <span className="h-6">{icons.spinner}</span>
                ) : (
                  "Login"
                )}
              </Button>

              <TabsList className="bg-transparent">
                <TabsTrigger value="register" className="text-sm opacity-70">
                  Dont have an account?!
                </TabsTrigger>
              </TabsList>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </TabsContent>
  );
};

export default Login;
