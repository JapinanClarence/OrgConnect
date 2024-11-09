// PaymentColumns.js
import React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { dateOnly } from "@/util/helpers";

const statusMap = {
  0: {
    name: "Close",
    color: "bg-red-500",
  },
  1: {
    name: "Upcoming",
    color: "bg-yellow-500",
  },
  2: {
    name: "Ongoing",
    color: "bg-blue-600",
  },
  3: {
    name: "Open",
    color: "bg-green-600",
  },
};

// Define the columns for the table
export const attendanceColumn = [
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
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => <div className="">{row.getValue("startDate")}</div>,
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => <div className="">{row.getValue("endDate")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div className="">{row.getValue("location")}</div>,
  },
  {
    accessorKey: "organizationName",
    header: "Organization",
    cell: ({ row }) => (
      <div className="">{row.getValue("organizationName")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = statusMap[row.getValue("status")];

      return <div className="">{status.name}</div>;
    },
  },
  {
    accessorKey: "attendanceStatus",
    header: "Attendance",
    cell: ({ row }) => (
      <div className="">{row.getValue("attendanceStatus")}</div>
    ),
  },
];
