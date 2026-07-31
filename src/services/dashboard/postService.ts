"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { Post } from "@/types";
import { boolValue, parseListResponse, parseResponse, nullableString } from "./serviceUtils";
import { uploadImage } from "./uploadService";

const buildPostPayload = async (formData: FormData) => {
  const file = formData.get("coverImageUrl") as File | null;
  let coverImageUrl: string | undefined = undefined;
  
  if (file && file.size > 0) {
    const uploadedUrl = await uploadImage(file);
    if (uploadedUrl) {
      coverImageUrl = uploadedUrl;
    }
  }

  const payload: any = {
    title: nullableString(formData.get("title")),
    slug: nullableString(formData.get("slug")),
    content: nullableString(formData.get("content")),
    author: nullableString(formData.get("author")),
    category: nullableString(formData.get("category")),
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    isPublished: boolValue(formData.get("isPublished")),
  };

  if (coverImageUrl) {
    payload.coverImageUrl = coverImageUrl;
  }

  return payload;
};

export const listPosts = async () => {
  const res = await serverFetch.get("/posts");
  return parseListResponse<Post>(res);
};

export const createPost = async (formData: FormData) => {
  const payload = await buildPostPayload(formData);
  const res = await serverFetch.post("/posts", { body: JSON.stringify(payload) });
  return parseResponse<Post>(res);
};

export const updatePost = async (id: string, formData: FormData) => {
  const payload = await buildPostPayload(formData);
  const res = await serverFetch.patch(`/posts/${id}`, { body: JSON.stringify(payload) });
  return parseResponse<Post>(res);
};

export const deletePost = async (id: string) => {
  const res = await serverFetch.delete(`/posts/${id}`);
  return parseResponse<null>(res);
};
