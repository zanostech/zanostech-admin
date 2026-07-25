"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { SiteConfig } from "@/types";
import { nullableString, parseListResponse, parseResponse } from "./serviceUtils";

const buildSiteConfigPayload = (formData: FormData) => ({
  companyName: nullableString(formData.get("companyName")),
  heroHeading: nullableString(formData.get("heroHeading")),
  heroSubheading: nullableString(formData.get("heroSubheading")),
  slogan: nullableString(formData.get("slogan")),
  contactEmail: nullableString(formData.get("contactEmail")),
  contactPhone: nullableString(formData.get("contactPhone"))
});

export const listSiteConfigs = async () => {
  const res = await serverFetch.get("/site-config");
  return parseListResponse<SiteConfig>(res);
};

export const createSiteConfig = async (formData: FormData) => {
  const res = await serverFetch.post("/site-config", { body: JSON.stringify(buildSiteConfigPayload(formData)) });
  return parseResponse<SiteConfig>(res);
};

export const updateSiteConfig = async (id: string, formData: FormData) => {
  const res = await serverFetch.patch(`/site-config/${id}`, { body: JSON.stringify(buildSiteConfigPayload(formData)) });
  return parseResponse<SiteConfig>(res);
};

export const deleteSiteConfig = async (id: string) => {
  const res = await serverFetch.delete(`/site-config/${id}`);
  return parseResponse<null>(res);
};
