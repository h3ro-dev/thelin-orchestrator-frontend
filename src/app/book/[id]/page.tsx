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
} from "lucide-react";
import { format } from "date-fns";
import { api, type BookAddition } from "@/lib/api";
import ReactMarkdown from "react-markdown";

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: "Pending Review", color: "bg-slate-500/20 text-slate-400 border-slate-500/30", icon: <Clock className="h-4 w-4" /> },
  review: { label: "In Review", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", icon: <Edit3 className="h-4 w-4" /> },
  approved: { label: "Approved", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: <Check className="h-4 w-4" /> },
  rejected: { label: "Rejected", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: <X className="h-4 w-4" /> },
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

  if (!addition) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Book Addition Not Found</h1>
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

  const status = statusConfig[addition.status] || statusConfig.pending;

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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wide">Book Addition</span>
                <h1 className="text-xl font-bold leading-tight">
                  {addition.chapter || "Unassigned Chapter"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Status & Metadata */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
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
              {format(new Date(addition.created_at), "MMM d, yyyy 'at' h:mm a")}
            </div>
          </div>
        </div>

        {/* Original Lifelog Context */}
        {addition.lifelog_content && (
          <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-slate-400" />
              Original Context
            </h2>
            <div className="bg-slate-800/50 rounded-lg p-4 text-sm text-slate-300 max-h-48 overflow-y-auto">
              {addition.lifelog_content}
            </div>
          </section>
        )}

        {/* Generated Content */}
        <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-purple-400" />
            Generated Book Content
          </h2>
          <div className="prose prose-invert prose-sm max-w-none bg-slate-800/30 rounded-lg p-6 border border-slate-700">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>,
                strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                ul: ({ children }) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-1">{children}</ul>,
                li: ({ children }) => <li className="text-slate-300">{children}</li>,
                h1: ({ children }) => <h1 className="text-xl font-bold text-white mb-3">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-semibold text-white mb-2 mt-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-medium text-white mb-2 mt-3">{children}</h3>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-purple-500 pl-4 italic text-slate-400 my-4">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {addition.content_markdown}
            </ReactMarkdown>
          </div>
        </section>

        {/* Actions */}
        {addition.status !== "approved" && addition.status !== "rejected" && (
          <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
            <h2 className="text-lg font-semibold mb-4">Review Actions</h2>

            {showFeedback ? (
              <div className="space-y-4">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Optional: Provide feedback for rejection..."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  rows={3}
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleReject}
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg transition disabled:opacity-50"
                  >
                    <X className="h-4 w-4" />
                    Confirm Reject
                  </button>
                  <button
                    onClick={() => setShowFeedback(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
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
                  className="flex items-center gap-2 px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg transition disabled:opacity-50"
                >
                  <Check className="h-5 w-5" />
                  Approve for Book
                </button>
                <button
                  onClick={() => setShowFeedback(true)}
                  disabled={isUpdating}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg transition disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                  Reject
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
