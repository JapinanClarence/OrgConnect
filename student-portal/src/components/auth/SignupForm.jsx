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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";
import apiClient from "@/api/axios";

const SignupForm = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      middlename: "",
      studentId: "",
      year: "",
      course: "",
      email: "",
      username: "",
      password: "",
    },
  });
  const tooglePasswordVisibility = () => {
    setShowPass(!showPass);
  };
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = SignupSchema.parse(data);
      
      const response = await apiClient.post("/register", formData);
      if (response) {
        setIsSubmitting(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
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
                  Middlename{" "}
                  <span className="text-xs text-muted-foreground">{`(Optional)`}</span>
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
                  <Input {...field} type="text" placeholder={"0000-0000"} />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Courses</SelectLabel>
                        <SelectItem value="BSIT">
                          Bachelor of Science in Information Technology
                        </SelectItem>
                        <SelectItem value="BSCE">
                          Bachelor of Science in Civil Engineering
                        </SelectItem>
                        <SelectItem value="BSMATH">
                          Bachelor of Science in Mathematics
                        </SelectItem>
                        <SelectItem value="BITM">
                          Bachelor of Science in Industrial Mathematics
                        </SelectItem>
                        <SelectItem value="BPED">
                          Bachelor of Science in Physical Education
                        </SelectItem>
                        <SelectItem value="BSN">
                          Bachelor of Science in Nursing
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm">Year</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Year</SelectLabel>
                        <SelectItem value="1">
                          1st Year
                        </SelectItem>
                        <SelectItem value="2">
                          2nd Year
                        </SelectItem>
                        <SelectItem value="3">
                          3rd Year
                        </SelectItem>
                        <SelectItem value="4">
                          4th Year
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                <FormLabel className="text-gray-600 text-sm">Email</FormLabel>
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
