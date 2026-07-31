"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { Service } from "@/types";
import { numberValue, parseListResponse, parseResponse, nullableString } from "./serviceUtils";

const buildServicePayload = (formData: FormData) => {
  return {
    title: nullableString(formData.get("title")),
    icon: nullableString(formData.get("icon")), // Using text field for icon (e.g. lucide class or SVG string)
    price: nullableString(formData.get("price")),
    description: nullableString(formData.get("description")),
    whatsIncluded: String(formData.get("whatsIncluded") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    sortOrder: numberValue(formData.get("sortOrder")) ?? 0
  };
};

export const listServices = async () => {
  const res = await serverFetch.get("/services");
  return parseListResponse<Service>(res);
};

export const createService = async (formData: FormData) => {
  const payload = buildServicePayload(formData);
  const res = await serverFetch.post("/services", { body: JSON.stringify(payload) });
  return parseResponse<Service>(res);
};

export const updateService = async (id: string, formData: FormData) => {
  const payload = buildServicePayload(formData);
  const res = await serverFetch.patch(`/services/${id}`, { body: JSON.stringify(payload) });
  return parseResponse<Service>(res);
};

export const deleteService = async (id: string) => {
  const res = await serverFetch.delete(`/services/${id}`);
  return parseResponse<null>(res);
};
