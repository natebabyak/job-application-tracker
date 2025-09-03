"use client";

import { AptIcon } from "@/components/icons/apt";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon, LogOutIcon } from "lucide-react";
import { Session } from "next-auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { DashboardApplicationAdd } from "./application-add";

interface DashboardSidebarProps {
  session: Session;
}

export function DashboardSidebar({ session }: DashboardSidebarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 select-none">
          <AptIcon className="size-6" />
          <h1 className="text-2xl font-bold">Apt</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarHeader>
          <DashboardApplicationAdd multi={false} />
          <DashboardApplicationAdd multi={true} />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Filters</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuButton>Add application</SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="flex">
                    <Avatar>
                      <AvatarImage src={session?.user?.image ?? undefined} />
                      <AvatarFallback>
                        <Skeleton />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      {session ? (
                        <span className="text-sm">{session.user?.name}</span>
                      ) : (
                        <Skeleton />
                      )}
                      {session ? (
                        <span className="text-xs">{session.user?.email}</span>
                      ) : (
                        <Skeleton />
                      )}
                    </div>
                  </div>
                  <EllipsisIcon className="size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right">
                <DropdownMenuLabel className="flex">
                  <div className="flex">
                    <Avatar>
                      <AvatarImage src={session?.user?.image ?? undefined} />
                      <AvatarFallback>
                        <Skeleton />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      {session ? (
                        <span className="text-sm">{session.user?.name}</span>
                      ) : (
                        <Skeleton />
                      )}
                      {session ? (
                        <span className="text-xs">{session.user?.email}</span>
                      ) : (
                        <Skeleton />
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
                  <DropdownMenuLabel>Theme</DropdownMenuLabel>
                  {["dark", "light", "system"].map((theme) => (
                    <DropdownMenuRadioItem key={theme} value={theme}>
                      <span className="capitalize">{theme}</span>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOutIcon />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
