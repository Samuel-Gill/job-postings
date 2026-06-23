export default function JobDetails({ job, currentUser, isAdmin, onClose, onEdit, onMarkClosed, onDelete }) {
  if (!job) return null;
  const isOwner = currentUser?.uid === job.userId;
  const closed = job.status === 'closed';
  return (
    <div className="fixed inset-0 z-40 bg-slate-950/60 p-0 backdrop-blur-sm sm:p-6">
      <div className="mx-auto h-full max-w-3xl overflow-y-auto bg-white p-5 shadow-2xl dark:bg-slate-900 sm:h-auto sm:max-h-[92vh] sm:rounded-3xl sm:p-8">
        <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-wider text-indigo-600">{job.category}</p><h2 className="mt-2 text-3xl font-black tracking-tight">{job.title}</h2></div><button onClick={onClose} className="rounded-full border border-slate-200 px-4 py-2 font-bold dark:border-slate-700">Close</button></div>
        {closed && <div className="mt-5 rounded-2xl bg-rose-100 p-4 font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300">No Longer Available</div>}
        <p className="mt-6 whitespace-pre-wrap leading-7 text-slate-700 dark:text-slate-300">{job.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">{job.tags?.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold dark:bg-slate-800">#{tag}</span>)}</div>
        <dl className="mt-8 grid gap-4 rounded-3xl bg-slate-50 p-5 dark:bg-slate-950 sm:grid-cols-2"><div><dt className="text-xs font-bold uppercase text-slate-500">Posted by</dt><dd className="font-semibold">{job.postedBy}</dd></div><div><dt className="text-xs font-bold uppercase text-slate-500">Email</dt><dd>{closed ? 'Unavailable' : job.email}</dd></div>{job.phone && <div><dt className="text-xs font-bold uppercase text-slate-500">Phone</dt><dd>{closed ? 'Unavailable' : job.phone}</dd></div>}{job.location && <div><dt className="text-xs font-bold uppercase text-slate-500">Location</dt><dd>{job.location}</dd></div>}</dl>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">{isOwner && <button onClick={() => onEdit(job)} className="rounded-2xl bg-indigo-600 px-4 py-3 font-bold text-white">Edit</button>}{isOwner && !closed && <button onClick={() => onMarkClosed(job)} className="rounded-2xl bg-amber-500 px-4 py-3 font-bold text-white">Mark as Closed</button>}{isAdmin && <button onClick={() => onDelete(job)} className="rounded-2xl bg-rose-600 px-4 py-3 font-bold text-white">Delete</button>}</div>
      </div>
    </div>
  );
}
