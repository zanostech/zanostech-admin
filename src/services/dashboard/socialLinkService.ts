"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { SocialLink } from "@/types";
import { boolValue, nullableString, parseListResponse, parseResponse } from "./serviceUtils";

const buildSocialLinkPayload = (formData: FormData) => ({
  platform: nullableString(formData.get("platform")),
  url: nullableString(formData.get("url")),
  isActive: boolValue(formData.get("isActive"))
});

export const listSocialLinks = async () => {
  const res = await serverFetch.get("/social-links");
  return parseListResponse<SocialLink>(res);
};

export const createSocialLink = async (formData: FormData) => {
  const res = await serverFetch.post("/social-links", { body: JSON.stringify(buildSocialLinkPayload(formData)) });
  return parseResponse<SocialLink>(res);
};

export const updateSocialLink = async (id: string, formData: FormData) => {
  const res = await serverFetch.patch(`/social-links/${id}`, { body: JSON.stringify(buildSocialLinkPayload(formData)) });
  return parseResponse<SocialLink>(res);
};

export const deleteSocialLink = async (id: string) => {
  const res = await serverFetch.delete(`/social-links/${id}`);
  return parseResponse<null>(res);
};
