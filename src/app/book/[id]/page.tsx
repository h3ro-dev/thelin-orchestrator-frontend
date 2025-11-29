"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  FileText,
  RefreshCw,
  Check,
  X,
  Clock,
  Edit3,
  Brain,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { api, type BookAddition } from "@/lib/api";
import ReactMarkdown from "react-markdown";

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  pending: {
    label: "Pending Review",
    color: "text-slate-400",
    bgColor: "bg-slate-500/20 border-slate-500/30",
    icon: <Clock className="h-4 w-4" />
  },
  review: {
    label: "In Review",
    color: "text-amber-400",
    bgColor: "bg-amber-500/20 border-amber-500/30",
    icon: <Edit3 className="h-4 w-4" />
  },
  approved: {
    label: "Approved",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20 border-emerald-500/30",
    icon: <Check className="h-4 w-4" />
  },
  rejected: {
    label: "Rejected",
    color: "text-red-400",
    bgColor: "bg-red-500/20 border-red-500/30",
    icon: <X className="h-4 w-4" />
  },
};

export default function BookAdditionDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [addition, setAddition] = useState<BookAddition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (isLoaded && user && id) {
      fetchAddition();
    }
  }, [isLoaded, user, id]);

  const fetchAddition = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getBookAddition(id as string);
      setAddition(data);
    } catch (err) {
      console.error("Error fetching book addition:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch book addition");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!addition) return;
    setIsUpdating(true);
    try {
      await api.approveBookAddition(addition.id);
      setAddition({ ...addition, status: "approved" });
    } catch (err) {
      console.error("Error approving:", err);
      alert("Failed to approve");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReject = async () => {
    if (!addition) return;
    setIsUpdating(true);
    try {
      await api.rejectBookAddition(addition.id, feedback || undefined);
      setAddition({ ...addition, status: "rejected" });
      setShowFeedback(false);
    } catch (err) {
      console.error("Error rejecting:", err);
      alert("Failed to reject");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center animate-pulse">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-3xl blur-xl animate-pulse" />
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

  if (!addition) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-slate-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-white">Not Found</h1>
          <p className="text-slate-400 mb-6">Book addition not found</p>
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

  const status = statusConfig[addition.status] || statusConfig.pending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
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
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <span className="text-xs text-violet-400 uppercase tracking-wider font-medium">Book Addition</span>
                <h1 className="text-xl font-bold text-white leading-tight mt-1">
                  {addition.chapter || "Unassigned Chapter"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto px-6 py-8">
        {/* Status & Metadata */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
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
              {format(new Date(addition.created_at), "MMMM d, yyyy")}
            </div>
            <div className="text-slate-500 text-sm">
              {format(new Date(addition.created_at), "h:mm a")}
            </div>
          </div>
        </div>

        {/* Original Context */}
        {addition.lifelog_content && (
          <section className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-700/50 flex items-center justify-center">
                <FileText className="h-4 w-4 text-slate-400" />
              </div>
              <div>
                <h2 className="font-semibold text-white">Original Context</h2>
                <p className="text-xs text-slate-500">From your lifelog capture</p>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-slate-800/50 rounded-xl p-4 text-sm text-slate-400 max-h-48 overflow-y-auto leading-relaxed">
                {addition.lifelog_content}
              </div>
            </div>
          </section>
        )}

        {/* Generated Content */}
        <section className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white">Generated Content</h2>
              <p className="text-xs text-slate-500">AI-crafted book addition</p>
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
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-violet-500 pl-4 italic text-slate-400 my-4">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {addition.content_markdown}
              </ReactMarkdown>
            </div>
          </div>
        </section>

        {/* Actions */}
        {addition.status !== "approved" && addition.status !== "rejected" && (
          <section className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5">
              <h2 className="font-semibold text-white">Review Actions</h2>
              <p className="text-xs text-slate-500 mt-1">Approve to add to your book, or reject with feedback</p>
            </div>
            <div className="p-6">
              {showFeedback ? (
                <div className="space-y-4">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Optional: Provide feedback for rejection..."
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                    rows={3}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleReject}
                      disabled={isUpdating}
                      className="flex items-center gap-2 px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl transition-all disabled:opacity-50"
                    >
                      <X className="h-4 w-4" />
                      Confirm Reject
                    </button>
                    <button
                      onClick={() => setShowFeedback(false)}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all text-slate-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleApprove}
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/25"
                  >
                    <Check className="h-5 w-5" />
                    Approve for Book
                  </button>
                  <button
                    onClick={() => setShowFeedback(true)}
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-white/5 text-slate-300 rounded-xl transition-all disabled:opacity-50"
                  >
                    <X className="h-5 w-5" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Approved/Rejected State */}
        {(addition.status === "approved" || addition.status === "rejected") && (
          <section className={`rounded-2xl border p-6 text-center ${
            addition.status === "approved"
              ? "bg-emerald-500/10 border-emerald-500/20"
              : "bg-red-500/10 border-red-500/20"
          }`}>
            <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              addition.status === "approved"
                ? "bg-emerald-500/20"
                : "bg-red-500/20"
            }`}>
              {addition.status === "approved" ? (
                <Check className="h-7 w-7 text-emerald-400" />
              ) : (
                <X className="h-7 w-7 text-red-400" />
              )}
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${
              addition.status === "approved" ? "text-emerald-400" : "text-red-400"
            }`}>
              {addition.status === "approved" ? "Approved for Book" : "Rejected"}
            </h3>
            <p className="text-slate-500 text-sm">
              {addition.status === "approved"
                ? "This content has been added to your book."
                : "This content was not added to your book."}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
