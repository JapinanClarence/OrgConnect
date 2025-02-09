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
import { CircleCheck, Timer } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define the columns for the table
export const Columns = (onEdit, onDelete, onAttendance) => [
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
    cell: ({ row }) => {
      const description = row.getValue("description");

      const processedDescription =
        description.length > 100
          ? `${description.slice(0, 100)}...`
          : description;
      return <div className=" font-medium">{processedDescription}</div>;
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div className="">{row.getValue("location")}</div>,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Start Date
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("startDate")}</div>,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            End Date
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("endDate")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const statusMap = {
        0: "Close",
        1: "Pending",
        2: "Ongoing",
        3: "Open",
      };
      return <div className="">{statusMap[row.getValue("status")]}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const currentEvent = row.original;

      const handleEdit = (event) => {
        event.stopPropagation();
        onEdit(currentEvent);
      };

      const handleDelete = (event) => {
        event.stopPropagation();
        onDelete(currentEvent.id);
      };

      const handleAttendance = (event) => {
        event.stopPropagation();
        onAttendance(currentEvent.id);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-5 w-5 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy event ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEdit}>Edit Event</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              Delete Event
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAttendance}>
              Manage Attendance
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
