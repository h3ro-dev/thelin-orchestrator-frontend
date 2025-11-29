"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import {
  BookOpen,
  Lightbulb,
  MessageCircleQuestion,
  Brain,
  RefreshCw,
  ChevronRight,
  AlertCircle,
  Check,
  Zap,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { api, type Stats, type BookAddition, type BusinessIdea, type Question } from "@/lib/api";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [stats, setStats] = useState<Stats | null>(null);
  const [bookAdditions, setBookAdditions] = useState<BookAddition[]>([]);
  const [businessIdeas, setBusinessIdeas] = useState<BusinessIdea[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [apiConnected, setApiConnected] = useState<boolean | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const health = await api.health();
      setApiConnected(health.status === "healthy");

      const [statsData, bookData, ideasData, questionsData] = await Promise.all([
        api.getStats(),
        api.getBookAdditions(undefined, 5),
        api.getBusinessIdeas(undefined, 5),
        api.getQuestions("pending", 10),
      ]);

      setStats(statsData);
      setBookAdditions(bookData);
      setBusinessIdeas(ideasData);
      setQuestions(questionsData);
      setLastRefresh(new Date());
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      setApiConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAnswerQuestion = async (questionId: string, answer: string) => {
    try {
      await api.answerQuestion(questionId, answer);
      const questionsData = await api.getQuestions("pending", 10);
      setQuestions(questionsData);
      const statsData = await api.getStats();
      setStats(statsData);
    } catch (err) {
      console.error("Error answering question:", err);
      alert("Failed to submit answer. Please try again.");
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchData();
    }
  }, [isLoaded, user, fetchData]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center animate-pulse">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-br from-violet-500/20 to-indigo-600/20 rounded-3xl blur-xl animate-pulse" />
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
            <div className="absolute -inset-4 bg-gradient-to-br from-violet-500/20 to-indigo-600/20 rounded-3xl blur-2xl" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Thelin Orchestrator
          </h1>
          <p className="text-slate-500">Please sign in to continue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/5 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <Brain className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Thelin Orchestrator</h1>
              <p className="text-xs text-slate-500">Cognitive Prosthetic</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-white/5">
              {apiConnected === null ? (
                <span className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse" />
                  Connecting
                </span>
              ) : apiConnected ? (
                <span className="flex items-center gap-2 text-xs text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                  Live
                </span>
              ) : (
                <span className="flex items-center gap-2 text-xs text-red-400">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  Offline
                </span>
              )}
            </div>

            <button
              onClick={fetchData}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-white/5 transition-all text-sm text-slate-300 hover:text-white disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 rounded-lg"
                }
              }}
            />
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="font-medium text-red-400">Connection Error</p>
              <p className="text-sm text-red-400/70">{error}</p>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Good {getTimeOfDay()}, {user.firstName || "Jason"}
              </h2>
              <p className="text-slate-500">
                {format(new Date(), "EEEE, MMMM d")} &bull; Here&apos;s what&apos;s been captured
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Lifelogs Today"
              value={stats?.lifelogs_today || 0}
              icon={<Zap className="h-5 w-5" />}
              gradient="from-slate-600 to-slate-700"
              iconBg="bg-slate-500/20"
            />
            <StatCard
              label="Book Insights"
              value={stats?.classifications?.book || 0}
              icon={<BookOpen className="h-5 w-5" />}
              gradient="from-violet-500 to-purple-600"
              iconBg="bg-violet-500/20"
              textColor="text-violet-400"
            />
            <StatCard
              label="Business Ideas"
              value={stats?.classifications?.business || 0}
              icon={<Lightbulb className="h-5 w-5" />}
              gradient="from-amber-500 to-orange-600"
              iconBg="bg-amber-500/20"
              textColor="text-amber-400"
            />
            <StatCard
              label="Pending Actions"
              value={stats?.pending_questions || 0}
              icon={<MessageCircleQuestion className="h-5 w-5" />}
              gradient="from-cyan-500 to-blue-600"
              iconBg="bg-cyan-500/20"
              textColor="text-cyan-400"
            />
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Book Additions */}
          <section className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Book Additions</h2>
                  <p className="text-xs text-slate-500">Leadership insights ready for review</p>
                </div>
              </div>
              <Link
                href="/book"
                className="text-sm text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="p-4">
              {bookAdditions.length === 0 ? (
                <EmptyState
                  icon={<BookOpen className="h-6 w-6 text-slate-600" />}
                  message="No pending book additions"
                />
              ) : (
                <div className="space-y-3">
                  {bookAdditions.map((addition) => (
                    <Link
                      key={addition.id}
                      href={`/book/${addition.id}`}
                      className="block p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-violet-500/30 hover:bg-slate-800/70 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-violet-400">
                          {addition.chapter || "Unassigned Chapter"}
                        </span>
                        <StatusBadge status={addition.status} type="book" />
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                        {addition.content_markdown}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        {format(new Date(addition.created_at), "MMM d, h:mm a")}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Business Ideas */}
          <section className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Business Ideas</h2>
                  <p className="text-xs text-slate-500">Opportunities & strategic insights</p>
                </div>
              </div>
              <Link
                href="/ideas"
                className="text-sm text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="p-4">
              {businessIdeas.length === 0 ? (
                <EmptyState
                  icon={<Lightbulb className="h-6 w-6 text-slate-600" />}
                  message="No new business ideas"
                />
              ) : (
                <div className="space-y-3">
                  {businessIdeas.map((idea) => (
                    <Link
                      key={idea.id}
                      href={`/ideas/${idea.id}`}
                      className="block p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-amber-500/30 hover:bg-slate-800/70 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <span className="text-sm font-medium text-white line-clamp-2">
                          {idea.title.length > 100 ? idea.title.substring(0, 100) + "..." : idea.title}
                        </span>
                        <StatusBadge status={idea.status} type="idea" />
                      </div>
                      {idea.related_ventures.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {idea.related_ventures.slice(0, 3).map((venture) => (
                            <span
                              key={venture}
                              className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-xs"
                            >
                              {venture.replace(/_/g, " ")}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <TrendingUp className="h-3 w-3" />
                        {format(new Date(idea.created_at), "MMM d, h:mm a")}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Questions Section */}
        <section className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <MessageCircleQuestion className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white">Questions For You</h2>
              <p className="text-xs text-slate-500">Quick decisions needed on captured content</p>
            </div>
          </div>

          <div className="p-4">
            {questions.length === 0 ? (
              <EmptyState
                icon={<Check className="h-6 w-6 text-emerald-500" />}
                message="All caught up! No pending questions."
              />
            ) : (
              <div className="space-y-4">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-slate-800/50 border border-white/5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                          q.source_type === "book"
                            ? "bg-violet-500/20 text-violet-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {q.source_type === "book" ? "Book" : "Business"}
                      </span>
                    </div>

                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                      {q.context}
                    </p>

                    <p className="text-white font-medium mb-4">{q.question}</p>

                    <div className="flex flex-wrap gap-2">
                      {q.options?.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAnswerQuestion(q.id, option)}
                          className="px-4 py-2 text-sm rounded-lg bg-slate-700/50 hover:bg-slate-600/50 border border-white/5 hover:border-cyan-500/30 text-slate-300 hover:text-white transition-all"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-xs text-slate-600">
            Last synced {format(lastRefresh, "h:mm:ss a")} &bull; Auto-updates every 30 minutes
          </p>
        </footer>
      </main>
    </div>
  );
}

function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

function StatCard({
  label,
  value,
  icon,
  gradient,
  iconBg,
  textColor = "text-slate-400",
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
  textColor?: string;
}) {
  return (
    <div className="relative group">
      <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5 backdrop-blur-sm hover:border-white/10 transition-all">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center ${textColor}`}>
            {icon}
          </div>
          <Sparkles className="h-4 w-4 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-slate-500">{label}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status, type }: { status: string; type: "book" | "idea" }) {
  const configs: Record<string, { bg: string; text: string }> = {
    pending: { bg: "bg-slate-500/20", text: "text-slate-400" },
    review: { bg: "bg-amber-500/20", text: "text-amber-400" },
    approved: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
    rejected: { bg: "bg-red-500/20", text: "text-red-400" },
    new: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
    reviewing: { bg: "bg-blue-500/20", text: "text-blue-400" },
    in_progress: { bg: "bg-amber-500/20", text: "text-amber-400" },
    archived: { bg: "bg-slate-500/20", text: "text-slate-400" },
  };

  const config = configs[status] || configs.pending;

  return (
    <span className={`text-xs px-2 py-1 rounded-md flex-shrink-0 ${config.bg} ${config.text}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

function EmptyState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center mb-3">
        {icon}
      </div>
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}
