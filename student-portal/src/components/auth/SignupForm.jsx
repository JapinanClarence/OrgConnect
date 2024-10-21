import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SignupSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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

const SignupForm = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const tooglePasswordVisibility = () => {
    setShowPass(!showPass);
  };
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        {errorMessage && (
          <Alert
            variant="destructive"
            className="py-2 px-3 bg-red-500 bg-opacity-20"
          >
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <div>
          <div className="grid grid-flow-col grid-cols-2 sm:grid-cols-1 gap-2">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm">
                    Firstname
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm">
                    Lastname
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="middlename"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600 text-sm">
                  Middlename
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage className="text-xs " />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600 text-sm">
                  Student Id
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage className="text-xs " />
              </FormItem>
            )}
          />
          <div className="grid grid-flow-col grid-cols-2 sm:grid-cols-1 gap-2">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm">
                    Course
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm">
                    Year
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600 text-sm">
                  Email
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
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
                    <Input {...field} type={showPass ? "text" : "password"} />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={tooglePasswordVisibility}
                      aria-label={showPass ? "Hide Password" : "Show Password"}
                    >
                      {showPass ? (
                        <Eye className="text-gray-500" />
                      ) : (
                        <EyeOff className="text-gray-500" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5 mt-5">
          <Button
            id="submit"
            className="bg-gray-900 hover:bg-gray-800 text-md text-white rounded-md w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoaderCircle className="w-6 h-6 text-gray-500 mx-auto animate-spin" />
            ) : (
              "Signup"
            )}
          </Button>
          <div className="relative flex items-center">
            <div className="flex-grow border-b"></div>
            <span className="text-center px-4 bg-white text-muted-foreground">
              or
            </span>
            <div className="flex-grow border-b"></div>
          </div>
          <Button
            id="button"
            variant="outline"
            className="text-md rounded-md w-full "
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
