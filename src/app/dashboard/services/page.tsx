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
        { name: "icon", label: "Icon Name", type: "text", help: "E.g., lucide-react icon name or URL." },
        { name: "price", label: "Price", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "whatsIncluded", label: "What is Included", type: "textarea", help: "Separate items with commas." },
        { name: "sortOrder", label: "Order", type: "number", required: true }
      ]}
    />
  );
}
