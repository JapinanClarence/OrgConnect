import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "@/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { LoaderCircle, Pen, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EditEventDialog = ({
  open,
  onOpenChange,
  eventData,
  onSubmit,
  errorMessage,
  isSubmitting,
  isDeleting,
  onDelete,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isEditable, setIsEditable] = useState({
    title: false,
    description: false,
    location: false,
  });
  const form = useForm({
    resolver: zodResolver(EventSchema),
    defaultValues: eventData || {}, // Set default values at initialization
  });

  const { reset } = form;

  // Use effect to reset form when eventData changes
  useEffect(() => {
    if (eventData) {
      reset(eventData); // This will reset the form with new event data
    }
  }, [eventData, reset]);

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
    onDelete(eventData.id); // Call the delete function
    setShowAlert(false); // Close the alert dialog after deleting
  };

  const cancelDelete = () => {
    setShowAlert(false); // Close the alert dialog without deleting
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[400px] lg:w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle>Event Information</DialogTitle>
            <DialogDescription>
              Click the edit button to edit the event info.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                          <div className="relative w-full">
                            <Input
                              {...field}
                              type="text"
                              disabled={!isEditable.title}
                            />
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="absolute right-0 top-0 h-full w-min px-3 py-2 hover:bg-transparent"
                              onClick={() => handleEditToggle("title")} // Toggle edit mode
                            >
                              <Pen className="text-gray-500 size-4" />
                            </Button>
                          </div>
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
                        </FormLabel>
                        <FormControl>
                          <div className="relative w-full">
                            <Textarea
                              {...field}
                              type="text"
                              disabled={!isEditable.description}
                              className="pr-7"
                            />
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="absolute right-0 top-0 h-full w-min px-3 py-2 hover:bg-transparent"
                              onClick={() => handleEditToggle("description")} // Toggle edit mode
                            >
                              <Pen className="text-gray-500 size-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Location Field */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 text-sm">
                          Location
                        </FormLabel>
                        <FormControl>
                          <div className="relative w-full">
                            <Input
                              {...field}
                              type="text"
                              disabled={!isEditable.location}
                            />
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="absolute right-0 top-0 h-full w-min px-3 py-2 hover:bg-transparent"
                              onClick={() => {
                                handleEditToggle("location");
                              }} // Toggle edit mode
                            >
                              <Pen className="text-gray-500 size-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  {/* Status field */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-gray-600 text-sm">
                          Event status
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
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="0">Close</SelectItem>
                              <SelectItem value="1">Pending</SelectItem>
                              <SelectItem value="2">Ongoing</SelectItem>
                              <SelectItem value="3">Open</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          *Set status to open to accept student attendance.
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <div className="m-0">
                    <Link
                      className="text-sm font-bold hover:underline"
                      to={`/events/attendance/?eventId=${eventData.id}`}
                    >
                      Manage Attendees for This Event
                    </Link>
                  </div>
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
                    <Button
                      type="button"
                      onClick={handleDelete}
                      variant="destructive"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        <Trash2 className="h-4" />
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

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditEventDialog;
