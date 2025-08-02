import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <SidebarTrigger />
        <h1>Dashboard</h1>
      </SidebarInset>
    </SidebarProvider>
  );
}
