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
  FileText,
  Printer,
  Settings,
  Settings2,
  Sheet,
} from "lucide-react";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Function to get the current month name
const getCurrentMonth = () => format(new Date(), "MMMM"); // "October", "February", etc.
const getCurrentYear = () => format(new Date(), "yyyy");

// const currentYear = new Date().getFullYear();
// const years = Array.from({ length: 11 }, (_, i) => currentYear - (10 - i));
// console.log(years)

const TableComponent = ({
  yearStarted,
  title,
  data,
  loading,
  rowCount,
  cellCount,
  setSelectedCategory,
  selectedCategory,
  columns,
  onGenerate
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());

  const formatYearStarted = yearStarted ? parseInt(format(new Date(yearStarted), "yyyy"), 10) : 2020;
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - formatYearStarted + 1 },
    (_, i) => formatYearStarted + i
  );

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  // Function to handle month change
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year) => setSelectedYear(year);

  // Filter data based on selected month and year
  const filteredData = useMemo(() => {
    return data.filter((rowDate) => {
      const date = new Date(rowDate.endDate || rowDate.date);
      const month = format(date, "MMMM");
      const year = format(date, "yyyy");

      return month === selectedMonth && year === String(selectedYear);
    });
  }, [data, selectedMonth, selectedYear]);
  
  const table = useReactTable({
    data: filteredData,
    columns: columns(onGenerate),
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

  // Function to export table data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `${title || "report"}.xlsx`);
  };

  // Function to export table data to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(title || "OrgConnect Reports", 10, 10);

    const tableData = filteredData.map((row) =>
      table.getAllColumns().map((col) => row[col.id])
    );

    doc.autoTable({
      head: [table.getAllColumns().map((col) => col.id)],
      body: tableData,
    });

    doc.save(`${title || "report"}.pdf`);
  };
  return (
    <>
      <Label className="font-semibold">{title}</Label>
      <div className="md:flex items-center justify-between py-4">
        <div className="flex items-center md:flex">
          {/* <Button className="rounded-none rounded-l-md">
            <Printer />
            Print
          </Button> */}
          <Button
            onClick={exportToPDF}
            className="rounded-none rounded-l-md border-r-0 w-1/2 md:w-full"
          >
            <FileText />
            PDF
          </Button>
          <Button
            onClick={exportToExcel}
            className="rounded-none rounded-r-md border-l-0 w-1/2 md:w-full"
          >
            <Sheet />
            Excel
          </Button>
        </div>
        <div className="flex-wrap-reverse mt-2 space-y-2 md:space-y-0 md:mt-0 md:space-x-2 md:flex md:items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-fit">
                <Settings className="mr-2 h-4 w-4" />{" "}
                {selectedCategory == "0"
                  ? "Attendance Reports"
                  : selectedCategory == "1"
                  ? "Collected Fees Reports"
                  : "Transaction Reports"}
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
          <div className="h-full flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-none rounded-l-md w-full md:w-fit"
                >
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
            {/* Year Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-none rounded-r-md w-full md:w-fit"
                >
                  {selectedYear}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {years.map((year) => (
                  <DropdownMenuCheckboxItem
                    key={year}
                    checked={selectedYear === year}
                    onCheckedChange={() => handleYearChange(year)}
                  >
                    {year}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
                  className="text-center py-4 text-muted-foreground"
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
