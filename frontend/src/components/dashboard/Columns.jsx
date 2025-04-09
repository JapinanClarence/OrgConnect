import { Button } from "@/components/ui/button";
import React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const eventReportColumns = (onGenerate) => [
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
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div className="">{row.getValue("location")}</div>,
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
    accessorKey: "totalAttendees",
    header: "Attendees",
    cell: ({ row }) => <div className="">{row.getValue("totalAttendees")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const currentData = row.original;

      const handleGeneratePDF = (event) => {
        event.stopPropagation();
        onGenerate(currentData, "pdf");
      };
      const handleGenerateExcel = (event) => {
        event.stopPropagation();
        onGenerate(currentData, "excel");
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
            <DropdownMenuItem onClick={handleGeneratePDF}>
              Generate PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleGenerateExcel}>
              Generate Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const memberFeesReportColumns = (onGenerate) => [
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
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <div className="">{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "totalCollectedPayments",
    header: "Total Collected Payments",
    cell: ({ row }) => (
      <div className="">{row.getValue("totalCollectedPayments")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const currentData = row.original;

      const handleGeneratePDF = (event) => {
        event.stopPropagation();
        onGenerate(currentData, "pdf");
      };
      const handleGenerateExcel = (event) => {
        event.stopPropagation();
        onGenerate(currentData, "excel");
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
            <DropdownMenuItem onClick={handleGeneratePDF}>
              Generate PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleGenerateExcel}>
              Generate Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const transactionReportColumns = (onGenerate) => [
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
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <div className="">{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="">{row.getValue("date")}</div>,
  },
  {
    id: "actions",
    enableHiding: true,
    cell: ({ row }) => {
      const currentData = row.original;

      const handleGenerateReport = (event) => {
        event.stopPropagation();
        onGenerate(currentData);
      };

      return <></>;
    },
  },
];
