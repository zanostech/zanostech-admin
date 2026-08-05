"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { Project } from "@/types";
import { boolValue, numberValue, parseListResponse, parseResponse, nullableString } from "./serviceUtils";
import { uploadImage } from "./uploadService";

const buildProjectPayload = async (formData: FormData) => {
  const file = formData.get("thumbnail") as File | null;
  let thumbnailUrl: string | undefined = undefined;
  
  if (file && file.size > 0) {
    const uploadedUrl = await uploadImage(file);
    if (uploadedUrl) {
      thumbnailUrl = uploadedUrl;
    }
  }

  const techStackStr = formData.get("techStack") as string;
  let techStack: string[] = [];
  try {
    if (techStackStr) techStack = JSON.parse(techStackStr);
  } catch (e) {
    techStack = String(techStackStr || "").split(",").map((i) => i.trim()).filter(Boolean);
  }

  const payload: any = {
    title: nullableString(formData.get("title")),
    description: nullableString(formData.get("description")),
    techStack,
    projectType: String(formData.get("projectType") ?? "")
      .split(",")
      .map((item) => item.trim().toUpperCase())
      .filter(Boolean),
    caseStudy: nullableString(formData.get("caseStudy")),
    liveLink: nullableString(formData.get("liveLink")),
    appStoreLink: nullableString(formData.get("appStoreLink")),
    playStoreLink: nullableString(formData.get("playStoreLink")),
    isFeatured: boolValue(formData.get("isFeatured")),
    order: numberValue(formData.get("order")) ?? 0
  };

  if (thumbnailUrl) {
    payload.thumbnail = thumbnailUrl;
  }

  return payload;
};

export const listProjects = async () => {
  const res = await serverFetch.get("/projects");
  return parseListResponse<Project>(res);
};

export const createProject = async (formData: FormData) => {
  const payload = await buildProjectPayload(formData);
  const res = await serverFetch.post("/projects", { body: JSON.stringify(payload) });
  return parseResponse<Project>(res);
};

export const updateProject = async (id: string, formData: FormData) => {
  const payload = await buildProjectPayload(formData);
  const res = await serverFetch.patch(`/projects/${id}`, { body: JSON.stringify(payload) });
  return parseResponse<Project>(res);
};

export const deleteProject = async (id: string) => {
  const res = await serverFetch.delete(`/projects/${id}`);
  return parseResponse<null>(res);
};
