import { useEffect, useState } from 'react';

const emptyForm = { title: '', description: '', category: 'Full-Time', tags: '', postedBy: '', email: '', phone: '', location: '' };

export default function JobForm({ open, job, user, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (job) setForm({ ...emptyForm, ...job, tags: job.tags?.join(', ') || '' });
    else setForm({ ...emptyForm, postedBy: user?.displayName || '', email: user?.email || '' });
  }, [job, user, open]);

  if (!open) return null;
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    const payload = { ...form, tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean) };
    try { await onSubmit(payload); onClose(); } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 p-0 backdrop-blur-sm sm:p-6">
      <div className="mx-auto flex h-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl dark:bg-slate-900 sm:h-auto sm:max-h-[92vh] sm:rounded-3xl">
        <div className="border-b border-slate-200 p-5 dark:border-slate-800"><h2 className="text-2xl font-black">{job ? 'Edit job' : 'Post a job'}</h2><p className="text-sm text-slate-500">Share clear details so applicants can reach you.</p></div>
        <form onSubmit={submit} className="grid flex-1 gap-4 overflow-y-auto p-5">
          <input required value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Title" className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
          <textarea required rows="5" value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Description" className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
          <select required value={form.category} onChange={(e) => update('category', e.target.value)} className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"><option>Full-Time</option><option>Part-Time</option><option>Seasonal</option></select>
          <input value={form.tags} onChange={(e) => update('tags', e.target.value)} placeholder="Tags, comma-separated" className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input required value={form.postedBy} onChange={(e) => update('postedBy', e.target.value)} placeholder="Posted by" className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
            <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="Email" className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
            <input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="Phone (optional)" className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
            <input value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="Location (optional)" className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
          </div>
          <div className="sticky bottom-0 -mx-5 mt-2 flex gap-3 border-t border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <button type="button" onClick={onClose} className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 font-bold dark:border-slate-700">Cancel</button>
            <button disabled={saving} className="flex-1 rounded-2xl bg-indigo-600 px-4 py-3 font-bold text-white disabled:opacity-60">{saving ? 'Saving...' : 'Save job'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
