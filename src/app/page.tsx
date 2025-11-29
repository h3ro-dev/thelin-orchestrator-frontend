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
          --blue-400: #60a5fa;
          --blue-500: #3b82f6;
          --blue-600: #2563eb;
          --slate-400: #94a3b8;
          --slate-500: #64748b;
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
        <section className="max-w-5xl mx-auto px-6 lg:px-8 pt-20 pb-20 lg:pt-28 lg:pb-24">
          <div className="max-w-3xl">
            {/* Overline */}
            <div
              className="flex items-center gap-3 mb-8 opacity-0"
              style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 0.3s forwards' : 'none' }}
            >
              <div className="line-blue" />
              <span className="font-sans text-xs tracking-widest uppercase text-blue-400">
                Software · Ventures · Community
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight opacity-0"
              style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 0.4s forwards' : 'none' }}
            >
              Jason Thelin
            </h1>

            {/* Bio */}
            <p
              className="font-sans text-lg text-slate-400 leading-relaxed mb-4 opacity-0"
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
              </a>{" "}
              (1996) and CEO of{" "}
              <a
                href="https://kahoa.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Kahoa
              </a>
              . For nearly three decades, he has helped companies move from product idea to
              working software solutions.
            </p>

            <p
              className="font-sans text-slate-500 leading-relaxed mb-8 opacity-0"
              style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 0.55s forwards' : 'none' }}
            >
              Based in Alpine, Utah. BYU graduate. Father of seven. Active in local governance
              and student mentorship.
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
                Connect
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
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
            <div
              className="flex items-center gap-3 mb-10 opacity-0"
              style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 0.7s forwards' : 'none' }}
            >
              <div className="line-blue" />
              <span className="font-sans text-xs tracking-widest uppercase text-blue-400">
                Ventures
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  name: "Kahoa",
                  role: "CEO & Co-Founder",
                  description: "Strategic custom software development company. Rebranded from SolutionStream. 51-200 employees, $5M-$20M revenue. Listed on AI Utah 100.",
                  url: "https://kahoa.ai",
                  delay: "0.75s"
                },
                {
                  name: "SolutionStream",
                  role: "Co-Founder",
                  year: "1996",
                  description: "Custom software development. Grew from 3 to 120+ employees. Inc. 500 recognition (2009, 2010, 2011). Clients include FranklinCovey, Western Governors University, Extra Space Storage, Young Living, Qualtrics.",
                  url: "https://solutionstream.com",
                  delay: "0.85s"
                },
                {
                  name: "Kartiva",
                  role: "Owner",
                  description: "Video commerce SaaS platform helping brands maximize product sales through influencer partnerships.",
                  url: null,
                  delay: "0.95s"
                },
                {
                  name: "East Mountain Holdings",
                  role: "Founder",
                  description: "Property holdings and real estate investment company.",
                  url: null,
                  delay: "1.05s"
                }
              ].map((venture) => (
                <div
                  key={venture.name}
                  className="p-5 border border-white/5 rounded-lg hover:border-blue-500/20 transition-colors opacity-0"
                  style={{ animation: mounted ? `fadeInUp 0.8s ease-out ${venture.delay} forwards` : 'none' }}
                >
                  <div className="mb-3">
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
                      {venture.role}{"year" in venture && venture.year && ` · ${venture.year}`}
                    </p>
                  </div>
                  <p className="font-sans text-sm text-slate-400 leading-relaxed">
                    {venture.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Background & Community Section */}
        <section className="border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Career */}
              <div
                className="opacity-0"
                style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 1.1s forwards' : 'none' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="line-blue" />
                  <span className="font-sans text-xs tracking-widest uppercase text-blue-400">
                    Background
                  </span>
                </div>
                <div className="space-y-4 font-sans text-slate-400 leading-relaxed text-sm">
                  <p>
                    Graduated from Provo High School and Brigham Young University with a BS degree.
                    Started career as a Java Developer at Nu Skin Enterprises (1995), then
                    Senior Java Developer at Allen Communication before co-founding SolutionStream
                    with Travis Cook in 1996.
                  </p>
                  <p>
                    Over 25 years, SolutionStream completed 2,000+ projects for hundreds of clients
                    across ecommerce, education, insurance, healthcare, and finance. The company
                    rebranded to Kahoa to reflect its evolution into AI and enterprise solutions.
                  </p>
                  <p>
                    Technical expertise spans Java, .NET, PHP, mobile development (iOS/Android),
                    and user interface design. Describes himself as a Software Engineer,
                    Solutions Architect, and Entrepreneur.
                  </p>
                </div>
              </div>

              {/* Community */}
              <div
                className="opacity-0"
                style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 1.2s forwards' : 'none' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="line-blue" />
                  <span className="font-sans text-xs tracking-widest uppercase text-blue-400">
                    Community
                  </span>
                </div>
                <div className="space-y-4 font-sans text-slate-400 leading-relaxed text-sm">
                  <p>
                    <span className="text-slate-300">Alpine City Council</span> — Currently serves as
                    Mayor Pro Tem. Combined 14+ years on Planning Commission and City Council.
                    Organized Alpine Days Festival three times.
                  </p>
                  <p>
                    <span className="text-slate-300">BYU Entrepreneurship Founders</span> — Advisory
                    board member since 2007. Co-founded the Young Founder&apos;s Group in 2008 to
                    connect entrepreneurs with student businesses. Gives lectures, team-teaches
                    with faculty, and mentors students in starting ventures.
                  </p>
                  <p>
                    His father, Jay Thelin, retired from BYU after 27 years—a connection that
                    instilled Jason&apos;s commitment to supporting students and university programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Family note + Orchestrator */}
        <section className="border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Personal */}
              <div
                className="opacity-0"
                style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 1.3s forwards' : 'none' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="line-blue" />
                  <span className="font-sans text-xs tracking-widest uppercase text-blue-400">
                    Personal
                  </span>
                </div>
                <p className="font-sans text-slate-400 leading-relaxed text-sm">
                  Lives in Alpine, Utah with his wife Vanessa and their family of seven children.
                  Interests include custom web development, mobile development, and building
                  software solutions that help businesses grow.
                </p>
              </div>

              {/* Orchestrator */}
              <div
                className="opacity-0"
                style={{ animation: mounted ? 'fadeInUp 0.8s ease-out 1.4s forwards' : 'none' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="line-blue" />
                  <span className="font-sans text-xs tracking-widest uppercase text-blue-400">
                    Orchestrator
                  </span>
                </div>
                <p className="font-sans text-slate-400 leading-relaxed text-sm mb-4">
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
              &copy; {new Date().getFullYear()} Jason Thelin · Alpine, Utah
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
                href="https://kahoa.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-slate-500 hover:text-blue-400 transition-colors"
              >
                Kahoa
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
