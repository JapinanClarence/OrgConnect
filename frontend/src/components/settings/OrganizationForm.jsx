import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { AdminSchema, OrgSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/util/helpers";

const OrganizationForm = ({orgData, updateData}) => {
  const { token, userData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const date = formatDate(Date.now());
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(OrgSchema),
    defaultValues: orgData || {}, // Set default values at initialization
  });

  const { reset } = form;

  // Use effect to reset form when org data changes
  useEffect(() => {
    if (orgData) {
      reset(orgData); // This will reset the form with new event data
    }
  }, [orgData, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await apiClient.patch("/admin/organization", data, {
        headers: {
          Authorization: token,
        },
      });
      if (res.data.success) {
        toast({
          title: "Organization updated successfuly",
          description: `${date}`,
        });
        updateData(); // Refresh organization data
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Card className="md:border md:border-slate-200 md:shadow-sm">
      <CardHeader>
        <CardTitle>Organization Details</CardTitle>
        <CardDescription>Change your organization details here</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Name
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
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        About
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Contact
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <Button
                  id="submit"
                  className="w-[130px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Save changes"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationForm;
