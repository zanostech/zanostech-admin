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
        { name: "bio", label: "Bio (optional)", type: "textarea", required: false },
        { name: "photoUrl", label: "Photo (optional)", type: "file", required: false },
        { name: "socialLinks", label: "Social Links (optional)", type: "string-array", required: false, help: "Add social media URLs one by one." },
        { name: "portfolioLink", label: "Portfolio Link (optional)", type: "text", required: false },
        { name: "sortOrder", label: "Order (optional)", type: "number", required: false }
      ]}
    />
  );
}
