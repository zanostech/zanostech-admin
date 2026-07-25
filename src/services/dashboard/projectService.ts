"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { Project } from "@/types";
import { boolValue, jsonForm, nullableString, numberValue, parseListResponse, parseResponse } from "./serviceUtils";

const buildProjectPayload = (formData: FormData) => ({
  title: nullableString(formData.get("title")),
  description: nullableString(formData.get("description")),
  techStack: String(formData.get("techStack") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  caseStudy: nullableString(formData.get("caseStudy")),
  liveLink: nullableString(formData.get("liveLink")),
  isFeatured: boolValue(formData.get("isFeatured")),
  order: numberValue(formData.get("order")) ?? 0
});

export const listProjects = async () => {
  const res = await serverFetch.get("/projects");
  return parseListResponse<Project>(res);
};

export const createProject = async (formData: FormData) => {
  const res = await serverFetch.post("/projects", { body: jsonForm(buildProjectPayload(formData), "thumbnail", formData) });
  return parseResponse<Project>(res);
};

export const updateProject = async (id: string, formData: FormData) => {
  const res = await serverFetch.patch(`/projects/${id}`, { body: jsonForm(buildProjectPayload(formData), "thumbnail", formData) });
  return parseResponse<Project>(res);
};

export const deleteProject = async (id: string) => {
  const res = await serverFetch.delete(`/projects/${id}`);
  return parseResponse<null>(res);
};
