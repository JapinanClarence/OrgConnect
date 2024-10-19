import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AddOfficerDialog = ({
  form,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
  errorMessage,
}) => {
  const [members, setMembers] = useState([]);
  const [positions, setPositions] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchMembers();
    fetchPositons();
  }, []);

  const fetchPositons = async () => {
    try {
      const response = await apiClient.get("/admin/officer/positions", {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        const labelData = response.data.data.map((data) => {
          return data;
        });
        setPositions(labelData);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchMembers = async () => {
    try {
      const response = await apiClient.get("/admin/members", {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange} disableFocusTrap>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Officer</DialogTitle>
          <DialogDescription>
            Please fill in all required fields to add an officer.
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
              {/* Officer Field */}
              <FormField
                control={form.control}
                name="officerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Officer</FormLabel>
                    <Popover disableFocusTrap>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? members.find(
                                  (member) => member.value === field.value
                                )?.label
                              : "Select member"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 z-50">
                        <Command>
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
                                    form.setValue("officerId", member.value);
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
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "text-xs",
                            !field.value && "text-muted-foreground"
                          )}
                        >
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

export default AddOfficerDialog;
