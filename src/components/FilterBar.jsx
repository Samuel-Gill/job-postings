export default function FilterBar({ filters, onChange, allTags }) {
  const update = (key, value) => onChange({ ...filters, [key]: value });
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-3 md:grid-cols-4">
        <input value={filters.search} onChange={(e) => update('search', e.target.value)} placeholder="Search title or keywords" className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-indigo-500 dark:border-slate-700" />
        <select value={filters.category} onChange={(e) => update('category', e.target.value)} className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"><option value="">All categories</option><option>Full-Time</option><option>Part-Time</option><option>Seasonal</option></select>
        <select value={filters.tag} onChange={(e) => update('tag', e.target.value)} className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"><option value="">All tags</option>{allTags.map((tag) => <option key={tag}>{tag}</option>)}</select>
        <select value={filters.status} onChange={(e) => update('status', e.target.value)} className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"><option value="">Any status</option><option value="active">Active</option><option value="closed">Closed</option></select>
      </div>
    </section>
  );
}
