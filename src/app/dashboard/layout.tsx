"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { AdminProvider } from "@/context/AdminContext";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/projects": "Projects",
  "/dashboard/reviews": "Reviews",
  "/dashboard/inquiries": "Inquiries",
  "/dashboard/site-config": "Site Config",
  "/dashboard/social-links": "Social Links"
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "Dashboard";

  return (
    <AdminProvider>
      <div className="flex min-h-screen" style={{ background: "#f6f8f5" }}>
        <AdminSidebar />
        <div className="ml-[280px] flex flex-1 flex-col">
          <AdminHeader title={title} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AdminProvider>
  );
}