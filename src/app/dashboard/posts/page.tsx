"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function PostsPage() {
  return (
    <EntityManager
      entity="posts"
      title="Posts"
      description="Manage blog posts, content, and publishing status."
      searchableKeys={["title", "content", "author", "category", "tags"]}
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "isPublished", label: "Published", render: (record) => record.isPublished ? "Yes" : "No" },
        { key: "createdAt", label: "Created", render: (record) => record.createdAt ? new Date(record.createdAt).toLocaleDateString() : "-" }
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "content", label: "Content", type: "textarea", required: true },
        { name: "coverImageUrl", label: "Cover Image (optional)", type: "file", required: false },
        { name: "link", label: "Link (optional)", type: "url", required: false },
        { name: "author", label: "Author (optional)", type: "text", required: false },
        { name: "category", label: "Category (optional)", type: "text", required: false },
        { name: "tags", label: "Tags (optional)", type: "string-array", required: false },
        { name: "isPublished", label: "Published (optional)", type: "checkbox", required: false }
      ]}
    />
  );
}
