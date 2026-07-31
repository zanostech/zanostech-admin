"use server";

import { serverFetch } from "@/lib/serverFetch";
import { parseResponse } from "./serviceUtils";

export const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("image", file);
  
  const res = await serverFetch.post("/upload", { body: formData });
  const result = await parseResponse<{ url: string }>(res);
  
  if (result.success && result.data?.url) {
    return result.data.url;
  }
  
  return null;
};
