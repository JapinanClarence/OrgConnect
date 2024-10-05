import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import  {Textarea} from "@/components/ui/textarea";
import EventCalendar from "@/components/calendar/Eventcalendar";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "@/schema";
import { LoaderCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Eventpage = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      checkIn: "",
      checkOut: "",
      location: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = EventSchema.parse(data);
    console.log(formData);
  };

  const handleDateClick = (selected) => {
    console.log(selected.startStr);
    setShowDialog(true);
    
    // Set the start and end dates in the form
    form.setValue("startDate", selected.startStr);
    form.setValue("endDate", selected.endStr);
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 text-gray-900 p-5 flex gap-2 flex-col sm:flex-row">
        <div className="p-2 rounded border border-black border-opacity-15 flex-shrink-0">
          <div>
            <h1 className="font-bold text-xl">Events</h1>
          </div>
        </div>
        <div className="flex-grow">
          <EventCalendar onDateClick={handleDateClick} /> {/* Use the EventCalendar component */}
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="w-[400px] lg:w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
            <DialogDescription>
              Setup event details below. Please fill in all required fields to create your event.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {errorMessage && (
                  <Alert variant="destructive" className="py-2 px-3 bg-red-500 bg-opacity-20">
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  {/* Title Field */}
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">Title</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )} />

                  {/* Description Field */}
                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">Description</FormLabel>
                      <FormControl>
                        <div className="relative w-full ">
                          <Textarea className="resize-none" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )} />

                  {/* Start and End Date Fields */}
                  <div className="grid grid-flow-col gap-3 ">
                    <FormField control={form.control} name="startDate" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 text-sm">Start Date</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" disabled />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="endDate" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 text-sm">End Date</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" disabled />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )} />
                  </div>

                  {/* Check In and Check Out Fields */}
                  <div className="grid grid-flow-col gap-3 ">
                    <FormField control={form.control} name="checkIn" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 text-sm">Check In</FormLabel>
                        <FormControl>
                          <Input {...field} type="time" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="checkOut" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 text-sm">Check Out</FormLabel>
                        <FormControl>
                          <Input {...field} type="time" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )} />
                  </div>

                  {/* Location Field */}
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">Location</FormLabel>
                      <FormControl>
                        <div className="relative w-full ">
                          <Input {...field} type="text" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )} />
                </div>

                <div className="flex justify-end">
                  <Button id="submit" className="w-[130px]" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <LoaderCircle className="w-6 h-6 text-gray-500 mx-auto animate-spin" />
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Eventpage;
