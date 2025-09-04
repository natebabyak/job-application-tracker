"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DashboardTableHeader } from "./table-header";
import { DashboardTableCell } from "./table-cell";
import { ApplicationWithId } from "../../lib/constants";
import { DashboardEditApplicationButton } from "./edit-application-button";
import { DashboardDeleteApplicationButton } from "./delete-application-button";

export const columns: ColumnDef<ApplicationWithId>[] = [
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
    cell: ({ row }) => <DashboardTableCell text={row.original.submitted_on} />,
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
      <div className="flex justify-end gap-2">
        <DashboardEditApplicationButton application={row.original} />
        <DashboardDeleteApplicationButton application={row.original} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
