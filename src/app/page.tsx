"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-[#e8edf5] overflow-hidden relative">
      {/* Custom Fonts & Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

        :root {
          --font-serif: 'Libre Baskerville', Georgia, serif;
          --font-sans: 'Inter', system-ui, sans-serif;
          --blue-50: #eff6ff;
          --blue-100: #dbeafe;
          --blue-200: #bfdbfe;
          --blue-300: #93c5fd;
          --blue-400: #60a5fa;
          --blue-500: #3b82f6;
          --blue-600: #2563eb;
          --blue-700: #1d4ed8;
          --blue-800: #1e40af;
          --blue-900: #1e3a8a;
          --slate-50: #f8fafc;
          --slate-400: #94a3b8;
          --slate-500: #64748b;
          --slate-600: #475569;
          --slate-800: #1e293b;
          --slate-900: #0f172a;
        }

        .font-serif {
          font-family: var(--font-serif);
        }

        .font-sans {
          font-family: var(--font-sans);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .line-blue {
          width: 40px;
          height: 2px;
          background: var(--blue-500);
        }
      `}</style>

      {/* Subtle gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-1/2 h-1/2 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at top right, rgba(59, 130, 246, 0.15) 0%, transparent 60%)'
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at bottom left, rgba(30, 64, 175, 0.1) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/5">
        <nav className="max-w-5xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
          <div
            className="opacity-0"
            style={{ animation: mounted ? 'fadeIn 0.6s ease-out 0.1s forwards' : 'none' }}
          >
            <span className="font-serif text-lg text-white">Jason Thelin</span>
          </div>

          <div
            className="flex items-center gap-6 opacity-0"
            style={{ animation: mounted ? 'fadeIn 0.6s ease-out 0.2s forwards' : 'none' }}
          >
            <a
              href="https://www.linkedin.com/in/jasonthelin/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-slate-400 hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
            <SignedOut>
              <Link
                href="/sign-in"
                className="font-sans text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="font-sans text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
              >
                Dashboard
              </Link>
            </SignedIn>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="max-w-5xl mx-auto px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="max-w-3xl">
            {/* Overline */}
            <div
              className="flex items-center gap-3 mb-8 opacity-0"
              style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 0.3s forwards' : 'none' }}
            >
              <div className="line-blue" />
              <span className="font-sans text-xs tracking-widest uppercase text-blue-400">
                Software & Ventures
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight opacity-0"
              style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 0.4s forwards' : 'none' }}
            >
              Jason Thelin
            </h1>

            {/* Bio - Factual, third-person */}
            <p
              className="font-sans text-lg text-slate-400 leading-relaxed mb-8 opacity-0"
              style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 0.5s forwards' : 'none' }}
            >
              Co-founder of{" "}
              <a
                href="https://solutionstream.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                SolutionStream
              </a>
              , a Utah-based custom software development company he started in 1996.
              For nearly three decades, he has helped companies move from product idea
              to working solutions.
            </p>

            {/* CTA */}
            <div
              className="flex flex-wrap gap-4 opacity-0"
              style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 0.6s forwards' : 'none' }}
            >
              <a
                href="https://www.linkedin.com/in/jasonthelin/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn
              </a>
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="font-sans text-sm px-6 py-3 border border-slate-700 hover:border-blue-500/50 text-slate-300 hover:text-white rounded transition-colors"
                >
                  Sign In
                </Link>
              </SignedOut>
            </div>
          </div>
        </section>

        {/* Ventures Section */}
        <section className="border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <div
              className="flex items-center gap-3 mb-12 opacity-0"
              style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 0.7s forwards' : 'none' }}
            >
              <div className="line-blue" />
              <span className="font-sans text-xs tracking-widest uppercase text-blue-400">
                Ventures
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {[
                {
                  name: "SolutionStream",
                  role: "Co-Founder",
                  year: "1996",
                  description: "Custom software development company based in Lehi, Utah. Builds web and mobile applications for companies across industries.",
                  url: "https://solutionstream.com",
                  delay: "0.8s"
                },
                {
                  name: "Kahoa",
                  role: "Co-Founder",
                  year: null,
                  description: "Enterprise-class custom software development, driving innovation in complex application architecture.",
                  url: null,
                  delay: "0.9s"
                },
                {
                  name: "Kartiva",
                  role: "Owner",
                  year: null,
                  description: "Video commerce SaaS platform that helps brands maximize product sales through influencer partnerships.",
                  url: null,
                  delay: "1s"
                },
                {
                  name: "East Mountain Holdings",
                  role: "Founder",
                  year: null,
                  description: "Property holdings and real estate investment company.",
                  url: null,
                  delay: "1.1s"
                }
              ].map((venture) => (
                <div
                  key={venture.name}
                  className="p-6 border border-white/5 rounded-lg hover:border-blue-500/20 transition-colors opacity-0"
                  style={{ animation: mounted ? `fadeInUp 0.8s ease-out ${venture.delay} forwards` : 'none' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      {venture.url ? (
                        <a
                          href={venture.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-serif text-xl text-white hover:text-blue-400 transition-colors"
                        >
                          {venture.name}
                        </a>
                      ) : (
                        <h3 className="font-serif text-xl text-white">{venture.name}</h3>
                      )}
                      <p className="font-sans text-sm text-slate-500 mt-1">
                        {venture.role}{venture.year && ` · ${venture.year}`}
                      </p>
                    </div>
                  </div>
                  <p className="font-sans text-sm text-slate-400 leading-relaxed">
                    {venture.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Background Section */}
        <section className="border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div
                className="opacity-0"
                style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 1.2s forwards' : 'none' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="line-blue" />
                  <span className="font-sans text-xs tracking-widest uppercase text-blue-400">
                    Background
                  </span>
                </div>
                <p className="font-sans text-slate-400 leading-relaxed mb-4">
                  BYU graduate based in Lehi, Utah. Started his career as a Java Developer
                  at Nu Skin Enterprises in 1995 before founding SolutionStream the following year.
                </p>
                <p className="font-sans text-slate-400 leading-relaxed">
                  In 2008, he helped establish the Young Founder&apos;s Group at BYU to connect
                  successful entrepreneurs with student businesses. He has served on BYU&apos;s
                  Entrepreneurship Founders advisory board since 2007, mentoring students
                  in starting and operating ventures.
                </p>
              </div>

              <div
                className="opacity-0"
                style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 1.3s forwards' : 'none' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="line-blue" />
                  <span className="font-sans text-xs tracking-widest uppercase text-blue-400">
                    Orchestrator
                  </span>
                </div>
                <p className="font-sans text-slate-400 leading-relaxed mb-6">
                  The Thelin Orchestrator is an AI-powered system for capturing insights
                  from daily conversations, developing book content, and tracking business
                  opportunities.
                </p>
                <SignedOut>
                  <Link
                    href="/sign-in"
                    className="font-sans text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2"
                  >
                    Sign in to access
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link
                    href="/dashboard"
                    className="font-sans text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2"
                  >
                    Go to Dashboard
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </SignedIn>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-sans text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Jason Thelin
            </span>
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/jasonthelin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://solutionstream.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-slate-500 hover:text-blue-400 transition-colors"
              >
                SolutionStream
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
