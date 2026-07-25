"use client";

import EntityManager from "@/components/admin/EntityManager";

const platforms = ["WHATSAPP", "FACEBOOK", "LINKEDIN", "TWITTER", "INSTAGRAM", "TIKTOK"].map((platform) => ({ label: platform, value: platform }));

export default function SocialLinksPage() {
  return (
    <EntityManager
      entity="social-links"
      title="Social Links"
      description="Manage active social media and contact links."
      searchableKeys={["platform", "url", "isActive"]}
      columns={[
        { key: "platform", label: "Platform" },
        { key: "url", label: "URL" },
        { key: "isActive", label: "Active", render: (record) => record.isActive ? "Yes" : "No" },
        { key: "createdAt", label: "Created", render: (record) => record.createdAt ? new Date(record.createdAt).toLocaleDateString() : "-" }
      ]}
      fields={[
        { name: "platform", label: "Platform", type: "select", required: true, options: platforms },
        { name: "url", label: "URL", type: "text", required: true },
        { name: "isActive", label: "Active", type: "checkbox" }
      ]}
    />
  );
}