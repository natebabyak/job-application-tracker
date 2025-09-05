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
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChartIcon,
  Edit2Icon,
  EllipsisIcon,
  LogOutIcon,
  PieChartIcon,
  PlusIcon,
  Table2Icon,
  Trash2Icon,
} from "lucide-react";
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
import { DashboardAddApplicationButton } from "./add-application-button";

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
          <DashboardAddApplicationButton />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuButton>
              <ArrowUpIcon />
              Top
            </SidebarMenuButton>
            <SidebarMenuButton>
              <PieChartIcon />
              Pie Chart
            </SidebarMenuButton>
            <SidebarMenuButton>
              <BarChartIcon />
              Bar Chart
            </SidebarMenuButton>
            <SidebarMenuButton>
              <Table2Icon />
              Table
            </SidebarMenuButton>
            <SidebarMenuButton>
              <ArrowDownIcon />
              Bottom
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuButton>
              <PlusIcon />
              Add Application
            </SidebarMenuButton>
            <SidebarMenuButton>
              <Edit2Icon />
              Edit Application
            </SidebarMenuButton>
            <SidebarMenuButton>
              <Trash2Icon />
              Delete Application
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex h-fit items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Avatar className="size-8">
                      <AvatarImage src={session?.user?.image ?? undefined} />
                      <AvatarFallback>
                        <Skeleton />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      {session ? (
                        <span className="text-xs">{session.user?.name}</span>
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
                <DropdownMenuLabel className="flex h-fit items-center">
                  <div className="flex items-center gap-1">
                    <Avatar className="size-8">
                      <AvatarImage src={session?.user?.image ?? undefined} />
                      <AvatarFallback>
                        <Skeleton />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      {session ? (
                        <span className="text-xs">{session.user?.name}</span>
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
