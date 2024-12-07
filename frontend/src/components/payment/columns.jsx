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
export const columns = (onEdit, onDelete) => [
  {
    accessorKey: "purpose",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Purpose
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("purpose")}</div>,
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => <div className="">{row.getValue("details")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div className="">{row.getValue("category")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as PHP currency
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      const handleEdit = (event) => {
        event.stopPropagation();
        onEdit(payment);
      };

      const handleDelete = (event) => {
        event.stopPropagation();
        onDelete(payment.id);
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
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEdit}>
              Edit Payment
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              Delete Payment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const membersColumns = (onEdit, onDelete) => [
  {
    id: "profilePicture",
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original;
      const { profilePicture, fullname } = student;

      return (
        <div className="flex justify-center">
          <Avatar className="size-9">
            <AvatarImage src={profilePicture} alt="User Profile" />
            <AvatarFallback className="bg-gray-200 text-gray-400 font-bold">
              {fullname?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "studentId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Id
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-xs">{row.getValue("studentId")}</div>
    ),
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-xs">{row.getValue("fullname")}</div>
    ),
  },
  {
    accessorKey: "year",
    header: "Year Level",
    cell: ({ row }) => <div className="text-xs">{row.getValue("year")}</div>,
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => <div className="text-xs">{row.getValue("course")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount Paid",
    cell: ({ row }) => <div className="text-xs">{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusMap = {
        0: {
          name: "Pending",
          color: "bg-red-500",
          icon: (
            <Timer size={18} strokeWidth={1.7} className="inline-block mr-1" />
          ),
        },
        1: {
          name: "Paid",
          color: "bg-green-600",
          icon: (
            <CircleCheck
              strokeWidth={2}
              size={15}
              className="inline-block mr-1"
            />
          ),
        },
      };

      const status = statusMap[row.getValue("status")];

      return (
        <span className={`text-xs flex items-center`}>
          {status?.icon}
          {status?.name}
        </span>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      const handleEdit = (event) => {
        event.stopPropagation();
        onEdit(payment);
      };

      const handleDelete = (event) => {
        event.stopPropagation();
        onDelete(payment.id);
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
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEdit}>
              Edit Payment
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              Delete Payment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
