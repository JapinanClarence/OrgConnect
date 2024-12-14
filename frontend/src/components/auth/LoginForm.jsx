import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();

  // if user exists navigate to homepage
  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const tooglePasswordVisibility = () => {
    setShowPass(!showPass);
  };
  //handle form submit
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = LoginSchema.parse(data);

      const response = await apiClient.post("/login", formData);

      if (response.data.data.role == "2") {
        setErrorMessage("Invalid Credentials");
        setIsSubmitting(false);
      } else if (response.data.data.role == "1") {
        if (!response.data.data.active) {
          setErrorMessage("Account is currently deactivated.");
          setIsSubmitting(false);
        } else {
          login(response.data.token, response.data.data);
          navigate("/");
        }
      } else {
        login(response.data.token, response.data.data);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full">
      <Card className="mx-auto border-none shadow-none  md:rounded-xl md:bg-white w-full md:max-w-lg md:shadow-md md:border md:border-gray-300 ">
        <CardHeader>
          <img
            src="OrgConnect.svg"
            alt="OrgConnect logo"
            className="w-24 h-24 mx-auto"
          />
          <h1 className="font-bold text-2xl text-gray-900">Login</h1>
          <p className="text-sm text-gray-600">
            Fill in the form to get started.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {errorMessage && (
                <Alert
                  variant="destructive"
                  className="py-2 px-3 bg-red-500 bg-opacity-20"
                >
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              <div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" autoComplete="username" />
                      </FormControl>
                      <FormMessage className="text-xs " />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full ">
                          <Input
                            {...field}
                            type={showPass ? "text" : "password"}
                            autoComplete="current-password"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute right-0 top-0 h-full w-min px-3 py-2 hover:bg-transparent"
                            onClick={tooglePasswordVisibility}
                            aria-label={
                              showPass ? "Hide Password" : "Show Password"
                            }
                          >
                            {showPass ? (
                              <Eye className="text-gray-500 size-4" />
                            ) : (
                              <EyeOff className="text-gray-500 size-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <Button
                  id="submit"
                  size="default"
                  className="bg-gray-900 text-sm hover:bg-gray-800  text-white rounded-md w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <LoaderCircle className="w-6 h-6 text-gray-500 mx-auto animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        {/* <CardFooter className="flex justify-center items-center">
          <p className="text-sm text-slate-900 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default LoginForm;
