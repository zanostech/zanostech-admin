"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function ProjectsPage() {
  return (
    <EntityManager
      entity="projects"
      title="Projects"
      description="Manage portfolio projects, thumbnails, technology stacks, ordering, and featured status."
      searchableKeys={["title", "description", "techStack", "caseStudy", "liveLink", "projectType"]}
      columns={[
        { key: "title", label: "Title" },
        { key: "techStack", label: "Tech Stack", render: (record) => record.techStack?.join(", ") || "-" },
        { key: "projectType", label: "Type", render: (record) => record.projectType?.join(", ") || "-" },
        { key: "isFeatured", label: "Featured", render: (record) => record.isFeatured ? "Yes" : "No" },
        { key: "order", label: "Order" },
        { key: "createdAt", label: "Created", render: (record) => record.createdAt ? new Date(record.createdAt).toLocaleDateString() : "-" }
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "thumbnail", label: "Thumbnail", type: "file", required: false, help: "Upload field expected by backend: thumbnail" },
        { name: "techStack", label: "Tech Stack", type: "text", required: true, placeholder: "Next.js, Node.js, PostgreSQL", help: "Separate values with commas." },
        { 
          name: "projectType", 
          label: "Project Type", 
          type: "select", 
          required: true, 
          options: [
            { label: "Web Application", value: "WEB" },
            { label: "Mobile Application", value: "MOBILE" },
            { label: "CMS", value: "CMS" },
            { label: "CRM", value: "CRM" },
            { label: "UI/UX Design", value: "UI_UX" },
            { label: "Video Editing", value: "VIDEO" },
          ] 
        },
        { name: "caseStudy", label: "Case Study", type: "textarea", required: true },
        { name: "liveLink", label: "Live Link", type: "text", required: true },
        { name: "order", label: "Order", type: "number", required: true },
        { name: "isFeatured", label: "Featured", type: "checkbox" }
      ]}
    />
  );
}