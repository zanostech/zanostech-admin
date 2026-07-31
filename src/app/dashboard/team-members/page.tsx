"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function TeamMembersPage() {
  return (
    <EntityManager
      entity="team-members"
      title="Team Members"
      description="Manage your team directory."
      searchableKeys={["name", "designation", "bio"]}
      columns={[
        { key: "name", label: "Name" },
        { key: "designation", label: "Designation" },
        { key: "sortOrder", label: "Order" },
      ]}
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "designation", label: "Designation", type: "text", required: true },
        { name: "bio", label: "Bio", type: "textarea" },
        { name: "photoUrl", label: "Photo", type: "file", required: false },
        { name: "socialLinks", label: "Social Links (JSON)", type: "textarea", help: "Provide a valid JSON object." },
        { name: "sortOrder", label: "Order", type: "number", required: true }
      ]}
    />
  );
}
