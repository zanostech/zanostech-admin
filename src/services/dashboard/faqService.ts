"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { Faq } from "@/types";
import { numberValue, parseListResponse, parseResponse, nullableString } from "./serviceUtils";

const buildFaqPayload = (formData: FormData) => {
  return {
    question: nullableString(formData.get("question")),
    answer: nullableString(formData.get("answer")),
    sortOrder: numberValue(formData.get("sortOrder")) ?? 0
  };
};

export const listFaqs = async () => {
  const res = await serverFetch.get("/faqs");
  return parseListResponse<Faq>(res);
};

export const createFaq = async (formData: FormData) => {
  const payload = buildFaqPayload(formData);
  const res = await serverFetch.post("/faqs", { body: JSON.stringify(payload) });
  return parseResponse<Faq>(res);
};

export const updateFaq = async (id: string, formData: FormData) => {
  const payload = buildFaqPayload(formData);
  const res = await serverFetch.patch(`/faqs/${id}`, { body: JSON.stringify(payload) });
  return parseResponse<Faq>(res);
};

export const deleteFaq = async (id: string) => {
  const res = await serverFetch.delete(`/faqs/${id}`);
  return parseResponse<null>(res);
};
