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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircle, PhilippinePeso } from "lucide-react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

const AddPaymentDialog = ({
  title,
  open,
  onOpenChange,
  onSubmit,
  form,
  isSubmitting,
  errorMessage,
  showPaidBy = false,
}) => {
  const [officers, setOfficers] = useState([]);
  const { token } = useAuth();
  const [openCommand, setOpenCommand] = useState(false);
 
  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    try {
      const response = await apiClient.get("/admin/officer", {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        const popoverData = response.data.data.map((data) => {
          return {
            label: `${data.fullname} (${data.position})`,
            value: data.id,
          };
        });
        setOfficers(popoverData);
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
          <DialogTitle>{title}</DialogTitle>
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
                {/* paid by */}
                {showPaidBy && (
                  <FormField
                    control={form.control}
                    name="paidBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Paid By</FormLabel>

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
                              ? officers.find(
                                  (officer) => officer.value === field.value
                                )?.label
                              : "Select officer"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                        <CommandDialog
                          open={openCommand}
                          onOpenChange={setOpenCommand}
                        >
                          <Command>
                            <CommandInput
                              placeholder="Search officer..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No officer found.</CommandEmpty>
                              <CommandGroup>
                                {officers.map((officer) => (
                                  <CommandItem
                                    key={officer.value}
                                    value={officer.label}
                                    onSelect={() => {
                                      form.setValue("paidBy", officer.value);
                                      setOpenCommand(false);
                                    }}
                                  >
                                    {officer.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        officer.value === field.value
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
                )}
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
