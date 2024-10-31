import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/axios";
import { RegistrationSchema, OrgSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/util/helpers";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { EyeOff, Eye, LoaderCircle } from "lucide-react";
const RegistrationPage = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const date = formatDate(Date.now());
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      middlename: "",
      email: "",
      username: "",
      password: ""
    }, // Set default values at initialization
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const formData = {
        firstname: data.firstname,
        lastname: data.lastname,
        middlename: data.middlename,
        email: data.email,
        username: data.username,
        password: data.password
      };

      const res = await apiClient.post(`/superadmin/accounts/`, formData, {
        headers: {
          Authorization: token,
        },
      });

      if (res) {
        setIsSubmitting(false);

        toast({
          title: "User registered.",
          description: `${date}`,
        });
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data.message);
    }
  };

  const tooglePasswordVisibility = () => {
    setShowPass(!showPass);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="mt-3">
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
              <div className="space-y-2">
                <div className="grid grid-flow-col grid-cols-2  gap-2">
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
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="username" />
                      </FormControl>
                      <FormMessage className="text-xs" />
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
              <div className="">
                <Button
                  type="submit"
                  className="w-[130px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationPage;
