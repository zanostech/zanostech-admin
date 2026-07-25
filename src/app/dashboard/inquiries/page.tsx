"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function InquiriesPage() {
  return (
    <EntityManager
      entity="inquiries"
      title="Inquiries"
      description="View submitted contact inquiries and update their status."
      searchableKeys={["name", "email", "subject", "message", "status"]}
      canCreate={false}
      canDelete={false}
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "subject", label: "Subject" },
        { key: "status", label: "Status" },
        { key: "createdAt", label: "Created", render: (record) => record.createdAt ? new Date(record.createdAt).toLocaleDateString() : "-" }
      ]}
      fields={[
        { name: "status", label: "Status", type: "select", required: true, options: [
          { label: "Unread", value: "UNREAD" },
          { label: "Read", value: "READ" },
          { label: "Replied", value: "REPLIED" }
        ] }
      ]}
    />
  );
}