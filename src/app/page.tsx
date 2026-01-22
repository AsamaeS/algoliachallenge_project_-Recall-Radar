import Search from "@/components/Search";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Official Header Bar */}
      <header className="bg-brand-primary text-white py-4 px-6 gov-shadow">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-brand-accent" />
            <span className="text-2xl font-bold tracking-tight">Recall Radar</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Official Database Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Is your product safe?
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Stay informed about dangerous consumer products. Search brand, model, or batch numbers
              against official recall databases.
            </p>
          </div>

          {/* Search Component */}
          <Search />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm text-center md:text-left">
            <div>© {new Date().getFullYear()} Recall Radar. Consumer Product Safety Intelligence.</div>
            <div className="text-xs mt-1 opacity-75">Data sources: RAPEX (EU), DGCCRF (FR)</div>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-600">
            <span className="hover:text-brand-accent cursor-not-allowed opacity-50">Privacy Policy</span>
            <span className="hover:text-brand-accent cursor-not-allowed opacity-50">Terms of Service</span>
            <span className="hover:text-brand-accent cursor-not-allowed opacity-50">Contact Authorities</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
