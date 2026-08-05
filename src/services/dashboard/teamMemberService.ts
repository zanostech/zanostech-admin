"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { TeamMember } from "@/types";
import { numberValue, parseListResponse, parseResponse, nullableString } from "./serviceUtils";
import { uploadImage } from "./uploadService";

const buildTeamMemberPayload = async (formData: FormData) => {
  const file = formData.get("photoUrl") as File | null;
  let photoUrl: string | undefined = undefined;
  
  if (file && file.size > 0) {
    const uploadedUrl = await uploadImage(file);
    if (uploadedUrl) {
      photoUrl = uploadedUrl;
    }
  }

  // Handle socialLinks JSON string or construct it from separate inputs if needed.
  // For simplicity, assuming the form passes a valid JSON string or we leave it empty.
  const socialLinksStr = formData.get("socialLinks") as string;
  let socialLinks: string[] = [];
  try {
    if (socialLinksStr) socialLinks = JSON.parse(socialLinksStr);
  } catch (e) {}

  const payload: any = {
    name: nullableString(formData.get("name")),
    designation: nullableString(formData.get("designation")),
    bio: nullableString(formData.get("bio")),
    portfolioLink: nullableString(formData.get("portfolioLink")),
    socialLinks,
    sortOrder: numberValue(formData.get("sortOrder")) ?? 0
  };

  if (photoUrl) {
    payload.photoUrl = photoUrl;
  }

  return payload;
};

export const listTeamMembers = async () => {
  const res = await serverFetch.get("/team-members");
  return parseListResponse<TeamMember>(res);
};

export const createTeamMember = async (formData: FormData) => {
  const payload = await buildTeamMemberPayload(formData);
  const res = await serverFetch.post("/team-members", { body: JSON.stringify(payload) });
  return parseResponse<TeamMember>(res);
};

export const updateTeamMember = async (id: string, formData: FormData) => {
  const payload = await buildTeamMemberPayload(formData);
  const res = await serverFetch.patch(`/team-members/${id}`, { body: JSON.stringify(payload) });
  return parseResponse<TeamMember>(res);
};

export const deleteTeamMember = async (id: string) => {
  const res = await serverFetch.delete(`/team-members/${id}`);
  return parseResponse<null>(res);
};
