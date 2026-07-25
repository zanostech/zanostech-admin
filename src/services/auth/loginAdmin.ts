/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import type { AdminProfile } from "@/types";

import { baseUrl, deleteCookie, getCookie, setCookie, serverFetch } from "@/lib/serverFetch";

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
export const getAdminProfile = async () => {
  try {
    const res = await serverFetch.get("/auth/me");
    const data = await res.json();

    if (!res.ok || !data.success) {
      return { success: false, message: data.message || "Unable to load admin profile", data: null };
    }

    return { success: true, message: data.message || "Success", data: data.data as AdminProfile };
  } catch (err: any) {
    return { success: false, message: err.message || "Unable to load admin profile", data: null };
  }
};

