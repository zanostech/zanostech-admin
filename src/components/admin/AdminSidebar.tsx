"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { NAV_SECTIONS } from "@/constants/nav";
import { useAdmin } from "@/context/AdminContext";
import { logoutAdmin } from "@/services/auth/loginAdmin";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { adminProfile } = useAdmin();

  const isActive = (path: string) => path === "/dashboard" ? pathname === path : pathname.startsWith(path);

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/login");
  };

  return (
    <aside className="admin-sidebar admin-scrollbar fixed bottom-0 left-0 top-0 z-40 flex w-[280px] flex-col overflow-y-auto">
      <Link href="/dashboard" className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-400 text-sm font-black text-emerald-950">ZT</div>
        <div>
          <span className="block text-xl font-bold leading-none text-white">ZanosTech</span>
          <span className="mt-1 block text-sm font-bold text-emerald-300">Admin Portal</span>
        </div>
      </Link>

      <nav className="flex-1 py-2">
        {NAV_SECTIONS.map((section) => (
          <div key={section.section}>
            <div className="px-5 pb-2 pt-4 text-[11px] font-bold uppercase text-emerald-200/55">{section.section}</div>
            {section.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={item.href} className={`admin-sidebar-nav-item ${active ? "active" : ""}`}>
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-sm font-bold text-emerald-950">A</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{adminProfile.name}</p>
            <p className="text-[11px] font-bold uppercase text-emerald-300">{adminProfile.role.replace("_", " ")}</p>
          </div>
          <button onClick={handleLogout} title="Sign Out" className="rounded-lg p-2 text-emerald-100/70 hover:bg-white/10 hover:text-white">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
