import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface DashboardTableCellProps {
  text: string;
}

export function DashboardTableCell({ text }: DashboardTableCellProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button onClick={handleClick} variant="ghost" className="group">
      {text}
      <div className="relative ml-2 size-4 opacity-0 transition-opacity group-hover:opacity-100">
        <CopyIcon
          className={cn(
            "absolute inset-0 scale-100 transition-all",
            copied && "scale-0",
          )}
        />
        <CheckIcon
          className={cn(
            "absolute inset-0 scale-0 transition-all",
            copied && "scale-100",
          )}
        />
      </div>
    </Button>
  );
}
