import React, { useState, useMemo } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarCog,
  ChevronLeft,
  ChevronRight,
  Printer,
  Settings,
  Settings2,
} from "lucide-react";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

// Function to get the current month name
const getCurrentMonth = () => format(new Date(), "MMMM"); // "October", "February", etc.

const TableComponent = ({
  title,
  data,
  loading,
  rowCount,
  cellCount,
  setSelectedCategory,
  selectedCategory,
  columns,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  // Function to handle month change
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  // Filter data based on selected month and endDate
  const filteredData = useMemo(() => {
    if (selectedCategory === "0") {
      return data.filter((rowDate) => {
        const eventEndMonth = format(new Date(rowDate.endDate), "MMMM"); // Extracts the month name
        return eventEndMonth === selectedMonth;
      });
    } else {
      return data.filter((rowDate) => {
        const date = format(new Date(rowDate.date), "MMMM"); // Extracts the month name
        return date === selectedMonth;
      });
    }
  }, [data, selectedMonth]);

  const table = useReactTable({
    data: filteredData,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
  });

  return (
    <>
      <Label className="font-semibold">{title}</Label>
      <div className="md:flex items-center justify-between py-4">
        <div className="flex items-center">
          <Button className="rounded-none rounded-l-md">
            <Printer />
            Print
          </Button>
          <Button className="rounded-none">PDF</Button>
          <Button className="rounded-none rounded-r-md">Excel</Button>
        </div>
        <div className="flex-wrap-reverse mt-2 space-y-2 md:space-y-0 md:mt-0 md:space-x-2 md:flex md:items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-fit">
                <Settings className="mr-2 h-4 w-4" />{" "}
                {selectedCategory == "0"
                  ? "Attendance Reports"
                  : "Collected Fees Reports"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                className="capitalize"
                checked={selectedCategory === "0"}
                onCheckedChange={() => handleSelectCategory("0")}
              >
                Attendance Reports
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="capitalize"
                checked={selectedCategory === "1"}
                onCheckedChange={() => handleSelectCategory("1")}
              >
                Collected Fees Reports
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="capitalize"
                checked={selectedCategory === "2"}
                onCheckedChange={() => handleSelectCategory("2")}
              >
                Transactions Reports
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-fit">
                <CalendarCog className="mr-2 h-4 w-4" /> {selectedMonth}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <DropdownMenuCheckboxItem
                  key={month}
                  checked={selectedMonth === month}
                  onCheckedChange={() => handleMonthChange(month)}
                >
                  {month}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-fit">
                <Settings2 className="mr-2 h-4 w-4" /> View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border flex-1">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableSkeleton rowCount={rowCount} cellCount={cellCount} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4"
                >
                  No data found for {selectedMonth}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end py-4 gap-2">
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground">
            {`Page ${
              table.getState().pagination.pageIndex + 1
            } of ${table.getPageCount()}`}
          </div>
          <div className="space-x-1 md:space-x-2">
            <Button
              variant="outline"
              className="h-7 w-7 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="h-7 w-7 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableComponent;
