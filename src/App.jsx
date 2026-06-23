import { useMemo, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import FilterBar from './components/FilterBar';
import JobCard from './components/JobCard';
import JobDetails from './components/JobDetails';
import JobForm from './components/JobForm';
import Navbar from './components/Navbar';
import { useJobs } from './hooks/useJobs';
import { adminEmails, auth, googleProvider } from './lib/firebase';

export default function App() {
  const { jobs, loading, addJob, updateJob, deleteJob } = useJobs();
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({ search: '', category: '', tag: '', status: '' });
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => onAuthStateChanged(auth, setUser), []);
  useEffect(() => document.documentElement.classList.toggle('dark', darkMode), [darkMode]);

  const isAdmin = adminEmails.includes(user?.email?.toLowerCase());
  const allTags = useMemo(() => [...new Set(jobs.flatMap((job) => job.tags || []))].sort(), [jobs]);
  const filteredJobs = useMemo(() => jobs.filter((job) => {
    const query = filters.search.toLowerCase();
    const text = `${job.title} ${job.description} ${(job.tags || []).join(' ')}`.toLowerCase();
    return (!query || text.includes(query)) && (!filters.category || job.category === filters.category) && (!filters.tag || job.tags?.includes(filters.tag)) && (!filters.status || job.status === filters.status);
  }), [jobs, filters]);

  const requireUser = (callback) => user ? callback() : setAuthOpen(true);
  const saveJob = async (payload) => {
    try {
      if (editingJob) { await updateJob(editingJob.id, payload); toast.success('Job updated'); }
      else { await addJob(payload, user); toast.success('Job created'); }
    } catch (error) { toast.error(error.message); }
  };
  const markClosed = async (job) => { await updateJob(job.id, { status: 'closed' }); toast.success('Job marked closed'); setSelectedJob(null); };
  const removeJob = async (job) => { await deleteJob(job.id); toast.success('Job deleted'); setSelectedJob(null); };

  return (
    <div className="min-h-screen">
      <Navbar user={user} isAdmin={isAdmin} darkMode={darkMode} onToggleDarkMode={() => setDarkMode((value) => !value)} onPostJob={() => requireUser(() => { setEditingJob(null); setFormOpen(true); })} onSignIn={() => setAuthOpen(true)} onSignOut={() => signOut(auth)} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-slate-950 p-6 text-white shadow-2xl shadow-indigo-600/20 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-200">Community-powered hiring</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">Find work and share local opportunities faster.</h1>
          <p className="mt-4 max-w-2xl text-indigo-100">Browse active and closed jobs, filter by fit, and manage your own posts with Firebase Auth permissions.</p>
        </section>
        <FilterBar filters={filters} onChange={setFilters} allTags={allTags} />
        {loading ? <p className="py-12 text-center text-slate-500">Loading jobs...</p> : <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filteredJobs.map((job) => <JobCard key={job.id} job={job} onSelect={setSelectedJob} />)}</section>}
        {!loading && filteredJobs.length === 0 && <p className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700">No jobs match your filters.</p>}
      </main>
      <JobForm open={formOpen} job={editingJob} user={user} onClose={() => { setFormOpen(false); setEditingJob(null); }} onSubmit={saveJob} />
      <JobDetails job={selectedJob} currentUser={user} isAdmin={isAdmin} onClose={() => setSelectedJob(null)} onEdit={(job) => { setEditingJob(job); setSelectedJob(null); setFormOpen(true); }} onMarkClosed={markClosed} onDelete={removeJob} />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      <Toaster position="bottom-center" />
    </div>
  );
}

function AuthModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handle = async (mode) => { try { mode === 'up' ? await createUserWithEmailAndPassword(auth, email, password) : await signInWithEmailAndPassword(auth, email, password); toast.success('Signed in'); onClose(); } catch (error) { toast.error(error.message); } };
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4"><div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900"><h2 className="text-2xl font-black">Sign in</h2><button onClick={async () => { await signInWithPopup(auth, googleProvider); onClose(); }} className="mt-5 w-full rounded-2xl bg-slate-950 px-4 py-3 font-bold text-white dark:bg-white dark:text-slate-950">Continue with Google</button><div className="my-5 h-px bg-slate-200 dark:bg-slate-800" /><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="mb-3 w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" /><input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="mb-4 w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" /><div className="grid gap-3 sm:grid-cols-2"><button onClick={() => handle('in')} className="rounded-2xl bg-indigo-600 px-4 py-3 font-bold text-white">Sign in</button><button onClick={() => handle('up')} className="rounded-2xl border border-slate-200 px-4 py-3 font-bold dark:border-slate-700">Create account</button></div><button onClick={onClose} className="mt-4 w-full text-sm font-bold text-slate-500">Cancel</button></div></div>;
}
