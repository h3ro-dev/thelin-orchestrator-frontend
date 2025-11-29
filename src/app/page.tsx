import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import {
  Brain,
  BookOpen,
  Lightbulb,
  Building2,
  ArrowRight,
  Sparkles,
  Linkedin,
  Mail,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/5 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <span className="text-white font-bold text-lg">JT</span>
            </div>
            <span className="text-lg font-semibold text-white">Jason Thelin</span>
          </div>

          <nav className="flex items-center gap-4">
            <SignedOut>
              <Link
                href="/sign-in"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white font-medium transition-all shadow-lg shadow-violet-500/25 flex items-center gap-2"
              >
                Sign In
                <ArrowRight className="h-4 w-4" />
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white font-medium transition-all shadow-lg shadow-violet-500/25 flex items-center gap-2"
              >
                Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </SignedIn>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-6">
                <Sparkles className="h-4 w-4" />
                Entrepreneur & Leader
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Jason Thelin
              </h1>

              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Serial entrepreneur, business leader, and author focused on building ventures
                that create lasting impact. Passionate about leadership development and
                strategic innovation.
              </p>

              <div className="flex flex-wrap gap-4">
                <SignedOut>
                  <Link
                    href="/sign-in"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white font-medium transition-all shadow-lg shadow-violet-500/25 flex items-center gap-2"
                  >
                    Access Portal
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link
                    href="/dashboard"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white font-medium transition-all shadow-lg shadow-violet-500/25 flex items-center gap-2"
                  >
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </SignedIn>
                <a
                  href="https://www.linkedin.com/in/jasonthelin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-white/10 text-white font-medium transition-all flex items-center gap-2"
                >
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Profile Visual */}
            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-600/20 rounded-3xl blur-2xl" />
                <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-white/10 p-8 h-full flex flex-col justify-center">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-500/30">
                    <Brain className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white text-center mb-2">Thelin Orchestrator</h3>
                  <p className="text-slate-400 text-center text-sm">
                    AI-powered cognitive prosthetic for capturing insights, developing book content,
                    and tracking strategic business opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Focus Areas */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white text-center mb-12">Focus Areas</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/5 hover:border-violet-500/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4 group-hover:bg-violet-500/30 transition-colors">
                <BookOpen className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Leadership Development</h3>
              <p className="text-slate-400 text-sm">
                Authoring insights on leadership principles and personal growth strategies for
                aspiring and established leaders.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/5 hover:border-amber-500/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/30 transition-colors">
                <Lightbulb className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Strategic Innovation</h3>
              <p className="text-slate-400 text-sm">
                Identifying and developing business opportunities that leverage emerging
                technologies and market trends.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/5 hover:border-emerald-500/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors">
                <Building2 className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Venture Building</h3>
              <p className="text-slate-400 text-sm">
                Building and scaling businesses across multiple industries with a focus on
                sustainable growth and team development.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20" />
            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-white/10 p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Connect with Jason
              </h2>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Interested in collaboration, speaking engagements, or business opportunities?
                Reach out to start a conversation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:jason@jasonthelin.com"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white font-medium transition-all shadow-lg shadow-violet-500/25 flex items-center gap-2"
                >
                  <Mail className="h-5 w-5" />
                  Get in Touch
                </a>
                <a
                  href="https://www.linkedin.com/in/jasonthelin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-white/10 text-white font-medium transition-all flex items-center gap-2"
                >
                  <Linkedin className="h-5 w-5" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">JT</span>
              </div>
              <span className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} Jason Thelin</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/jasonthelin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:jason@jasonthelin.com"
                className="text-slate-500 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
