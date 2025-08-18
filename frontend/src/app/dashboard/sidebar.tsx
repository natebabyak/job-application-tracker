"use client";

import {
  Calendar,
  EllipsisIcon,
  Home,
  Inbox,
  LogOutIcon,
  Search,
  Settings,
  SettingsIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DashboardDialog } from "./dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const { data: session } = useSession();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex gap-2">
          <Image src="/apt.svg" alt="Apt" width={24} height={24} />
          <h1 className="text-2xl font-bold">Apt</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarHeader>
          <DashboardDialog />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="rounded-md">
                    <AvatarImage src={session?.user?.image ?? undefined} />
                    <AvatarFallback>
                      <Skeleton />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid">
                    <span>{session?.user?.name}</span>
                    <span>{session?.user?.email}</span>
                  </div>
                  <EllipsisIcon className="size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right">
                <DropdownMenuLabel className="flex">
                  <Avatar>
                    <AvatarImage src={session?.user?.image ?? undefined} />
                    <AvatarFallback>
                      <Skeleton />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid">
                    <span>{session?.user?.name}</span>
                    <span>{session?.user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <SettingsIcon />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <LogOutIcon />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
