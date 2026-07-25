"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { FolderKanban, Link2, Mail, MessageSquareQuote, Settings } from "lucide-react";
import { getDashboardSummary } from "@/services/dashboard/dashboardSummaryService";

type Summary = Awaited<ReturnType<typeof getDashboardSummary>>;

const cards = [
  { label: "Projects", key: "projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Reviews", key: "reviews", href: "/dashboard/reviews", icon: MessageSquareQuote },
  { label: "Inquiries", key: "inquiries", href: "/dashboard/inquiries", icon: Mail },
  { label: "Site Config", key: "siteConfig", href: "/dashboard/site-config", icon: Settings },
  { label: "Social Links", key: "socialLinks", href: "/dashboard/social-links", icon: Link2 }
] as const;

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      setSummary(await getDashboardSummary());
    });
  }, []);

  return (
    <div className="space-y-6">
      <section className="admin-card p-6">
        <h2 className="text-xl font-bold text-emerald-950">ZanosTech Dashboard</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Live overview from the ZanosTech backend. Use the service cards to manage content, inquiries, site configuration, and social links.
        </p>
        {summary?.errors?.length ? (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            {summary.errors.join(" | ")}
          </div>
        ) : null}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          const count = summary ? summary[card.key].length : 0;
          return (
            <Link key={card.key} href={card.href} className="admin-card group p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-emerald-50 p-2 text-emerald-900"><Icon size={20} /></div>
                <span className="text-xs font-bold uppercase text-gray-400">Manage</span>
              </div>
              <p className="mt-5 text-sm font-semibold text-gray-500">{card.label}</p>
              <p className="mt-2 text-3xl font-black text-emerald-950">{isPending ? "..." : count}</p>
            </Link>
          );
        })}
      </section>

      <section className="admin-card overflow-hidden">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="font-bold text-emerald-950">Recent Inquiries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(summary?.inquiries ?? []).slice(0, 5).map((inquiry) => (
                <tr key={inquiry.id}>
                  <td className="px-4 py-3 font-semibold text-gray-800">{inquiry.name}</td>
                  <td className="px-4 py-3 text-gray-600">{inquiry.email}</td>
                  <td className="px-4 py-3 text-gray-600">{inquiry.subject || "-"}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-800">{inquiry.status}</span></td>
                </tr>
              ))}
              {!summary?.inquiries?.length && <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No inquiries found.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
