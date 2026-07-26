"use server";

import { serverFetch } from "@/lib/serverFetch";
import { parseResponse } from "./serviceUtils";
import type { Inquiry } from "@/types";

export type DashboardSummaryResponse = {
  counts: {
    projects: number;
    reviews: number;
    inquiries: number;
    socialLinks: number;
  };
  recentInquiries: Inquiry[];
};

export const getDashboardSummary = async () => {
  const res = await serverFetch.get("/dashboard/summary");
  const parsed = await parseResponse<DashboardSummaryResponse>(res);
  
  if (!parsed.success || !parsed.data) {
    return {
      counts: { projects: 0, reviews: 0, inquiries: 0, socialLinks: 0 },
      recentInquiries: [],
      errors: [parsed.message]
    };
  }

  return {
    counts: parsed.data.counts,
    recentInquiries: parsed.data.recentInquiries,
    errors: [] as string[]
  };
};

