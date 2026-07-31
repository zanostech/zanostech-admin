"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function FaqsPage() {
  return (
    <EntityManager
      entity="faqs"
      title="FAQs"
      description="Manage frequently asked questions."
      searchableKeys={["question", "answer"]}
      columns={[
        { key: "question", label: "Question" },
        { key: "sortOrder", label: "Order" },
      ]}
      fields={[
        { name: "question", label: "Question", type: "text", required: true },
        { name: "answer", label: "Answer", type: "textarea", required: true },
        { name: "sortOrder", label: "Order", type: "number", required: true }
      ]}
    />
  );
}
