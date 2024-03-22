import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import axios from "axios";
import { useState } from "react";
import { icons } from "@/assets/icons";
import { UserErrors } from "@/models/errors";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "@/components/CustomToast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  registerSchema,
  registerSchemaType,
  defaultValues,
} from "@/models/registerSchema";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm();

  const { handleSubmit, control } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<registerSchemaType> = async (formData) => {
    try {
      setLoading(true);

      await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      form.reset();

      SuccessToast("Registration Complete, now please login!");
      navigate("/shop");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
        ErrorToast("ERROR: Username already in use!");
      } else ErrorToast("ERROR: Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TabsContent value="register">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Create an Account!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormField
                control={control}
                name="email"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        required
                      />
                    </FormControl>
                    <FormDescription className="font-medium text-red-600">
                      {formState.errors.email?.message}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <Input
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
              <FormField
                control={control}
                name="confirmPassword"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        required
                      />
                    </FormControl>
                    <FormDescription className="font-medium text-red-600">
                      {formState.errors.confirmPassword?.message}
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
      </Form>
    </TabsContent>
  );
};

export default Register;
