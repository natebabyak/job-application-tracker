import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
  Edit2Icon,
  EllipsisIcon,
  Trash2Icon,
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
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
import { z } from "zod";

const statuses = [
  "accepted",
  "declined",
  "interviewing",
  "offered",
  "rejected",
  "submitted",
] as const;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schema = z.object({
  id: z.uuid(),
  position: z.string(),
  company: z.string(),
  submittedOn: z.date(),
  status: z.enum(statuses),
});

type Application = z.infer<typeof schema>;

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "position",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          onClick={() => column.toggleSorting(isSorted === "asc")}
          variant="ghost"
        >
          Position
          {!isSorted ? (
            <ChevronsUpDownIcon />
          ) : isSorted === "asc" ? (
            <ChevronUpIcon />
          ) : (
            <ChevronDownIcon />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "company",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          onClick={() => column.toggleSorting(isSorted === "asc")}
          variant="ghost"
        >
          Company
          {!isSorted ? (
            <ChevronsUpDownIcon />
          ) : isSorted === "asc" ? (
            <ChevronUpIcon />
          ) : (
            <ChevronDownIcon />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "submittedOn",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          onClick={() => column.toggleSorting(isSorted === "asc")}
          variant="ghost"
        >
          Submitted On
          {!isSorted ? (
            <ChevronsUpDownIcon />
          ) : isSorted === "asc" ? (
            <ChevronUpIcon />
          ) : (
            <ChevronDownIcon />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          onClick={() => column.toggleSorting(isSorted === "asc")}
          variant="ghost"
        >
          Status
          {!isSorted ? (
            <ChevronsUpDownIcon />
          ) : isSorted === "asc" ? (
            <ChevronUpIcon />
          ) : (
            <ChevronDownIcon />
          )}
        </Button>
      );
    },
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
            {statuses.map((s, i) => (
              <SelectItem key={i} value={s}>
                <span className="capitalize">{s}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <EllipsisIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              const response = await fetch(`${}`)
            }}>
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
