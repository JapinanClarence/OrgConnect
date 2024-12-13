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
export const columns = (onApprove, onKick, onManage) => [
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
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="text-xs">{row.getValue("email")}</div>,
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
          name: "Approved",
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
    accessorKey: "joinedDate",
    header: "Date Joined",
    cell: ({ row }) => (
      <div className="text-xs">{row.getValue("joinedDate")}</div>
    ),
  },
  {
    accessorKey: "absenceCount",
    header: "Total Absence",
    cell: ({ row }) => <div className="text-xs">{row.getValue("absenceCount")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const member = row.original;

      const handleCopy = (event) => {
        event.stopPropagation(); // Prevent the row click event
        navigator.clipboard.writeText(member.id);
      };

      const handleApprove = (event) => {
        event.stopPropagation(); // Prevent the row click event
        onApprove(member.id)
      };

      const handleDelete = (event) => {
        event.stopPropagation(); // Prevent the row click event
        onKick(member.id)
      };

      const handleManage = (event) =>{
        event.stopPropagation();
        onManage(member);
      }

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
            <DropdownMenuItem onClick={handleCopy}>
              Copy Member ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={member.status == 1 && `hidden`} onClick={handleApprove}>Approve</DropdownMenuItem>
            <DropdownMenuItem className={member.status == 0 && `hidden`}  onClick={handleManage}>Add Role</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Kick</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
