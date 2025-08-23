import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2Icon, EllipsisIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { z } from "zod";
import { DashboardTableHeader } from "@/components/dashboard/table/header";

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
    accessorKey: "position",
    header: ({ column }) => (
      <DashboardTableHeader column={column} text="Position" />
    ),
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DashboardTableHeader column={column} text="Company" />
    ),
  },
  {
    accessorKey: "submittedOn",
    header: ({ column }) => (
      <DashboardTableHeader column={column} text="Submitted On" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DashboardTableHeader column={column} text="Status" />
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
