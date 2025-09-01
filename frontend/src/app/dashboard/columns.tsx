"use client";

import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  Edit2Icon,
  EllipsisIcon,
  EyeIcon,
  EyeOffIcon,
  Trash2Icon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Application, applicationStatuses } from "./constants";

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "position",
    header: ({ column }) => <TableHeader column={column} title="Position" />,
  },
  {
    accessorKey: "company",
    header: ({ column }) => <TableHeader column={column} title="Company" />,
  },
  {
    accessorKey: "submittedOn",
    header: ({ column }) => (
      <TableHeader column={column} title="Submitted On" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <TableHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Select>
        <SelectTrigger>
          <Badge>{row.original.status}</Badge>
        </SelectTrigger>
        <SelectContent>
          {applicationStatuses.map((s) => (
            <SelectItem key={s} value={s}>
              <span className="capitalize">{s}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <EyeIcon />
            View application
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit2Icon />
            Edit application
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2Icon />
            Delete application
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

interface TableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

function TableHeader<TData, TValue>({
  column,
  title,
}: TableHeaderProps<TData, TValue>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          {title}
          {column.getIsSorted() === "asc" ? (
            <ArrowUpIcon />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDownIcon />
          ) : (
            <ArrowUpDownIcon />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <ArrowUpIcon />
          Sort asc.
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <ArrowDownIcon />
          Sort desc.
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
          <EyeOffIcon />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
