"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function ClientsPage() {
  return (
    <EntityManager
      entity="clients"
      title="Clients"
      description="Manage your list of clients."
      searchableKeys={["name"]}
      columns={[
        { key: "name", label: "Name" },
        { key: "sortOrder", label: "Order" },
      ]}
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "sortOrder", label: "Order (optional)", type: "number", required: false }
      ]}
    />
  );
}
