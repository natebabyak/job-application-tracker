import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./sidebar";

export default function Dashboard() {
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
