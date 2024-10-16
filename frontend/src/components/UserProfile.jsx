import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminSchema, FileSchema } from "@/schema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderCircle, Pen, Camera } from "lucide-react";
import apiClient from "@/api/axios";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/util/helpers";
import { useAuth } from "@/context/AuthContext";

const UserProfile = ({ userData, open, onOpenChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isEditable, setIsEditable] = useState({
    firstname: false,
    lastname: false,
    middlename: false,
    username: false,
    email: false,
  });
  const { toast } = useToast();
  const date = formatDate(Date.now());
  // Function to toggle editability
  const handleEditToggle = (fieldName) => {
    setIsEditable((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName], // Toggle only the specific field
    }));
  };

  const form = useForm({
    resolver: zodResolver(AdminSchema),
    defaultValues: userData || {}, // Set default values at initialization
  });

  const { reset } = form;
  const {  setUserData } = useAuth();
  // Use effect to reset form when userData changes
  useEffect(() => {
    if (userData) {
      reset(userData); // This will reset the form with new event data
    }
  }, [userData, reset]);

  const onSubmit = async(data) => {
    const token = localStorage.getItem("token");
    try {
      setIsSubmitting(true);

      const res = await apiClient.patch(`/admin/profile/`, data, {
        headers: {
          Authorization: token,
        },
      });

      if (res) {
        setIsSubmitting(false);
        onOpenChange(false)
        form.reset();
        toast({
          title: "User info has been updated",
          description: `${date}`,
        });
      }
      onOpenChange(false)
    } catch (error) {
      console.log(error)
      setErrorMessage(error.data.message)
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className={"text-left"}>
          <DialogTitle>User Information</DialogTitle>
          <DialogDescription>
            Click the edit button to edit user information
          </DialogDescription>
        </DialogHeader>

        <div className="mt-3">
          <div className="flex gap-5 mb-5">
            <Avatar className="size-16">
              <AvatarImage src={""} alt="User Profile" />
              <AvatarFallback className="bg-gray-200 text-gray-400 font-bold">
                {" "}
                <Camera />
              </AvatarFallback>
            </Avatar>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture text-sm">Profile Picture</Label>
              <Input id="picture" type="file" className="p-1" />
            </div>
          </div>
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
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Firstname
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            {...field}
                            type="text"
                            disabled={!isEditable.firstname}
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => handleEditToggle("firstname")} // Toggle edit mode
                          >
                            <Pen className="text-gray-500" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Lastname{" "}
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            {...field}
                            type="text"
                            disabled={!isEditable.lastname}
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => handleEditToggle("lastname")} // Toggle edit mode
                          >
                            <Pen className="text-gray-500" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="middlename"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Middlename
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            {...field}
                            type="text"
                            disabled={!isEditable.middlename}
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => {
                              handleEditToggle("middlename");
                            }} // Toggle edit mode
                          >
                            <Pen className="text-gray-500" />
                          </Button>
                        </div>
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
                        <div className="relative w-full">
                          <Input
                            {...field}
                            type="text"
                            disabled={!isEditable.username}
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => {
                              handleEditToggle("username");
                            }} // Toggle edit mode
                          >
                            <Pen className="text-gray-500" />
                          </Button>
                        </div>
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
                        <div className="relative w-full">
                          <Input
                            {...field}
                            type="text"
                            disabled={!isEditable.email}
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => {
                              handleEditToggle("email");
                            }} // Toggle edit mode
                          >
                            <Pen className="text-gray-500" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between mt-4">
                <div className="grid grid-flow-col gap-2">
                  <Button
                    type="submit"
                    className="w-[90px]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="border border-gray-500 hover:bg-gray-100"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
