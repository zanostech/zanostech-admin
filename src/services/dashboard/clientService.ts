"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { Client } from "@/types";
import { numberValue, parseListResponse, parseResponse, nullableString } from "./serviceUtils";

const buildClientPayload = (formData: FormData) => {
  return {
    name: nullableString(formData.get("name")),
    sortOrder: numberValue(formData.get("sortOrder")) ?? 0
  };
};

export const listClients = async () => {
  const res = await serverFetch.get("/clients");
  return parseListResponse<Client>(res);
};

export const createClient = async (formData: FormData) => {
  const payload = buildClientPayload(formData);
  const res = await serverFetch.post("/clients", { body: JSON.stringify(payload) });
  return parseResponse<Client>(res);
};

export const updateClient = async (id: string, formData: FormData) => {
  const payload = buildClientPayload(formData);
  const res = await serverFetch.patch(`/clients/${id}`, { body: JSON.stringify(payload) });
  return parseResponse<Client>(res);
};

export const deleteClient = async (id: string) => {
  const res = await serverFetch.delete(`/clients/${id}`);
  return parseResponse<null>(res);
};
