import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AddEventDialog = ({form, open, onOpenChange, onSubmit, isSubmitting, errorMessage}) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[400px] lg:w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
            <DialogDescription>
              Please fill in all required fields to create your event.
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
                          <div className="relative w-full ">
                            <Textarea className="resize-y" {...field} />
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
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between mt-4">
                  <Button
                    type="submit"
                    className="w-[120px]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Create Event"
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
  )
}

export default AddEventDialog
