import { Card } from '@/components/ui/card';
import React, {useState, useEffect} from 'react'
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnnouncementSchema } from "@/schema";

const EditAnnouncementDialog = ({announcementData, open, onOpenChange, onSubmit, isSubmitting, errorMessage}) => {
  console.log(announcementData)
  
  const [showAlert, setShowAlert] = useState(false);
  const [isEditable, setIsEditable] = useState({
    title: false,
    description: false,
    category: false,
  });
  const form = useForm({
    resolver: zodResolver(AnnouncementSchema),
    defaultValues: announcementData || {}, // Set default values at initialization
  });

  const { reset } = form;

  // Use effect to reset form when announcementData changes
  useEffect(() => {
    if (announcementData) {
      reset(announcementData); // This will reset the form with new event data
    }
  }, [announcementData, reset]);

  // Function to toggle editability
  const handleEditToggle = (fieldName) => {
    setIsEditable((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName], // Toggle only the specific field
    }));
  };

  const handleDelete = () => {
    setShowAlert(true); // Show the delete confirmation dialog
  };

  const confirmDelete = () => {
    onDelete(announcementData.id); // Call the delete function
    setShowAlert(false); // Close the alert dialog after deleting
  };

  const cancelDelete = () => {
    setShowAlert(false); // Close the alert dialog without deleting
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Announcement Info</DialogTitle>
          <DialogDescription>
            Click the edit button to edit the announcement info.
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
                {/* Title Field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Description Field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Description{" "}
                        <span className="text-[10px] text-slate-500">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full h-full">
                          <Textarea className="resize-y" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* category Field */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Category
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose category" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent className="bg-white border-zinc-300">
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            <SelectItem value="0">General Info</SelectItem>
                            <SelectItem value="1">Meetings</SelectItem>
                            <SelectItem value="2">Reminders</SelectItem>
                            <SelectItem value="3">News</SelectItem>
                            <SelectItem value="4">Alerts</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between mt-4">
                <Button
                  type="submit"
                  className="w-[180px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Create Announcement"
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditAnnouncementDialog
