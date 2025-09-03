"use client";

import { Application } from "./constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DashboardTableCell } from "./table-cell";
import { DashboardTableHeader } from "./table-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2Icon, EllipsisIcon } from "lucide-react";
import { DashboardDeleteApplication } from "./delete-application";

export const columns: ColumnDef<Application>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <DashboardTableHeader column={column} title="Position" />
    ),
    cell: ({ row }) => <DashboardTableCell text={row.original.position} />,
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DashboardTableHeader column={column} title="Company" />
    ),
    cell: ({ row }) => <DashboardTableCell text={row.original.company} />,
  },
  {
    accessorKey: "submitted_on",
    header: ({ column }) => (
      <DashboardTableHeader column={column} title="Submitted On" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">
        {new Date(row.original.submitted_on).toLocaleDateString(undefined, {
          dateStyle: "medium",
        })}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DashboardTableHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <Badge
          className="capitalize"
          variant={
            status === "submitted"
              ? "outline"
              : status === "declined" || status === "rejected"
                ? "destructive"
                : "default"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <EllipsisIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit2Icon />
              Edit application
            </DropdownMenuItem>
            <DashboardDeleteApplication
              position={row.original.position}
              company={row.original.company}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
