"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function SiteConfigPage() {
  return (
    <EntityManager
      entity="site-config"
      title="Site Config"
      description="Manage the single public website configuration record."
      searchableKeys={["companyName", "heroHeading", "heroSubheading", "slogan", "contactEmail", "contactPhone"]}
      columns={[
        { key: "companyName", label: "Company" },
        { key: "heroHeading", label: "Hero Heading" },
        { key: "slogan", label: "Slogan" },
        { key: "contactEmail", label: "Email" },
        { key: "contactPhone", label: "Phone" }
      ]}
      fields={[
        { name: "companyName", label: "Company Name", type: "text" },
        { name: "heroHeading", label: "Hero Heading", type: "text" },
        { name: "heroSubheading", label: "Hero Subheading", type: "textarea" },
        { name: "slogan", label: "Slogan", type: "text" },
        { name: "contactEmail", label: "Contact Email", type: "email" },
        { name: "contactPhone", label: "Contact Phone", type: "text" }
      ]}
    />
  );
}