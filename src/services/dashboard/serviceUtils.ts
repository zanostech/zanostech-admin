import type { EntityRecord } from "@/types";

export type ServiceResult<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

export const parseResponse = async <T>(res: Response): Promise<ServiceResult<T>> => {
  let payload: unknown = null;

  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  const body = payload as { success?: boolean; message?: string; data?: T | null } | null;

  if (!res.ok || body?.success === false) {
    return {
      success: false,
      message: body?.message || `Request failed with status ${res.status}`,
      data: null
    };
  }

  return {
    success: true,
    message: body?.message || "Success",
    data: body?.data ?? null
  };
};

export const asList = <T>(value: T[] | T | null): T[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

export const parseListResponse = async <T extends EntityRecord>(res: Response): Promise<ServiceResult<T[]>> => {
  const parsed = await parseResponse<T[] | T>(res);
  return { ...parsed, data: asList(parsed.data) };
};

export const nullableString = (value: FormDataEntryValue | null) => {
  const text = String(value ?? "").trim();
  return text ? text : undefined;
};

export const boolValue = (value: FormDataEntryValue | null) => value === "on" || value === "true";

export const numberValue = (value: FormDataEntryValue | null) => {
  const text = String(value ?? "").trim();
  return text ? Number(text) : undefined;
};

export const jsonForm = (payload: Record<string, unknown>, fileField?: string, formData?: FormData) => {
  const body = new FormData();
  body.append("data", JSON.stringify(payload));

  if (fileField && formData) {
    const file = formData.get(fileField);
    if (file instanceof File && file.size > 0) {
      body.append(fileField, file);
    }
  }

  return body;
};

