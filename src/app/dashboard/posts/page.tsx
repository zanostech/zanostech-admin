"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function PostsPage() {
  return (
    <EntityManager
      entity="posts"
      title="Posts"
      description="Manage blog posts, content, and publishing status."
      searchableKeys={["title", "slug", "content", "author", "category", "tags"]}
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "isPublished", label: "Published", render: (record) => record.isPublished ? "Yes" : "No" },
        { key: "createdAt", label: "Created", render: (record) => record.createdAt ? new Date(record.createdAt).toLocaleDateString() : "-" }
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug", type: "text", required: true },
        { name: "content", label: "Content", type: "textarea", required: true },
        { name: "coverImageUrl", label: "Cover Image", type: "file", required: false },
        { name: "author", label: "Author", type: "text" },
        { name: "category", label: "Category", type: "text" },
        { name: "tags", label: "Tags", type: "text", placeholder: "tech, business", help: "Separate with commas." },
        { name: "isPublished", label: "Published", type: "checkbox" }
      ]}
    />
  );
}
