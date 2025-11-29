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
} from "lucide-react";
import { format } from "date-fns";
import { api, type BusinessIdea } from "@/lib/api";
import ReactMarkdown from "react-markdown";

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  new: { label: "New", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: <Lightbulb className="h-4 w-4" /> },
  reviewing: { label: "Reviewing", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: <Clock className="h-4 w-4" /> },
  approved: { label: "Approved", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: <Check className="h-4 w-4" /> },
  in_progress: { label: "In Progress", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", icon: <Rocket className="h-4 w-4" /> },
  archived: { label: "Archived", color: "bg-slate-500/20 text-slate-400 border-slate-500/30", icon: <Archive className="h-4 w-4" /> },
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
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Thelin Orchestrator</h1>
          <p className="text-slate-400">Please sign in to continue</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-400">Error</h1>
          <p className="text-slate-400 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Idea Not Found</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const status = statusConfig[idea.status] || statusConfig.new;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wide">Business Idea</span>
                <h1 className="text-xl font-bold leading-tight max-w-2xl">{idea.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Status & Metadata */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
              {status.icon}
              Status
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${status.color}`}>
              {status.label}
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
              <Calendar className="h-4 w-4" />
              Captured
            </div>
            <div className="text-white font-medium">
              {format(new Date(idea.created_at), "MMM d, yyyy 'at' h:mm a")}
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
              <Building2 className="h-4 w-4" />
              Related Ventures
            </div>
            <div className="flex flex-wrap gap-1">
              {idea.related_ventures.length > 0 ? (
                idea.related_ventures.map((venture) => (
                  <span
                    key={venture}
                    className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300"
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
        <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-amber-400" />
            Full Summary
          </h2>
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>,
                strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                ul: ({ children }) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-1">{children}</ul>,
                li: ({ children }) => <li className="text-slate-300">{children}</li>,
                h1: ({ children }) => <h1 className="text-xl font-bold text-white mb-3">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-semibold text-white mb-2 mt-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-medium text-white mb-2 mt-3">{children}</h3>,
              }}
            >
              {idea.summary}
            </ReactMarkdown>
          </div>
        </section>

        {/* Actions */}
        <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <h2 className="text-lg font-semibold mb-4">Update Status</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(statusConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => handleStatusChange(key)}
                disabled={isUpdating || idea.status === key}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                  idea.status === key
                    ? config.color + " cursor-default"
                    : "border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-slate-300"
                } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {config.icon}
                {config.label}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
