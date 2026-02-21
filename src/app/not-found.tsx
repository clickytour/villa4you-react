import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F2B46] via-[#152f4a] to-[#1a3d5c]">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 800 600" fill="none">
          <circle cx="200" cy="150" r="300" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <circle cx="600" cy="450" r="250" stroke="white" strokeWidth="0.5" opacity="0.2" />
          <path d="M0 300 Q200 250 400 300 T800 300" stroke="white" strokeWidth="0.5" opacity="0.15" />
          <path d="M0 350 Q200 300 400 350 T800 350" stroke="white" strokeWidth="0.5" opacity="0.1" />
        </svg>
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto py-20">
        {/* 404 number */}
        <div className="relative inline-block">
          <span className="text-[140px] sm:text-[180px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl sm:text-7xl font-bold text-white">404</span>
          </div>
        </div>

        {/* Villa icon */}
        <div className="mt-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
        </div>

        <h1 className="mt-6 text-2xl sm:text-3xl font-semibold text-white">
          This page couldn&apos;t be found
        </h1>
        <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find what you need.
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0F2B46] hover:bg-slate-100 transition shadow-lg">
            Back to Homepage
          </Link>
          <Link href="/search" className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition backdrop-blur-sm">
            Search Villas
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/for-guests" className="text-slate-400 hover:text-white transition">For Guests</Link>
          <span className="text-slate-600">|</span>
          <Link href="/for-owners" className="text-slate-400 hover:text-white transition">For Owners</Link>
          <span className="text-slate-600">|</span>
          <Link href="/tools" className="text-slate-400 hover:text-white transition">Tools</Link>
          <span className="text-slate-600">|</span>
          <Link href="/support" className="text-slate-400 hover:text-white transition">Support</Link>
        </div>
      </div>
    </section>
  );
}
