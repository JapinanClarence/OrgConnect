import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OfficerSchema } from "@/schema";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditOfficerDialog = ({
  officerData,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
  errorMessage,
}) => {
  const { token } = useAuth();
  const form = useForm({
    resolver: zodResolver(OfficerSchema),
    defaultValues: {
      officerId: officerData?.id || "", // Ensure officerId is set
      position: officerData?.position || "", // Ensure position is set
    },
  });
  const [positions, setPositions] = useState([]);
  const { reset } = form;

  // Use effect to reset form when officerData changes
  useEffect(() => {
    if (officerData) {
      reset({
        officerId: officerData.id,
        position: officerData.position,
      }); // Reset the form with new officer data
    }
  }, [officerData, reset]);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await apiClient.get("/admin/officer/positions", {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        setPositions(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
          <DialogDescription>
            Please fill in all required fields to edit role.
          </DialogDescription>
        </DialogHeader>
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
              {/* Position Field */}
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 text-sm">
                      Position
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value} // Set the default value for the select
                    >
                      <FormControl>
                        <SelectTrigger className={"text-xs"}>
                          <SelectValue placeholder="Select officer position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectGroup>
                          <SelectLabel>Positions</SelectLabel>
                          {positions.map((position) => (
                            <SelectItem key={position} className="" value={position}>
                              {position.charAt(0).toUpperCase() +
                                position.slice(1).toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between mt-4">
              <Button
                type="submit"
                className="w-[100px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
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
      </DialogContent>
    </Dialog>
  );
};

export default EditOfficerDialog;
