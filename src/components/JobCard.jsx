const categoryColors = { 'Full-Time': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300', 'Part-Time': 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300', Seasonal: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' };

export default function JobCard({ job, onSelect }) {
  const closed = job.status === 'closed';
  return (
    <article onClick={() => onSelect(job)} className="group flex cursor-pointer flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${categoryColors[job.category]}`}>{job.category}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${closed ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-lime-100 text-lime-700 dark:bg-lime-950 dark:text-lime-300'}`}>{closed ? 'Closed' : 'Active'}</span>
      </div>
      <h3 className="text-xl font-black tracking-tight group-hover:text-indigo-600">{job.title}</h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{job.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">{job.tags?.slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">#{tag}</span>)}</div>
      <div className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800">Posted by <span className="font-bold text-slate-800 dark:text-slate-200">{job.postedBy}</span></div>
      {closed && <div className="mt-3 rounded-2xl bg-rose-50 px-3 py-2 text-center text-xs font-bold text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">No Longer Available</div>}
    </article>
  );
}
