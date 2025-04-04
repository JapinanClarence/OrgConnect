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

export const accountsColumns = (onEdit) => [
  {
    id: "profilePicture",
    enableHiding: false,
    cell: ({ row }) => {
      const organization = row.original;
      const { profilePicture, name } = organization;

      return (
        <div className="flex justify-center">
          <Avatar className="size-9">
            <AvatarImage src={profilePicture} alt="User Profile" />
            <AvatarFallback className="bg-gray-200 text-gray-400 font-bold">
              {/* {name?.[0].toUpperCase()} */}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-xs">{row.getValue("username")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-xs">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="text-xs">{row.getValue("role")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const admin = row.original;
    //   const status = row.getValue("status");
    //   const handleCopy = (event) => {
    //     event.stopPropagation(); // Prevent the row click event
    //     navigator.clipboard.writeText(admin.id);
    //   };

    //   const handleApprove = (data) => (event) => {
    //     event.stopPropagation(); // Prevents the row click event
    //     onUpdateStatus({
    //       id: admin.id,
    //       active: data,
    //     });
    //   };

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

            <DropdownMenuSeparator />
            <DropdownMenuItem >Add Role</DropdownMenuItem>
            <DropdownMenuItem >Kick</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
