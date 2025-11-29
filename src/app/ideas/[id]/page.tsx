"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  ArrowLeft,
  Lightbulb,
  Calendar,
  Building2,
  RefreshCw,
  Check,
  Clock,
  Archive,
  Rocket,
  MessageSquare,
  Brain,
  TrendingUp,
  X,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { api, type BusinessIdea } from "@/lib/api";
import ReactMarkdown from "react-markdown";

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  new: {
    label: "New",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20 border-emerald-500/30",
    icon: <Lightbulb className="h-4 w-4" />
  },
  reviewing: {
    label: "Reviewing",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20 border-blue-500/30",
    icon: <Clock className="h-4 w-4" />
  },
  approved: {
    label: "Approved",
    color: "text-violet-400",
    bgColor: "bg-violet-500/20 border-violet-500/30",
    icon: <Check className="h-4 w-4" />
  },
  in_progress: {
    label: "In Progress",
    color: "text-amber-400",
    bgColor: "bg-amber-500/20 border-amber-500/30",
    icon: <Rocket className="h-4 w-4" />
  },
  archived: {
    label: "Archived",
    color: "text-slate-400",
    bgColor: "bg-slate-500/20 border-slate-500/30",
    icon: <Archive className="h-4 w-4" />
  },
};

export default function IdeaDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [idea, setIdea] = useState<BusinessIdea | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isLoaded && user && id) {
      fetchIdea();
    }
  }, [isLoaded, user, id]);

  const fetchIdea = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getBusinessIdea(id as string);
      setIdea(data);
    } catch (err) {
      console.error("Error fetching idea:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch idea");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!idea) return;
    setIsUpdating(true);
    try {
      await api.updateIdeaStatus(idea.id, newStatus);
      setIdea({ ...idea, status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center animate-pulse">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-3xl blur-xl animate-pulse" />
          </div>
          <p className="text-slate-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Brain className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-white">Thelin Orchestrator</h1>
          <p className="text-slate-500">Please sign in to continue</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <X className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-white">Error</h1>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="h-8 w-8 text-slate-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-white">Not Found</h1>
          <p className="text-slate-400 mb-6">Business idea not found</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const status = statusConfig[idea.status] || statusConfig.new;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/5 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <Lightbulb className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <span className="text-xs text-amber-400 uppercase tracking-wider font-medium">Business Idea</span>
                <h1 className="text-xl font-bold text-white leading-tight mt-1 max-w-2xl">
                  {idea.title.length > 120 ? idea.title.substring(0, 120) + "..." : idea.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto px-6 py-8">
        {/* Status & Metadata */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 p-5">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
              {status.icon}
              <span>Status</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${status.bgColor} ${status.color}`}>
              {status.icon}
              {status.label}
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 p-5">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
              <Calendar className="h-4 w-4" />
              <span>Captured</span>
            </div>
            <div className="text-white font-medium">
              {format(new Date(idea.created_at), "MMMM d, yyyy")}
            </div>
            <div className="text-slate-500 text-sm">
              {format(new Date(idea.created_at), "h:mm a")}
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 p-5">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
              <Building2 className="h-4 w-4" />
              <span>Related Ventures</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {idea.related_ventures.length > 0 ? (
                idea.related_ventures.map((venture) => (
                  <span
                    key={venture}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-medium"
                  >
                    {venture.replace(/_/g, " ")}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 text-sm">None identified</span>
              )}
            </div>
          </div>
        </div>

        {/* Summary Content */}
        <section className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white">Full Summary</h2>
              <p className="text-xs text-slate-500">AI-generated strategic analysis</p>
            </div>
          </div>
          <div className="p-6">
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>,
                  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                  ul: ({ children }) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">{children}</ul>,
                  li: ({ children }) => <li className="text-slate-300">{children}</li>,
                  h1: ({ children }) => <h1 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-semibold text-white mb-3 mt-5">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-medium text-white mb-2 mt-4">{children}</h3>,
                }}
              >
                {idea.summary}
              </ReactMarkdown>
            </div>
          </div>
        </section>

        {/* Update Status */}
        <section className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="font-semibold text-white">Update Status</h2>
            <p className="text-xs text-slate-500 mt-1">Track the progress of this idea</p>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              {Object.entries(statusConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => handleStatusChange(key)}
                  disabled={isUpdating || idea.status === key}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                    idea.status === key
                      ? `${config.bgColor} ${config.color} cursor-default`
                      : "border-white/10 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white hover:border-white/20"
                  } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {config.icon}
                  <span className="text-sm font-medium">{config.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-6 grid md:grid-cols-2 gap-4">
          <button
            className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 transition-all text-left group"
            onClick={() => alert("Coming soon: Discussion scheduling")}
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-3 group-hover:bg-cyan-500/30 transition-colors">
              <MessageSquare className="h-5 w-5 text-cyan-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Schedule Discussion</h3>
            <p className="text-sm text-slate-500">Set up a meeting to explore this idea</p>
          </button>

          <button
            className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-violet-500/30 transition-all text-left group"
            onClick={() => alert("Coming soon: Deep analysis")}
          >
            <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center mb-3 group-hover:bg-violet-500/30 transition-colors">
              <TrendingUp className="h-5 w-5 text-violet-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Deep Analysis</h3>
            <p className="text-sm text-slate-500">Generate detailed market & feasibility report</p>
          </button>
        </section>
      </main>
    </div>
  );
}
