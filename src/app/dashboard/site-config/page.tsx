"use client";

import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { getSiteConfig, updateSiteConfig } from "@/services/dashboard/siteConfigService";

export default function SiteConfigPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    heroHeading: "",
    heroSubheading: "",
    slogan: "",
    contactEmail: "",
    contactPhone: ""
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await getSiteConfig();
      if (res.success && res.data) {
        setFormData({
          companyName: res.data.companyName || "",
          heroHeading: res.data.heroHeading || "",
          heroSubheading: res.data.heroSubheading || "",
          slogan: res.data.slogan || "",
          contactEmail: res.data.contactEmail || "",
          contactPhone: res.data.contactPhone || ""
        });
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    Swal.fire({ title: 'Saving...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    
    const res = await updateSiteConfig(formData);
    
    if (res.success) {
      Swal.fire('Success!', 'Site configuration updated successfully.', 'success');
    } else {
      Swal.fire('Error!', res.message || 'Failed to update configuration.', 'error');
    }
    setSubmitting(false);
  };

  const common = "mt-1.5 w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20";

  return (
    <div className="space-y-5">
      <section className="admin-card p-5">
        <div>
          <h2 className="text-xl font-bold text-emerald-950">Site Configuration</h2>
          <p className="mt-1 text-sm text-gray-600">Update the global settings and information displayed on your public landing page.</p>
        </div>
      </section>

      <section className="admin-card p-5 max-w-4xl mx-auto">
        {loading ? (
          <div className="py-10 text-center text-gray-500 font-bold">Loading Configuration...</div>
        ) : (
          <form onSubmit={handleSubmit} autoComplete="off" className="grid gap-6">
            <label className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700">Company Name (optional)</span>
              <input name="companyName" value={formData.companyName} onChange={handleChange} className={common} />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700">Hero Heading (optional)</span>
              <input name="heroHeading" value={formData.heroHeading} onChange={handleChange} className={common} />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700">Hero Subheading (optional)</span>
              <textarea name="heroSubheading" rows={3} value={formData.heroSubheading} onChange={handleChange} className={common} />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700">Slogan (optional)</span>
              <input name="slogan" value={formData.slogan} onChange={handleChange} className={common} />
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">Contact Email (optional)</span>
                <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className={common} />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">Contact Phone (optional)</span>
                <input name="contactPhone" value={formData.contactPhone} onChange={handleChange} className={common} />
              </label>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button disabled={submitting} type="submit" className="admin-gradient-btn rounded-lg px-6 py-2.5 text-sm font-bold text-white disabled:opacity-60">
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}