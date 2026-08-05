"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function ServicesPage() {
  return (
    <EntityManager
      entity="services"
      title="Services"
      description="Manage the services you offer."
      searchableKeys={["title", "description", "whatsIncluded"]}
      columns={[
        { key: "title", label: "Title" },
        { key: "price", label: "Price" },
        { key: "sortOrder", label: "Order" },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "icon", label: "Icon (optional)", type: "file", required: false, help: "Upload field expected by backend: icon" },
        { name: "price", label: "Price (optional)", type: "text", required: false },
        { name: "description", label: "Description (optional)", type: "textarea", required: false },
        { name: "whatsIncluded", label: "What is Included (optional)", type: "string-array", required: false },
        { name: "sortOrder", label: "Order (optional)", type: "number", required: false }
      ]}
    />
  );
}
