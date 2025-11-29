"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import {
  BookOpen,
  Lightbulb,
  MessageCircleQuestion,
  ScrollText,
  Settings,
  RefreshCw,
  ChevronRight,
  AlertCircle,
  Check,
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
      // First check API health
      const health = await api.health();
      setApiConnected(health.status === "healthy");

      // Fetch all data in parallel
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
      // Refresh questions after answering
      const questionsData = await api.getQuestions("pending", 10);
      setQuestions(questionsData);
      // Update stats
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <ScrollText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Thelin Orchestrator</h1>
              <p className="text-xs text-slate-400">
                Cognitive Prosthetic for Jason Thelin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* API Status Indicator */}
            <div className="flex items-center gap-2 text-sm">
              {apiConnected === null ? (
                <span className="text-slate-500">Connecting...</span>
              ) : apiConnected ? (
                <span className="flex items-center gap-1 text-green-400">
                  <Check className="h-4 w-4" /> Live
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-400">
                  <AlertCircle className="h-4 w-4" /> Offline
                </span>
              )}
            </div>
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-sm"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
            <a
              href="/architecture"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
              title="View Architecture"
            >
              <Settings className="h-5 w-5" />
            </a>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Connection Error</p>
              <p className="text-sm text-red-400/80">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Today&apos;s Capture
            </h2>
            <span className="text-sm text-slate-400">
              {format(new Date(), "MMMM d, yyyy")}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Lifelogs"
              value={stats?.lifelogs_today || 0}
              color="slate"
            />
            <StatCard
              label="Book"
              value={stats?.classifications?.book || 0}
              color="purple"
            />
            <StatCard
              label="Business"
              value={stats?.classifications?.business || 0}
              color="blue"
            />
            <StatCard
              label="Questions"
              value={stats?.pending_questions || 0}
              color="amber"
            />
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Book Additions */}
          <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-400" />
                Book Additions
              </h2>
              <a
                href="/book"
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                View all <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="space-y-4">
              {bookAdditions.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">
                  No pending book additions
                </p>
              ) : (
                bookAdditions.map((addition) => (
                  <div
                    key={addition.id}
                    className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-purple-400">
                        {addition.chapter || "Unassigned Chapter"}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          addition.status === "review"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        {addition.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 line-clamp-2">
                      {addition.content_markdown}
                    </p>
                    <Link
                      href={`/book/${addition.id}`}
                      className="mt-3 inline-block text-xs text-blue-400 hover:text-blue-300"
                    >
                      Review &rarr;
                    </Link>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Business Ideas */}
          <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-400" />
                New Ideas
              </h2>
              <a
                href="/ideas"
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                View all <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="space-y-4">
              {businessIdeas.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">
                  No new business ideas
                </p>
              ) : (
                businessIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-amber-500/50 transition cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium line-clamp-1">{idea.title}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded flex-shrink-0 ml-2 ${
                          idea.status === "new"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {idea.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">
                      Synergies: {idea.related_ventures.join(", ") || "None identified"}
                    </p>
                    <p className="text-sm text-slate-300 line-clamp-2">
                      {idea.summary}
                    </p>
                    <Link
                      href={`/ideas/${idea.id}`}
                      className="mt-3 inline-block text-xs text-blue-400 hover:text-blue-300"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Questions Section */}
        <section className="mt-6 bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <MessageCircleQuestion className="h-5 w-5 text-blue-400" />
            Questions For You
          </h2>

          <div className="space-y-4">
            {questions.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">
                No pending questions
              </p>
            ) : (
              questions.map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-lg bg-slate-800/50 border border-slate-700"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        q.source_type === "book"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {q.source_type}
                    </span>
                    <span className="text-sm text-slate-400">{q.context}</span>
                  </div>

                  <p className="text-sm font-medium mb-3">{q.question}</p>

                  <div className="flex flex-wrap gap-2">
                    {q.options?.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswerQuestion(q.id, option)}
                        className="px-3 py-1.5 text-sm rounded-lg bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-blue-500 transition"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-slate-500">
          <p>
            Last refresh: {format(lastRefresh, "h:mm:ss a")} &bull; Pipeline runs
            every 30 minutes
          </p>
        </footer>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    slate: "bg-slate-800 border-slate-700",
    purple: "bg-purple-500/10 border-purple-500/30",
    blue: "bg-blue-500/10 border-blue-500/30",
    amber: "bg-amber-500/10 border-amber-500/30",
  };

  return (
    <div
      className={`p-4 rounded-lg border ${colorClasses[color] || colorClasses.slate}`}
    >
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  );
}
