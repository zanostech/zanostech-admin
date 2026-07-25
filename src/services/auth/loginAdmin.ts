/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { baseUrl, deleteCookie, getCookie, setCookie } from "@/lib/serverFetch";

export const loginAdmin = async (payload: { email: string; password: string }) => {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store"
    });
    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message || "Invalid credentials" };
    }

    if (data.data?.accessToken) {
      await setCookie("accessToken", data.data.accessToken);
    }
    if (data.data?.refreshToken) {
      await setCookie("refreshToken", data.data.refreshToken);
    }

    return { success: true, data: data.data };
  } catch (err: any) {
    return { success: false, message: err.message || "Login failed" };
  }
};

export const logoutAdmin = async () => {
  const token = await getCookie("accessToken");
  try {
    if (token) {
      await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store"
      });
    }
  } catch {
    // Local cookie cleanup is still the important client-side logout step.
  }
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
  return { success: true };
};