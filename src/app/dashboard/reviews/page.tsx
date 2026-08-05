"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function ReviewsPage() {
  return (
    <EntityManager
      entity="reviews"
      title="Reviews"
      description="Manage client reviews, ratings, avatars, and featured display."
      searchableKeys={["clientName", "designation", "company", "reviewText", "rating"]}
      columns={[
        { key: "clientName", label: "Client" },
        { key: "designation", label: "Designation" },
        { key: "company", label: "Company" },
        { key: "rating", label: "Rating" },
        { key: "isFeatured", label: "Featured", render: (record) => record.isFeatured ? "Yes" : "No" }
      ]}
      fields={[
        { name: "clientName", label: "Client Name", type: "text", required: true },
        { name: "designation", label: "Designation", type: "text", required: true },
        { name: "company", label: "Company (optional)", type: "text", required: false },
        { name: "avatar", label: "Avatar (optional)", type: "file", required: false, help: "Upload field expected by backend: avatar" },
        { name: "reviewText", label: "Review Text", type: "textarea", required: true },
        { name: "rating", label: "Rating (optional)", type: "number", required: false },
        { name: "isFeatured", label: "Featured (optional)", type: "checkbox", required: false },
        { name: "order", label: "Order (optional)", type: "number", required: false }
      ]}
    />
  );
}