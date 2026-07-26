"use server";

import { serverFetch } from "@/lib/serverFetch";
import { parseResponse } from "./serviceUtils";

export const getSiteConfig = async () => {
  const res = await serverFetch.get("/site-config");
  return parseResponse<any>(res);
};

export const updateSiteConfig = async (payload: any) => {
  const res = await serverFetch.patch("/site-config", { 
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });
  return parseResponse<any>(res);
};
