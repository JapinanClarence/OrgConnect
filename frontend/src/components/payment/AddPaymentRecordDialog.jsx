import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircle, PhilippinePeso } from "lucide-react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
const AddPaymentRecordDialog = ({
  open,
  onOpenChange,
  onSubmit,
  form,
  isSubmitting,
  errorMessage,
}) => {
  const [members, setMembers] = useState([]);
  const { token } = useAuth();
  const [openCommand, setOpenCommand] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await apiClient.get("/admin/members/approved", {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        const popoverData = response.data.data.map((data) => {
          return {
            label: `${data.fullname} (${data.studentId})`,
            value: data._id,
          };
        });
        setMembers(popoverData);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleShowCommand = () => {
    setOpenCommand(true);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Payment Record</DialogTitle>
          <DialogDescription>
            Please fill in all required fields to add payment records.
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
                {/* Member Field */}
                <FormField
                  control={form.control}
                  name="member"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Members</FormLabel>

                      <FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                          onClick={handleShowCommand}
                        >
                          {field.value
                            ? members.find(
                                (member) => member.value === field.value
                              )?.label
                            : "Select member"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                      <CommandDialog
                        open={openCommand}
                        onOpenChange={setOpenCommand}
                      >
                        <Command >
                          <CommandInput
                            placeholder="Search member..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No member found.</CommandEmpty>
                            <CommandGroup>
                              {members.map((member) => (
                                <CommandItem
                                  key={member.value}
                                  value={member.label}
                                  onSelect={() => {
                                    form.setValue("member", member.value);
                                    setOpenCommand(false);
                                  }}
                                >
                                  {member.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      member.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </CommandDialog>

                      <FormMessage />
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
                          <Input
                            {...field}
                            type="number"
                            min="0.00"
                            placeholder="0.00"
                            className="pl-8"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Status Field */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Payment Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose payment status" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent className="bg-white border-zinc-300">
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="0">Not Fully Paid</SelectItem>
                            <SelectItem value="1">Fully Paid</SelectItem>
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

export default AddPaymentRecordDialog;
