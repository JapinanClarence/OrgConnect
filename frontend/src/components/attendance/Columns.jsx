// PaymentColumns.js
import React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Ban, CheckCircle, LockKeyhole, LockKeyholeOpen } from "lucide-react";

// Define the columns for the table
export const columns = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div className="">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div className="">{row.getValue("location")}</div>,
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const active = row.getValue("active");
      return (
        <div className="">
          {active ? (
            <div className="flex items-center">
              <LockKeyholeOpen className="size-4 mr-2 text-green-500" /> Open
            </div>
          ) : (
            <div className="flex items-center">
              <LockKeyhole className="size-4 mr-2 text-red-500" /> Close
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "start",
    header: "Start",
    cell: ({ row }) => <div className="">{row.getValue("start")}</div>,
  },
  {
    accessorKey: "end",
    header: "End",
    cell: ({ row }) => <div className="">{row.getValue("end")}</div>,
  },
];
