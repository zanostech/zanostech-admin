import { cookies } from "next/headers";

export const baseUrl = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:9001/v1").replace(/\/$/, "");

export const getCookie = async (name: string): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

export const setCookie = async (name: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/"
  });
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};

const serverFetchHelper = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");
  const isFormData = restOptions.body instanceof FormData;

  return fetch(`${baseUrl}${endpoint}`, {
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers
    },
    cache: "no-store",
    ...restOptions
  });
};

export const serverFetch = {
  get: async (endpoint: string, options?: RequestInit): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),
  post: async (endpoint: string, options?: RequestInit): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),
  patch: async (endpoint: string, options?: RequestInit): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),
  delete: async (endpoint: string, options?: RequestInit): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" })
};