"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function InquiriesPage() {
  return (
    <EntityManager
      entity="inquiries"
      title="Inquiries"
      description="View submitted contact inquiries and update their status."
      searchableKeys={["name", "email", "subject", "message", "status", "company", "website", "budget", "services"]}
      canCreate={false}
      canDelete={false}
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "company", label: "Company", render: (record) => record.company || "-" },
        { key: "subject", label: "Subject" },
        { key: "status", label: "Status" },
        { key: "createdAt", label: "Created", render: (record) => record.createdAt ? new Date(record.createdAt).toLocaleDateString() : "-" }
      ]}
      fields={[
        { name: "status", label: "Status", type: "select", required: true, options: [
          { label: "Unread", value: "UNREAD" },
          { label: "Read", value: "READ" },
          { label: "Replied", value: "REPLIED" }
        ] }
      ]}
      detailRender={(record) => (
        <div className="space-y-4 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-bold uppercase text-gray-400">Name</p>
              <p className="mt-1 font-semibold text-gray-800">{record.name}</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-bold uppercase text-gray-400">Email</p>
              <a href={`mailto:${record.email}`} className="mt-1 block truncate font-semibold text-emerald-700 hover:underline">{record.email}</a>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-bold uppercase text-gray-400">Company</p>
              <p className="mt-1 font-semibold text-gray-800">{record.company || "-"}</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-bold uppercase text-gray-400">Website</p>
              {record.website ? (
                <a href={record.website.startsWith('http') ? record.website : `https://${record.website}`} target="_blank" className="mt-1 block truncate font-semibold text-emerald-700 hover:underline" rel="noreferrer">{record.website}</a>
              ) : (
                <p className="mt-1 font-semibold text-gray-800">-</p>
              )}
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-bold uppercase text-gray-400">Budget</p>
              <p className="mt-1 font-semibold text-gray-800">{record.budget || "-"}</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-bold uppercase text-gray-400">Status</p>
              <span className={`mt-2 inline-block rounded-md px-2 py-1 text-xs font-bold ${record.status === 'UNREAD' ? 'bg-red-100 text-red-700' : record.status === 'READ' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{record.status}</span>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
            <p className="text-xs font-bold uppercase text-gray-400">Services Needed</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {record.services && record.services.length > 0 ? record.services.map((s: string) => (
                <span key={s} className="rounded bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">{s}</span>
              )) : <span className="text-sm text-gray-500">None selected</span>}
            </div>
          </div>

          <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
            <p className="text-xs font-bold uppercase text-gray-400">Subject</p>
            <p className="mt-1 font-bold text-emerald-950">{record.subject || "No Subject"}</p>
            <p className="mt-4 text-xs font-bold uppercase text-gray-400">Message</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{record.message}</p>
          </div>
        </div>
      )}
    />
  );
}