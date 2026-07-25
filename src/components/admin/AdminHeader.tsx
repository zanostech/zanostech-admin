"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import { logoutAdmin } from "@/services/auth/loginAdmin";

export default function AdminHeader({ title }: { title: string }) {
  const router = useRouter();
  const { adminProfile, isProfileLoading } = useAdmin();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/login");
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-6 shadow-sm">
      <h1 className="text-lg font-bold" style={{ color: "#064e3b" }}>{title}</h1>
      <div className="flex-1" />
      <div className="hidden text-right md:block">
        <p className="text-sm font-bold text-gray-900">{isProfileLoading ? "Loading..." : adminProfile.name}</p>
        <p className="text-[11px] font-bold uppercase text-gray-400">{isProfileLoading ? "" : adminProfile.role.replaceAll("_", " ")}</p>
      </div>
      <button onClick={handleLogout} className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50" title="Sign Out">
        <LogOut size={17} />
      </button>
    </header>
  );
}

