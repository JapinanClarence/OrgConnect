import React from "react";
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
import { LoaderCircle, PhilippinePeso } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

const AddPaymentDialog = ({
  open,
  onOpenChange,
  onSubmit,
  form,
  isSubmitting,
  errorMessage,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Financial Record</DialogTitle>
          <DialogDescription>
            Please fill in all required fields to add financial records.
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
                {/* Purpose Field */}
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Purpose
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Details Field */}
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Details{" "}
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

                {/* amount Field */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Amount{" "}
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full ">
                          <div className="absolute left-0 top-0 p-[10px]  ">
                            <PhilippinePeso className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input {...field} type="number" min="0.00" placeholder="0.00" className="pl-8"/>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                 {/* Category Field */}
                 <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Payment Category
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose payment category" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent className="bg-white border-zinc-300">
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            <SelectItem value="0">Fees</SelectItem>
                            <SelectItem value="1">Expendeture</SelectItem>
                            <SelectItem value="2">Payment Logs</SelectItem>
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
                  className="w-[140px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Add Record"
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
};

export default AddPaymentDialog;
