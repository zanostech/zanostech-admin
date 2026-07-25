"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { Review } from "@/types";
import { boolValue, jsonForm, nullableString, numberValue, parseListResponse, parseResponse } from "./serviceUtils";

const buildReviewPayload = (formData: FormData) => ({
  clientName: nullableString(formData.get("clientName")),
  designation: nullableString(formData.get("designation")),
  company: nullableString(formData.get("company")),
  reviewText: nullableString(formData.get("reviewText")),
  rating: numberValue(formData.get("rating")) ?? 5,
  isFeatured: boolValue(formData.get("isFeatured"))
});

export const listReviews = async () => {
  const res = await serverFetch.get("/reviews");
  return parseListResponse<Review>(res);
};

export const createReview = async (formData: FormData) => {
  const res = await serverFetch.post("/reviews", { body: jsonForm(buildReviewPayload(formData), "avatar", formData) });
  return parseResponse<Review>(res);
};

export const updateReview = async (id: string, formData: FormData) => {
  const res = await serverFetch.patch(`/reviews/${id}`, { body: jsonForm(buildReviewPayload(formData), "avatar", formData) });
  return parseResponse<Review>(res);
};

export const deleteReview = async (id: string) => {
  const res = await serverFetch.delete(`/reviews/${id}`);
  return parseResponse<null>(res);
};
