/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { ChevronLeft, ChevronRight, Eye, Pencil, Plus, Search, Trash2, X, ChevronDown } from "lucide-react";
import Swal from 'sweetalert2';
import { createEntity, deleteEntity, listEntity, updateEntity } from "@/services/dashboard/entityService";
import type { EntityName, EntityRecord } from "@/types";

type FieldType = "text" | "email" | "number" | "textarea" | "checkbox" | "file" | "select" | "url";

type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  help?: string;
};

type ColumnConfig = {
  key: string;
  label: string;
  render?: (record: any) => React.ReactNode;
};

type EntityManagerProps = {
  entity: EntityName;
  title: string;
  description: string;
  columns: ColumnConfig[];
  fields: FieldConfig[];
  searchableKeys: string[];
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
};

const pageSizeOptions = [5, 10, 20];

const valueAt = (record: any, key: string) => key.split(".").reduce((acc, item) => acc?.[item], record);
const displayValue = (value: unknown) => {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value === null || value === undefined || value === "") return "-";
  return String(value);
};

const initialForm = (fields: FieldConfig[], record?: any) => {
  const values: Record<string, any> = {};
  fields.forEach((field) => {
    if (field.type === "file") return;
    const current = record?.[field.name];
    if (field.name === "techStack" && Array.isArray(current)) values[field.name] = current.join(", ");
    else if (field.type === "checkbox") values[field.name] = Boolean(current);
    else values[field.name] = current ?? "";
  });
  return values;
};

function FormModal({
  title,
  fields,
  record,
  onClose,
  onSubmit,
  submitting
}: {
  title: string;
  fields: FieldConfig[];
  record?: any;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  submitting: boolean;
}) {
  const [values, setValues] = useState<Record<string, any>>(() => initialForm(fields, record));

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    fields.forEach((field) => {
      if (field.type === "checkbox") {
        formData.set(field.name, values[field.name] ? "true" : "false");
      }
    });
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <div className="max-h-full w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-bold text-emerald-950">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" type="button" title="Close">
            <X size={18} />
          </button>
        </div>
        <form autoComplete="off" onSubmit={submit} className="grid gap-4 p-5">
          {fields.map((field) => {
            const common = "mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-800";
            return (
              <label key={field.name} className="flex flex-col justify-end">
                <span className="text-sm font-semibold text-gray-700">{field.label}</span>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    required={field.required}
                    value={values[field.name] ?? ""}
                    onChange={(event) => setValues((prev) => ({ ...prev, [field.name]: event.target.value }))}
                    placeholder={field.placeholder}
                    rows={4}
                    className={common}
                  />
                ) : field.type === "checkbox" ? (
                  <span className="mt-2 flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-3">
                    <input
                      name={field.name}
                      type="checkbox"
                      checked={Boolean(values[field.name])}
                      onChange={(event) => setValues((prev) => ({ ...prev, [field.name]: event.target.checked }))}
                    />
                    <span className="text-sm text-gray-600">Enabled</span>
                  </span>
                ) : field.type === "select" ? (
                  <div className="relative w-full">
                    <select
                      name={field.name}
                      required={field.required}
                      value={values[field.name] ?? ""}
                      onChange={(event) => setValues((prev) => ({ ...prev, [field.name]: event.target.value }))}
                      className={`${common} appearance-none pr-10`}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                ) : (
                  <input
                    name={field.name}
                    type={field.type}
                    required={field.required && !record}
                    value={field.type === "file" ? undefined : values[field.name] ?? ""}
                    onChange={field.type === "file" ? undefined : (event) => setValues((prev) => ({ ...prev, [field.name]: event.target.value }))}
                    placeholder={field.placeholder}
                    className={common}
                  />
                )}
                {field.help && <span className="mt-1 block text-xs text-gray-500">{field.help}</span>}
              </label>
            );
          })}
          <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">Cancel</button>
            <button disabled={submitting} className="admin-gradient-btn rounded-lg px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DetailModal({ record, onClose }: { record: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <div className="max-h-full w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-bold text-emerald-950">Details</h3>
          <button onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" type="button" title="Close">
            <X size={18} />
          </button>
        </div>
        <div className="grid gap-3 p-5 md:grid-cols-2">
          {Object.entries(record).map(([key, value]) => (
            <div key={key} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-bold uppercase text-gray-400">{key}</p>
              {typeof value === "string" && value.startsWith("http") ? (
                <a href={value} target="_blank" className="mt-1 block break-words text-sm font-semibold text-emerald-800" rel="noreferrer">{value}</a>
              ) : (
                <p className="mt-1 break-words text-sm text-gray-700">{displayValue(value)}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EntityManager({
  entity,
  title,
  description,
  columns,
  fields,
  searchableKeys,
  canCreate = true,
  canEdit = true,
  canDelete = true
}: EntityManagerProps) {
  const [records, setRecords] = useState<EntityRecord[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const [viewing, setViewing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const load = () => {
    setLoading(true);
    startTransition(async () => {
      const result = await listEntity(entity);
      if (result.success) {
        setRecords(result.data ?? []);
        setMessage("");
      } else {
        setMessage(result.message);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, [entity]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return records;
    return records.filter((record: any) =>
      searchableKeys.some((key) => displayValue(valueAt(record, key)).toLowerCase().includes(needle))
    );
  }, [records, query, searchableKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, pageSize]);

  const save = (formData: FormData, record?: any) => {
    setMessage("");
    Swal.fire({ title: 'Saving...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    startTransition(async () => {
      const result = record ? await updateEntity(entity, record.id, formData) : await createEntity(entity, formData);
      if (result.success) {
        Swal.fire('Success!', result.message, 'success');
        setCreating(false);
        setEditing(null);
        setQuery("");
        load();
      } else {
        Swal.fire('Error!', result.message, 'error');
      }
    });
  };

  const remove = (record: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete ${record.title || record.clientName || record.platform || record.companyName || record.name || "this item"}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#064e3b',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setMessage("");
        Swal.fire({ title: 'Deleting...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        startTransition(async () => {
          const res = await deleteEntity(entity, record.id);
          if (res.success) {
            Swal.fire('Deleted!', res.message, 'success');
            setQuery("");
            load();
          } else {
            Swal.fire('Error!', res.message, 'error');
          }
        });
      }
    });
  };

  return (
    <div className="space-y-5">
      <section className="admin-card p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-emerald-950">{title}</h2>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </div>
          {canCreate && (
            <button onClick={() => setCreating(true)} className="admin-gradient-btn inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold text-white">
              <Plus size={16} /> Create
            </button>
          )}
        </div>
        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="relative block w-full md:max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="searchQuery"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search..."
              className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm outline-none focus:border-emerald-800"
            />
          </label>
          <div className="relative">
            <select value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))} className="h-10 w-full appearance-none rounded-lg border border-gray-200 pl-3 pr-10 text-sm outline-none focus:border-emerald-800">
              {pageSizeOptions.map((size) => <option key={size} value={size}>{size} / page</option>)}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {message && <div className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900">{message}</div>}
      </section>

      <section className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-emerald-950 text-white">
              <tr>
                {columns.map((column) => <th key={column.key} className="px-4 py-3 font-bold">{column.label}</th>)}
                <th className="px-4 py-3 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={columns.length + 1} className="px-4 py-10 text-center text-gray-500">Loading...</td></tr>
              ) : paginated.length ? paginated.map((record: any) => (
                <tr key={record.id} className="hover:bg-emerald-50/40">
                  {columns.map((column) => (
                    <td key={column.key} className="max-w-[280px] px-4 py-3 align-top text-gray-700">
                      <div className="line-clamp-2">{column.render ? column.render(record) : displayValue(valueAt(record, column.key))}</div>
                    </td>
                  ))}
                  <td className="px-4 py-3 align-top">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setViewing(record)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-emerald-800 hover:bg-emerald-50" title="View details"><Eye size={16} /></button>
                      {canEdit && <button onClick={() => setEditing(record)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-blue-700 hover:bg-blue-50" title="Edit"><Pencil size={16} /></button>}
                      {canDelete && <button onClick={() => remove(record)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-red-600 hover:bg-red-50" title="Delete"><Trash2 size={16} /></button>}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={columns.length + 1} className="px-4 py-10 text-center text-gray-500">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-sm text-gray-600">
          <span>Showing {paginated.length ? (currentPage - 1) * pageSize + 1 : 0}-{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</span>
          <div className="flex items-center gap-2">
            <button disabled={currentPage <= 1} onClick={() => setPage((prev) => Math.max(1, prev - 1))} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40" title="Previous"><ChevronLeft size={16} /></button>
            <span className="font-bold text-emerald-950">{currentPage} / {totalPages}</span>
            <button disabled={currentPage >= totalPages} onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40" title="Next"><ChevronRight size={16} /></button>
          </div>
        </div>
      </section>

      {creating && <FormModal title={`Create ${title}`} fields={fields} onClose={() => setCreating(false)} onSubmit={(formData) => save(formData)} submitting={isPending} />}
      {editing && <FormModal title={`Edit ${title}`} fields={fields} record={editing} onClose={() => setEditing(null)} onSubmit={(formData) => save(formData, editing)} submitting={isPending} />}
      {viewing && <DetailModal record={viewing} onClose={() => setViewing(null)} />}
    </div>
  );
}

