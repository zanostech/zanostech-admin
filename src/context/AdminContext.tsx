"use client";

import type { AdminProfile } from "@/types";
import { getAdminProfile } from "@/services/auth/loginAdmin";
import { createContext, useContext, useEffect, useState } from "react";

const fallbackAdminProfile: AdminProfile = {
  id: "",
  email: "",
  name: "ZanosTech Admin",
  role: "ADMIN",
  status: "ACTIVE",
  createdAt: ""
};

type AdminContextValue = {
  adminProfile: AdminProfile;
  isProfileLoading: boolean;
};

const AdminContext = createContext<AdminContextValue>({
  adminProfile: fallbackAdminProfile,
  isProfileLoading: true
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminProfile, setAdminProfile] = useState<AdminProfile>(fallbackAdminProfile);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadAdminProfile = async () => {
      const result = await getAdminProfile();

      if (isMounted && result.success && result.data) {
        setAdminProfile(result.data);
      }

      if (isMounted) {
        setIsProfileLoading(false);
      }
    };

    loadAdminProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AdminContext.Provider value={{ adminProfile, isProfileLoading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
