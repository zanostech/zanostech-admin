"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { Inquiry } from "@/types";
import { parseListResponse, parseResponse } from "./serviceUtils";

export const listInquiries = async () => {
  const res = await serverFetch.get("/inquiry");
  return parseListResponse<Inquiry>(res);
};

export const createInquiry = async () => ({
  success: false,
  message: "Inquiries can only be updated by status from this backend.",
  data: null
});

export const updateInquiry = async (id: string, formData: FormData) => {
  const res = await serverFetch.patch(`/inquiry/${id}/status`, { body: JSON.stringify({ status: formData.get("status") }) });
  return parseResponse<Inquiry>(res);
};

export const deleteInquiry = async () => ({
  success: false,
  message: "The backend does not provide an inquiry delete route.",
  data: null
});
