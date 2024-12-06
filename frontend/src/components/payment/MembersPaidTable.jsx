// PaymentTable.js
import React from "react";
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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Settings2,
} from "lucide-react";
import { membersColumns } from "@/components/payment/columns";

import TableSkeleton from "@/components/skeleton/TableSkeleton";

const MembersPaidTable = ({ data, loading, onAdd, onEdit, onDelete }) => {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10, // Default rows per page
  });
  const [globalFilter, setGlobalFilter] = React.useState("");
  // Define the columns where you want to apply the global filter
  const filterColumns = ["fullname", "course", "year","amount", "studentId"];

  const table = useReactTable({
    data,
    columns: membersColumns(onEdit, onDelete),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    pageCount: Math.ceil(data.length / pagination.pageSize),
    globalFilterFn: (row, columnIds, filterValue) => {
      // This function will filter across multiple columns
      return filterColumns.some((columnId) => {
        const cellValue = row.getValue(columnId);
        return String(cellValue)
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    },
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
  });

  const handleRowsPerPageChange = (size) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: size,
      pageIndex: 0, // Reset to first page when page size changes
    }));
  };

  return (
    <>
      <div className="md:flex items-center justify-between py-4">
      <Input
          placeholder="Filter payment..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="md:max-w-sm"
        />

        <div className="flex-wrap-reverse mt-2 space-y-2 md:space-y-0 md:mt-0 md:space-x-2 md:flex md:items-center">
          <Button className="w-full md:w-fit" onClick={onAdd}>
            Add Record
          </Button>
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
          <TableBody className="">
            {loading ? (
              <TableSkeleton rowCount={5} cellCount={3}/>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                //   onClick={() => onClick(row.original)}
                >
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
              <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={table.getVisibleLeafColumns().length || 5}
                className="h-32 text-center text-muted-foreground"
              >
                <div className="flex flex-col items-center justify-center">
                  
                  <p className="text-sm text-gray-600">No results found</p>
                  <p className="text-xs text-gray-400">
                    Try adjusting your filters or add new data.
                  </p>
                </div>
              </TableCell>
            </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 gap-2">
        <div className="hidden md:flex justify-end items-center gap-2 flex-1">
          <span className="text-xs font-bold">Rows per page</span>
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={(value) => handleRowsPerPageChange(Number(value))}
          >
            <SelectTrigger className="max-w-[60px] h-8">
              <SelectValue
                className="text-xs"
                placeholder={pagination.pageSize.toString()}
              />
            </SelectTrigger>

            <SelectContent>
              {[10, 15, 20, 30].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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

export default MembersPaidTable;
