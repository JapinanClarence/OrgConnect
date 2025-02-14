import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { Camera, LoaderCircle } from "lucide-react";
import { AdminSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/util/helpers";
import ProfilePictureForm from "./ProfilePictureForm";

const AccountForm = () => {
  const { token, userData, setUserData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const date = formatDate(Date.now());
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(AdminSchema),
    defaultValues: userData || {}, // Set default values at initialization
  });

  const { reset } = form;

  // Use effect to reset form when userData changes
  useEffect(() => {
    if (userData) {
      reset(userData); // This will reset the form with new event data
    }
  }, [userData, reset]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const formData = {
        email: data.email,
        username: data.username,
        role: userData.role,
      };

      const res = await apiClient.patch(`/admin/profile/`, formData, {
        headers: {
          Authorization: token,
        },
      });

      if (res) {
        localStorage.setItem("userData", JSON.stringify(formData));
        setUserData(formData);
        setIsSubmitting(false);
        form.reset();
        toast({
          title: "User info has been updated",
          description: `${date}`,
        });
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data.message);
    }
  };

  return (
    <Card className="md:border-zinc-200 md:shadow-sm">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="mt-3">
          <ProfilePictureForm imgSrc={userData.profilePicture} />
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

export default AccountForm;
