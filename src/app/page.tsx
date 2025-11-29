"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#f5f2eb] overflow-hidden relative">
      {/* Custom Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

        :root {
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body: 'DM Sans', system-ui, sans-serif;
          --color-cream: #f5f2eb;
          --color-gold: #c9a962;
          --color-charcoal: #0a0a0b;
          --color-muted: #6b6b6b;
        }

        .font-display {
          font-family: var(--font-display);
        }

        .font-body {
          font-family: var(--font-body);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes pulse-soft {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 1.2s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .gold-shimmer {
          background: linear-gradient(
            120deg,
            var(--color-gold) 0%,
            #e8d5a3 25%,
            var(--color-gold) 50%,
            #e8d5a3 75%,
            var(--color-gold) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .text-gradient {
          background: linear-gradient(135deg, var(--color-cream) 0%, #d4cfc3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .btn-premium {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-premium::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.6s ease;
        }

        .btn-premium:hover::before {
          left: 100%;
        }

        .line-accent {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, var(--color-gold), transparent);
        }

        .card-hover {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(201, 169, 98, 0.1);
        }

        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.03;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Dynamic Gradient Background */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: mounted
            ? `radial-gradient(ellipse 80% 50% at ${mousePosition.x}% ${mousePosition.y}%, rgba(201, 169, 98, 0.08) 0%, transparent 50%)`
            : 'transparent'
        }}
      />

      {/* Ambient Light Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-3xl"
          style={{
            top: '-20%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(201, 169, 98, 0.06) 0%, transparent 70%)',
            animation: 'pulse-soft 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            bottom: '-15%',
            left: '-5%',
            background: 'radial-gradient(circle, rgba(245, 242, 235, 0.04) 0%, transparent 70%)',
            animation: 'pulse-soft 10s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-50">
        <nav className="max-w-7xl mx-auto px-8 lg:px-12 py-8 flex items-center justify-between">
          <div
            className="flex items-center gap-3 opacity-0"
            style={{ animation: mounted ? 'slideInRight 0.8s ease-out 0.2s forwards' : 'none' }}
          >
            <div className="w-10 h-10 border border-[#c9a962]/30 flex items-center justify-center">
              <span className="font-display text-lg text-[#c9a962]">JT</span>
            </div>
          </div>

          <div
            className="flex items-center gap-8 opacity-0"
            style={{ animation: mounted ? 'fadeIn 0.8s ease-out 0.4s forwards' : 'none' }}
          >
            <a
              href="https://www.linkedin.com/in/jasonthelin/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm tracking-wide text-[#6b6b6b] hover:text-[#f5f2eb] transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="mailto:jason@jasonthelin.com"
              className="font-body text-sm tracking-wide text-[#6b6b6b] hover:text-[#f5f2eb] transition-colors duration-300"
            >
              Contact
            </a>
            <SignedOut>
              <Link
                href="/sign-in"
                className="btn-premium font-body text-sm tracking-wide px-6 py-3 border border-[#c9a962]/40 text-[#c9a962] hover:bg-[#c9a962] hover:text-[#0a0a0b]"
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="btn-premium font-body text-sm tracking-wide px-6 py-3 bg-[#c9a962] text-[#0a0a0b] hover:bg-[#e8d5a3]"
              >
                Dashboard
              </Link>
            </SignedIn>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-8 lg:px-12 pt-16 pb-32 lg:pt-24 lg:pb-40">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            {/* Main Content */}
            <div className="lg:col-span-7 space-y-12">
              {/* Overline */}
              <div
                className="flex items-center gap-4 opacity-0"
                style={{ animation: mounted ? 'fadeInUp 1s ease-out 0.3s forwards' : 'none' }}
              >
                <div className="line-accent" />
                <span className="font-body text-xs tracking-[0.3em] uppercase text-[#6b6b6b]">
                  Entrepreneur & Strategist
                </span>
              </div>

              {/* Name - The Hero Element */}
              <div className="space-y-2">
                <h1
                  className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-medium tracking-tight leading-[0.9] opacity-0"
                  style={{ animation: mounted ? 'fadeInUp 1s ease-out 0.5s forwards' : 'none' }}
                >
                  <span className="text-gradient">Jason</span>
                </h1>
                <h1
                  className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-medium tracking-tight leading-[0.9] opacity-0"
                  style={{ animation: mounted ? 'fadeInUp 1s ease-out 0.7s forwards' : 'none' }}
                >
                  <span className="gold-shimmer">Thelin</span>
                </h1>
              </div>

              {/* Description */}
              <p
                className="font-body text-lg lg:text-xl text-[#8a8a8a] max-w-xl leading-relaxed opacity-0"
                style={{ animation: mounted ? 'fadeInUp 1s ease-out 0.9s forwards' : 'none' }}
              >
                Building ventures that create lasting impact. Author, leader, and
                strategic thinker focused on the intersection of innovation and
                human potential.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-wrap gap-4 pt-4 opacity-0"
                style={{ animation: mounted ? 'fadeInUp 1s ease-out 1.1s forwards' : 'none' }}
              >
                <SignedOut>
                  <Link
                    href="/sign-in"
                    className="btn-premium group font-body text-sm tracking-wide px-8 py-4 bg-[#c9a962] text-[#0a0a0b] hover:bg-[#e8d5a3] flex items-center gap-3"
                  >
                    <span>Access Portal</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link
                    href="/dashboard"
                    className="btn-premium group font-body text-sm tracking-wide px-8 py-4 bg-[#c9a962] text-[#0a0a0b] hover:bg-[#e8d5a3] flex items-center gap-3"
                  >
                    <span>Go to Dashboard</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </SignedIn>
                <a
                  href="https://www.linkedin.com/in/jasonthelin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium font-body text-sm tracking-wide px-8 py-4 border border-[#333] text-[#f5f2eb] hover:border-[#c9a962]/50 flex items-center gap-3"
                >
                  <span>Connect</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Side - Stats/Highlights */}
            <div
              className="lg:col-span-5 space-y-8 opacity-0"
              style={{ animation: mounted ? 'fadeIn 1.2s ease-out 1.3s forwards' : 'none' }}
            >
              <div className="border-l border-[#222] pl-8 space-y-8">
                <div className="space-y-2">
                  <span className="font-body text-xs tracking-[0.2em] uppercase text-[#6b6b6b]">Focus</span>
                  <p className="font-display text-2xl lg:text-3xl text-[#f5f2eb]/90 italic">
                    Leadership & Innovation
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="font-body text-xs tracking-[0.2em] uppercase text-[#6b6b6b]">Mission</span>
                  <p className="font-body text-[#8a8a8a] leading-relaxed">
                    Empowering leaders to build ventures that matter, through strategic
                    thinking and authentic leadership principles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Focus Areas Section */}
        <section className="relative border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-8 lg:px-12 py-24 lg:py-32">
            <div
              className="flex items-center gap-4 mb-16 opacity-0"
              style={{ animation: mounted ? 'fadeInUp 1s ease-out 1.5s forwards' : 'none' }}
            >
              <div className="line-accent" />
              <span className="font-body text-xs tracking-[0.3em] uppercase text-[#6b6b6b]">
                Areas of Focus
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  number: "01",
                  title: "Leadership Development",
                  description: "Authoring insights on leadership principles and personal growth strategies for aspiring and established leaders.",
                  delay: "1.6s"
                },
                {
                  number: "02",
                  title: "Strategic Innovation",
                  description: "Identifying and developing business opportunities that leverage emerging technologies and market trends.",
                  delay: "1.8s"
                },
                {
                  number: "03",
                  title: "Venture Building",
                  description: "Building and scaling businesses across multiple industries with a focus on sustainable growth and team development.",
                  delay: "2s"
                }
              ].map((item) => (
                <div
                  key={item.number}
                  className="card-hover group p-8 border border-[#1a1a1a] hover:border-[#c9a962]/20 opacity-0"
                  style={{ animation: mounted ? `fadeInUp 1s ease-out ${item.delay} forwards` : 'none' }}
                >
                  <span className="font-display text-5xl text-[#1a1a1a] group-hover:text-[#c9a962]/20 transition-colors duration-500">
                    {item.number}
                  </span>
                  <h3 className="font-display text-xl lg:text-2xl text-[#f5f2eb] mt-6 mb-4">
                    {item.title}
                  </h3>
                  <p className="font-body text-[#6b6b6b] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Orchestrator Teaser */}
        <section className="relative border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-8 lg:px-12 py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div
                className="space-y-8 opacity-0"
                style={{ animation: mounted ? 'fadeInUp 1s ease-out 2.2s forwards' : 'none' }}
              >
                <div className="flex items-center gap-4">
                  <div className="line-accent" />
                  <span className="font-body text-xs tracking-[0.3em] uppercase text-[#6b6b6b]">
                    The System
                  </span>
                </div>
                <h2 className="font-display text-4xl lg:text-5xl text-[#f5f2eb]">
                  Thelin <span className="italic text-[#c9a962]">Orchestrator</span>
                </h2>
                <p className="font-body text-lg text-[#8a8a8a] leading-relaxed">
                  An AI-powered cognitive prosthetic designed to capture insights,
                  develop book content, and track strategic business opportunities
                  in real-time.
                </p>
                <SignedOut>
                  <Link
                    href="/sign-in"
                    className="btn-premium inline-flex items-center gap-3 font-body text-sm tracking-wide px-8 py-4 border border-[#c9a962]/40 text-[#c9a962] hover:bg-[#c9a962] hover:text-[#0a0a0b]"
                  >
                    <span>Access the System</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link
                    href="/dashboard"
                    className="btn-premium inline-flex items-center gap-3 font-body text-sm tracking-wide px-8 py-4 border border-[#c9a962]/40 text-[#c9a962] hover:bg-[#c9a962] hover:text-[#0a0a0b]"
                  >
                    <span>Enter Dashboard</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </SignedIn>
              </div>

              {/* Visual Element */}
              <div
                className="relative opacity-0"
                style={{ animation: mounted ? 'fadeIn 1.5s ease-out 2.4s forwards' : 'none' }}
              >
                <div className="aspect-square relative">
                  {/* Decorative Grid */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="border border-[#1a1a1a] opacity-50"
                        style={{
                          animationDelay: `${2.5 + i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                  {/* Center Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border border-[#c9a962]/30 flex items-center justify-center">
                      <div className="w-20 h-20 border border-[#c9a962]/50 flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#c9a962]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="relative border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-8 lg:px-12 py-24 lg:py-32 text-center">
            <div
              className="space-y-8 opacity-0"
              style={{ animation: mounted ? 'fadeInUp 1s ease-out 2.6s forwards' : 'none' }}
            >
              <h2 className="font-display text-3xl lg:text-4xl text-[#f5f2eb]">
                Let&apos;s Build Something <span className="italic text-[#c9a962]">Remarkable</span>
              </h2>
              <p className="font-body text-[#6b6b6b] max-w-2xl mx-auto">
                Interested in collaboration, speaking engagements, or business opportunities?
                I&apos;m always open to meaningful conversations.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <a
                  href="mailto:jason@jasonthelin.com"
                  className="btn-premium group font-body text-sm tracking-wide px-8 py-4 bg-[#c9a962] text-[#0a0a0b] hover:bg-[#e8d5a3] flex items-center gap-3"
                >
                  <span>Get in Touch</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[#333] flex items-center justify-center">
                <span className="font-display text-sm text-[#6b6b6b]">JT</span>
              </div>
              <span className="font-body text-sm text-[#6b6b6b]">
                &copy; {new Date().getFullYear()} Jason Thelin
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/jasonthelin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6b6b6b] hover:text-[#c9a962] transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:jason@jasonthelin.com"
                className="text-[#6b6b6b] hover:text-[#c9a962] transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
