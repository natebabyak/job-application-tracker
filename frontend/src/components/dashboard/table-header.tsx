import { Button } from "@/components/ui/button";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  EyeOffIcon,
} from "lucide-react";
import { Column } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardTableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export default function DashboardTableHeader<TData, TValue>({
  column,
  title,
}: DashboardTableHeaderProps<TData, TValue>) {
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
