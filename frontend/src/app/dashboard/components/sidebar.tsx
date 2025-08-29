"use client";

import { EllipsisIcon, LogOutIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { AptIcon } from "@/components/icons/apt";
import { signOut } from "@/auth";
import { Session } from "next-auth";
import DashboardSidebarDialog from "./dialog";

export default function DashboardSidebar({
  session,
}: {
  session: Session | null;
}) {
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
          <DashboardSidebarDialog />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuButton>d</SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar>
                    <AvatarImage src={session?.user?.image ?? undefined} />
                    <AvatarFallback>
                      <Skeleton />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid">
                    {session ? (
                      <span>{session?.user?.name}</span>
                    ) : (
                      <Skeleton />
                    )}
                    {session ? (
                      <span>{session?.user?.email}</span>
                    ) : (
                      <Skeleton />
                    )}
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
                    {session ? (
                      <span>{session?.user?.name}</span>
                    ) : (
                      <Skeleton />
                    )}
                    {session ? (
                      <span>{session?.user?.email}</span>
                    ) : (
                      <Skeleton />
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
                  <DropdownMenuLabel>Theme</DropdownMenuLabel>
                  <DropdownMenuRadioItem value="dark">
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="light">
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <DropdownMenuItem>
                      <LogOutIcon />
                      Sign out
                    </DropdownMenuItem>
                  </form>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
