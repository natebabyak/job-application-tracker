"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2Icon, EllipsisIcon, EyeIcon, Trash2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { z } from "zod";
import { DashboardTableHeader } from "./table/header";

export const applicationStatuses = [
  "accepted",
  "declined",
  "interviewing",
  "offered",
  "rejected",
  "submitted",
] as const;

export type ApplicationStatus = (typeof applicationStatuses)[number];

export const ApplicationSchema = z.object({
  position: z.string(),
  company: z.string(),
  submittedOn: z.date(),
  status: z.enum(applicationStatuses),
});

export type Application = z.infer<typeof ApplicationSchema>;

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
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DashboardTableHeader column={column} title="Company" />
    ),
  },
  {
    accessorKey: "submittedOn",
    header: ({ column }) => (
      <DashboardTableHeader column={column} title="Submitted On" />
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
        <Select>
          <SelectTrigger>
            <Badge
              variant={
                status === "accepted" || status === "offered"
                  ? "default"
                  : status === "declined" || status === "rejected"
                  ? "destructive"
                  : "secondary"
              }
            >
              {status}
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {applicationStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                <span className="capitalize">{status}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
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
      );
    },
  },
];
