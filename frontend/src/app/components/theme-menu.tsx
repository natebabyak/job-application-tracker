"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

const themes = ["dark", "light", "system"];

export default function ThemeMenu() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          {theme === "dark" ? (
            <MoonIcon className="size-6" />
          ) : theme === "light" ? (
            <SunIcon className="size-6" />
          ) : theme === "system" ? (
            <SunMoonIcon className="size-6" />
          ) : (
            <Skeleton className="size-6" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom">
        <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
          {themes.map((t) => {
            return (
              <DropdownMenuRadioItem key={t} value={t}>
                <span className="capitalize">{t}</span>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
