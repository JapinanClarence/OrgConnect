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
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcadYearSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
const EditAcadsDialog = ({
  open,
  onOpenChange,
  onSubmit,
  acadsData,
  isSubmitting,
  errorMessage,
  setErrorMessage
}) => {
  const form = useForm({
    resolver: zodResolver(AcadYearSchema),
    defaultValues: acadsData || {}, // Set default values at initialization
  });

  const { reset } = form;

  // Use effect to reset form when acads datas changes
  useEffect(() => {
    if (acadsData) {
      reset(acadsData); // This will reset the form with new event data
    }
  }, [acadsData, reset]);

  const handleClose = () => {
    form.reset(); // Reset form data
    if (setErrorMessage) setErrorMessage(""); // Reset error message if provided
    onOpenChange(false); // Close the dialog
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Academic Year</DialogTitle>
          <DialogDescription>
            Click the submit button to save.
          </DialogDescription>
        </DialogHeader>
        <div className="">
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
                {/* Academic Year Field */}
                <FormField
                  control={form.control}
                  name="academicYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Academic Year
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="2000-2001" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Semester Field */}
                <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Semester
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose semester" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent className="bg-white border-zinc-300">
                          <SelectGroup>
                            <SelectLabel>Semesters</SelectLabel>
                            <SelectItem value="0">1st Semester</SelectItem>
                            <SelectItem value="1">2nd Semester</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <div className="grid grid-flow-col grid-cols-2 gap-2">
                  {/* Start date Field */}
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 text-sm">
                          Start Date
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  {/* End date Field */}
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 text-sm">
                          End Date
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Academic Year Field */}
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center border rounded-lg p-2">
                      <FormDescription>
                        Activate the academic year/semester.
                      </FormDescription>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between mt-4">
                <Button type="submit" className="" disabled={isSubmitting}>
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
                  onClick={handleClose}
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

export default EditAcadsDialog;
