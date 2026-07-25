"use client";

import { createContext, useContext } from "react";

type AdminContextValue = {
  adminProfile: { name: string; role: string };
};

const AdminContext = createContext<AdminContextValue>({
  adminProfile: { name: "ZanosTech Admin", role: "SUPER_ADMIN" }
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => (
  <AdminContext.Provider value={{ adminProfile: { name: "ZanosTech Admin", role: "SUPER_ADMIN" } }}>
    {children}
  </AdminContext.Provider>
);

export const useAdmin = () => useContext(AdminContext);
