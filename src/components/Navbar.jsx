import { BriefcaseBusiness, Moon, Sun } from 'lucide-react';

export default function Navbar({ user, isAdmin, onPostJob, onSignIn, onSignOut, darkMode, onToggleDarkMode }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="rounded-2xl bg-indigo-600 p-2 text-white shadow-lg shadow-indigo-600/20"><BriefcaseBusiness size={22} /></div>
          <div>
            <p className="text-lg font-black tracking-tight">Community Jobs</p>
            <p className="hidden text-xs text-slate-500 sm:block">Local opportunities, posted by neighbors</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onToggleDarkMode} className="rounded-full border border-slate-200 p-3 dark:border-slate-700" aria-label="Toggle dark mode">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <>
              <button onClick={onPostJob} className="rounded-full bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700">Post Job</button>
              <button onClick={onSignOut} className="hidden rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900 sm:block">Sign out</button>
              <div className="hidden text-right text-xs text-slate-500 md:block"><p className="font-semibold text-slate-800 dark:text-slate-200">{user.displayName || user.email}</p>{isAdmin && <p className="text-indigo-600">Admin</p>}</div>
            </>
          ) : <button onClick={onSignIn} className="rounded-full bg-slate-950 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950">Sign in</button>}
        </div>
      </nav>
    </header>
  );
}
