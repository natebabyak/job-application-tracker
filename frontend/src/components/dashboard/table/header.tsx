import { Application } from "@/app/dashboard/columns";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import { Column } from "@tanstack/react-table";

export function DashboardTableHeader({
  column,
  text,
}: {
  column: Column<Application>;
  text: string;
}) {
  const isSorted = column.getIsSorted();

  return (
    <Button
      onClick={() => column.toggleSorting(isSorted === "asc")}
      variant="ghost"
    >
      {text}
      {!isSorted ? (
        <ChevronsUpDownIcon />
      ) : isSorted === "asc" ? (
        <ChevronUpIcon />
      ) : (
        <ChevronDownIcon />
      )}
    </Button>
  );
}
