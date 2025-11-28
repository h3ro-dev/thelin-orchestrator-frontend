"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Cpu,
  Database,
  Globe,
  Headphones,
  ArrowRight,
  ArrowDown,
  Check,
  X,
  Zap,
  GitBranch,
  Lightbulb,
  BookOpen,
  Filter,
  Server,
  Shield,
  Clock,
  ChevronLeft,
} from "lucide-react";

export default function ArchitecturePage() {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to Dashboard
          </Link>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            System Architecture
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
            <Brain className="h-4 w-4" />
            Cognitive Prosthetic System
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Thelin Orchestrator
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            An AI-powered system that transforms spoken thoughts into organized
            knowledge, business insights, and book content.
          </p>
        </section>

        {/* Data Flow Visualization */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Data Flow Pipeline
            </span>
          </h2>

          <div className="relative">
            {/* Connection Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>

            {/* Pipeline Steps */}
            <div className="grid md:grid-cols-5 gap-4 relative z-10">
              {/* Step 1: Capture */}
              <div
                className={`group cursor-pointer transition-all duration-300 ${
                  activePhase === 1 ? "scale-105" : "hover:scale-102"
                }`}
                onMouseEnter={() => setActivePhase(1)}
                onMouseLeave={() => setActivePhase(null)}
              >
                <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                    <Headphones className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-emerald-400 mb-2">1. Capture</h3>
                  <p className="text-sm text-slate-400">
                    Limitless Pendant records conversations and thoughts throughout the day
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400/70">
                    <Clock className="h-3 w-3" />
                    Every 30 minutes
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-slate-600" />
              </div>
              <div className="md:hidden flex justify-center py-2">
                <ArrowDown className="h-6 w-6 text-slate-600" />
              </div>

              {/* Step 2: Ingest */}
              <div
                className={`group cursor-pointer transition-all duration-300 ${
                  activePhase === 2 ? "scale-105" : "hover:scale-102"
                }`}
                onMouseEnter={() => setActivePhase(2)}
                onMouseLeave={() => setActivePhase(null)}
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-blue-400 mb-2">2. Ingest</h3>
                  <p className="text-sm text-slate-400">
                    Lifelogs fetched via API and stored in PostgreSQL database
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-blue-400/70">
                    <Server className="h-3 w-3" />
                    Mac Studio 1
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-slate-600" />
              </div>
              <div className="md:hidden flex justify-center py-2">
                <ArrowDown className="h-6 w-6 text-slate-600" />
              </div>

              {/* Step 3: Classify */}
              <div
                className={`group cursor-pointer transition-all duration-300 ${
                  activePhase === 3 ? "scale-105" : "hover:scale-102"
                }`}
                onMouseEnter={() => setActivePhase(3)}
                onMouseLeave={() => setActivePhase(null)}
              >
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-purple-400 mb-2">3. Classify</h3>
                  <p className="text-sm text-slate-400">
                    Multi-model AI consensus determines content category
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-purple-400/70">
                    <Zap className="h-3 w-3" />
                    4 AI Models
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Model Classifier Deep Dive */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Multi-Model Consensus Classifier
            </span>
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Four AI models work together to ensure accurate classification with high confidence
          </p>

          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Phase 1: Parallel */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                    Phase 1
                  </div>
                  <span className="text-slate-400">Parallel Classification</span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <ModelCard
                    name="GPT-5.1"
                    provider="OpenAI"
                    color="green"
                    description="Fast, accurate general-purpose classifier"
                    latency="~2s"
                  />
                  <ModelCard
                    name="Grok 4.1 Fast"
                    provider="xAI"
                    color="orange"
                    description="Real-time reasoning with context awareness"
                    latency="~5s"
                  />
                </div>

                <div className="flex justify-center my-6">
                  <div className="flex items-center gap-4 px-6 py-3 rounded-xl bg-slate-800/50 border border-slate-700">
                    <span className="text-slate-400">Do they agree?</span>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1 text-green-400">
                        <Check className="h-4 w-4" /> Early consensus
                      </span>
                      <span className="text-slate-600">/</span>
                      <span className="flex items-center gap-1 text-amber-400">
                        <X className="h-4 w-4" /> Continue
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 2: Review */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">
                    Phase 2
                  </div>
                  <span className="text-slate-400">Review & Validation</span>
                </div>

                <div className="max-w-md mx-auto">
                  <ModelCard
                    name="Claude Sonnet 4"
                    provider="Anthropic"
                    color="purple"
                    description="Deep reasoning review with prior context"
                    latency="~4s"
                  />
                </div>

                <div className="flex justify-center my-6">
                  <div className="flex items-center gap-4 px-6 py-3 rounded-xl bg-slate-800/50 border border-slate-700">
                    <span className="text-slate-400">2/3 majority?</span>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1 text-green-400">
                        <Check className="h-4 w-4" /> Done
                      </span>
                      <span className="text-slate-600">/</span>
                      <span className="flex items-center gap-1 text-amber-400">
                        <X className="h-4 w-4" /> Escalate
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 3: Arbiter */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-medium">
                    Phase 3
                  </div>
                  <span className="text-slate-400">Final Arbiter</span>
                </div>

                <div className="max-w-md mx-auto">
                  <ModelCard
                    name="GPT-5.1 Pro"
                    provider="OpenAI"
                    color="amber"
                    description="Final decision maker with full context"
                    latency="~3s"
                    highlight
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Output Categories */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Classification Outputs
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <OutputCard
              icon={<Filter className="h-6 w-6" />}
              title="Noise"
              description="Casual conversation, logistics, entertainment. Filtered out to keep signal high."
              color="slate"
              percentage="~80%"
            />
            <OutputCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Book Content"
              description="Leadership insights, culture discussions, AI impact stories for the book."
              color="purple"
              percentage="~10%"
              action="Creates GitHub PR"
            />
            <OutputCard
              icon={<Lightbulb className="h-6 w-6" />}
              title="Business Ideas"
              description="Venture opportunities, partnership ideas, strategic insights."
              color="amber"
              percentage="~10%"
              action="Triggers research"
            />
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TechCard
              category="Frontend"
              items={["Next.js 16", "React 19", "Tailwind CSS", "Clerk Auth"]}
              icon={<Globe className="h-5 w-5" />}
            />
            <TechCard
              category="Backend"
              items={["FastAPI", "Python 3.12", "asyncpg", "APScheduler"]}
              icon={<Server className="h-5 w-5" />}
            />
            <TechCard
              category="AI Models"
              items={["GPT-5.1 / Pro", "Claude Sonnet 4", "Grok 4.1 Fast", "LangGraph"]}
              icon={<Brain className="h-5 w-5" />}
            />
            <TechCard
              category="Infrastructure"
              items={["Mac Studio M2", "PostgreSQL 16", "Redis", "Tailscale"]}
              icon={<Cpu className="h-5 w-5" />}
            />
          </div>
        </section>

        {/* Security Note */}
        <section className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-800/50 border border-slate-700">
            <Shield className="h-5 w-5 text-green-400" />
            <span className="text-slate-300">
              Secured via Tailscale mesh network &bull; Clerk authentication &bull; Single-user access
            </span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-500 text-sm">
          <p>Thelin Orchestrator &bull; Jason Thelin&apos;s Cognitive Prosthetic System</p>
        </div>
      </footer>
    </div>
  );
}

function ModelCard({
  name,
  provider,
  color,
  description,
  latency,
  highlight = false,
}: {
  name: string;
  provider: string;
  color: "green" | "orange" | "purple" | "amber";
  description: string;
  latency: string;
  highlight?: boolean;
}) {
  const colors = {
    green: "from-green-500/20 to-green-600/10 border-green-500/30 text-green-400",
    orange: "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400",
    purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400",
    amber: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colors[color]} border rounded-xl p-5 ${
        highlight ? "ring-2 ring-amber-500/50" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <span className="text-xs text-slate-500">{provider}</span>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400">
          {latency}
        </span>
      </div>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}

function OutputCard({
  icon,
  title,
  description,
  color,
  percentage,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "slate" | "purple" | "amber";
  percentage: string;
  action?: string;
}) {
  const colors = {
    slate: "from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-400",
    purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400",
    amber: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400",
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-2xl p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center ${
          color === "slate" ? "text-slate-400" : color === "purple" ? "text-purple-400" : "text-amber-400"
        }`}>
          {icon}
        </div>
        <span className="text-2xl font-bold text-white">{percentage}</span>
      </div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 mb-3">{description}</p>
      {action && (
        <div className="flex items-center gap-2 text-xs">
          <GitBranch className="h-3 w-3" />
          <span className={color === "purple" ? "text-purple-400" : "text-amber-400"}>
            {action}
          </span>
        </div>
      )}
    </div>
  );
}

function TechCard({
  category,
  items,
  icon,
}: {
  category: string;
  items: string[];
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4 text-slate-400">
        {icon}
        <span className="font-medium">{category}</span>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-slate-300 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
