"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function ProjectsPage() {
  return (
    <EntityManager
      entity="projects"
      title="Projects"
      description="Manage portfolio projects, thumbnails, technology stacks, ordering, and featured status."
      searchableKeys={["title", "description", "techStack", "caseStudy", "liveLink"]}
      columns={[
        { key: "title", label: "Title" },
        { key: "techStack", label: "Tech Stack", render: (record) => record.techStack?.join(", ") || "-" },
        { key: "isFeatured", label: "Featured", render: (record) => record.isFeatured ? "Yes" : "No" },
        { key: "order", label: "Order" },
        { key: "createdAt", label: "Created", render: (record) => record.createdAt ? new Date(record.createdAt).toLocaleDateString() : "-" }
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "thumbnail", label: "Thumbnail", type: "file", help: "Upload field expected by backend: thumbnail" },
        { name: "techStack", label: "Tech Stack", type: "text", placeholder: "Next.js, Node.js, PostgreSQL", help: "Separate values with commas." },
        { name: "caseStudy", label: "Case Study", type: "textarea" },
        { name: "liveLink", label: "Live Link", type: "text" },
        { name: "order", label: "Order", type: "number" },
        { name: "isFeatured", label: "Featured", type: "checkbox" }
      ]}
    />
  );
}