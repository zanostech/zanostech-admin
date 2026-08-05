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
        { name: "thumbnail", label: "Thumbnail (optional)", type: "file", required: false, help: "Upload field expected by backend: thumbnail" },
        { name: "techStack", label: "Tech Stack (optional)", type: "string-array", required: false },
        { 
          name: "projectType", 
          label: "Project Type (optional)", 
          type: "select", 
          required: false, 
          options: [
            { label: "Web Application", value: "WEB" },
            { label: "Mobile Application", value: "MOBILE" },
            { label: "CMS", value: "CMS" },
            { label: "CRM", value: "CRM" },
            { label: "UI/UX Design", value: "UI_UX" },
            { label: "Video Editing", value: "VIDEO" },
          ] 
        },
        { name: "caseStudy", label: "Case Study (optional)", type: "textarea", required: false },
        { name: "liveLink", label: "Live Link (optional)", type: "text", required: false },
        { name: "appStoreLink", label: "App Store Link (optional)", type: "text", required: false },
        { name: "playStoreLink", label: "Play Store Link (optional)", type: "text", required: false },
        { name: "order", label: "Order (optional)", type: "number", required: false },
        { name: "isFeatured", label: "Featured (optional)", type: "checkbox", required: false }
      ]}
    />
  );
}