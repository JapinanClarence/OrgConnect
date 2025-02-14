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
  CommandDialog,
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

const AddOrgDialog = ({
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
  const handleShowCommand = () => {
    setOpenCommand(true);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await apiClient.get("/superadmin/accounts", {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        const popoverData = response.data.data.map((data) => {
          const fullname = `${data.firstname} ${
            data.middlename ? data.middlename[0] + ". " : ""
          }${data.lastname}`;
          return {
            label: `${fullname}`,
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>New organization</DialogTitle>
          <DialogDescription>
            Please fill in all required fields to add new organization.
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
                {/* name Field */}
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
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Admin Field */}
                <FormField
                  control={form.control}
                  name="admin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assign Admin</FormLabel>

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
                            : "Select admin username"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                      <CommandDialog
                        open={openCommand}
                        onOpenChange={setOpenCommand}
                      >
                        <Command>
                          <CommandInput
                            placeholder="Search admin..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No admin found.</CommandEmpty>
                            <CommandGroup>
                              {members.map((member) => (
                                <CommandItem
                                  key={member.value}
                                  value={member.label}
                                  onSelect={() => {
                                    form.setValue("admin", member.value);
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

                {/* Organization type Field */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Organization type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose organization type" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent className="bg-white border-zinc-300">
                          <SelectGroup>
                            <SelectLabel>Types</SelectLabel>
                            <SelectItem value="0">
                              Institute Based Organization{" "}
                            </SelectItem>
                            <SelectItem value="1">
                              Non-institute Based Organization
                            </SelectItem>
                            <SelectItem value="2">
                              Religious Based Organization
                            </SelectItem>
                            <SelectItem value="3">Fraternities</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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

export default AddOrgDialog;
