"use client";

import { useState, useEffect } from "react";
import {
  Edit,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GripVertical,
  Linkedin,
  Instagram,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  color: string;
  title: string;
  opacity?: boolean;
  imageUrl?: string;
  time?: string;
}

interface CalendarDay {
  day: number;
  events?: CalendarEvent[];
  bestTime?: boolean;
  highlight?: boolean;
  dropZone?: boolean;
  current?: boolean;
  empty?: boolean; // Added for dynamic grid generation
}

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "week" | "list">("month");
  const [posts, setPosts] = useState<any[]>([]);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetch("http://localhost:5214/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Helper to get events for a specific day
  const getEventsForDay = (day: number) => {
    const dayPosts = posts.filter((post) => {
      if (!post.scheduledTime || post.status !== "scheduled") return false;
      const date = new Date(post.scheduledTime);
      return (
        date.getFullYear() === currentMonth.getFullYear() &&
        date.getMonth() === currentMonth.getMonth() &&
        date.getDate() === day
      );
    });

    return dayPosts.map((post) => {
      const date = new Date(post.scheduledTime);
      return {
        color: "#0a66c2",
        title: post.content || "Scheduled Post",
        time: date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        imageUrl:
          post.mediaAssets && post.mediaAssets.length > 0
            ? `http://localhost:5214${post.mediaAssets[0].url}`
            : undefined,
      };
    });
  };

  // Dynamic Grid Generation
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  // Format month name
  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Generate calendar days
  const calendarDays: CalendarDay[] = [];

  // Empty slots for previous month's days
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({ day: 0, empty: true });
  }

  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      new Date().getDate() === i &&
      new Date().getMonth() === currentMonth.getMonth() &&
      new Date().getFullYear() === currentMonth.getFullYear();

    const events = getEventsForDay(i);

    // Example of adding static bestTime/highlight/dropZone for specific days
    // In a real app, this would come from a backend or more complex logic
    let bestTime = false;
    let highlight = false;
    let dropZone = false;

    if (currentMonth.getMonth() === 9 && currentMonth.getFullYear() === 2023) {
      // Example for Oct 2023
      if (i === 3 || i === 7) bestTime = true;
      if (i === 3 || i === 7) highlight = true;
      if (i === 9) dropZone = true;
    }

    calendarDays.push({
      day: i,
      current: isToday,
      events: events,
      bestTime: bestTime,
      highlight: highlight,
      dropZone: dropZone,
    });
  }

  // Add remaining slots to complete the grid (optional, but good for layout)
  // Ensures a consistent 6-row calendar view
  const totalCells = 42; // 6 rows * 7 columns
  const remainingSlots = totalCells - calendarDays.length;
  for (let i = 0; i < remainingSlots; i++) {
    calendarDays.push({ day: 0, empty: true });
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background-light dark:bg-background-dark">
      {/* ... Header ... */}
      <header className="flex flex-col border-b border-border z-20 shadow-sm bg-surface-light dark:bg-surface-dark transition-colors">
        <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-text-main dark:text-white">
              Content Calendar
            </h2>
            <p className="text-text-secondary text-sm mt-1">
              Manage and schedule your cross-platform presence.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm">
            <Edit className="h-5 w-5" />
            Create New Post
          </button>
        </div>
        <div className="px-6 py-3 flex flex-wrap items-center justify-between gap-4 border-t border-border/50 bg-gray-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="flex items-center gap-2 text-text-secondary text-sm font-medium cursor-pointer hover:text-text-main dark:hover:text-white transition-colors">
                <CalendarDays className="h-5 w-5" />
                <span>America/New_York (GMT-5)</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-200 dark:bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setView("month")}
                className={cn(
                  "px-4 py-1.5 rounded-md text-xs font-semibold shadow-sm transition-all",
                  view === "month"
                    ? "bg-white dark:bg-slate-700 text-text-main dark:text-white border border-gray-200 dark:border-slate-600"
                    : "text-text-secondary hover:text-text-main dark:hover:text-white hover:bg-gray-300/50 dark:hover:bg-slate-700/50"
                )}
              >
                Month
              </button>
              <button
                onClick={() => setView("week")}
                className={cn(
                  "px-4 py-1.5 rounded-md text-xs font-semibold shadow-sm transition-all",
                  view === "week"
                    ? "bg-white dark:bg-slate-700 text-text-main dark:text-white border border-gray-200 dark:border-slate-600"
                    : "text-text-secondary hover:text-text-main dark:hover:text-white hover:bg-gray-300/50 dark:hover:bg-slate-700/50"
                )}
              >
                Week
              </button>
              <button
                onClick={() => setView("list")}
                className={cn(
                  "px-4 py-1.5 rounded-md text-xs font-semibold shadow-sm transition-all",
                  view === "list"
                    ? "bg-white dark:bg-slate-700 text-text-main dark:text-white border border-gray-200 dark:border-slate-600"
                    : "text-text-secondary hover:text-text-main dark:hover:text-white hover:bg-gray-300/50 dark:hover:bg-slate-700/50"
                )}
              >
                List
              </button>
            </div>
            <div className="h-6 w-px bg-gray-300 dark:bg-slate-700 mx-1"></div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition text-xs font-medium text-text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0a66c2]"></span>{" "}
                LinkedIn
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition text-xs font-medium text-text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C]"></span>{" "}
                Instagram
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Queue */}
        <div className="w-80 flex flex-col border-r border-border bg-surface-light dark:bg-surface-dark flex-shrink-0 transition-colors">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider">
              Queue
            </h3>
            <span className="bg-gray-100 dark:bg-slate-800 text-text-secondary text-[10px] px-2 py-0.5 rounded-full border border-gray-200 dark:border-slate-700">
              {posts.filter((p) => p.status === "draft").length} Drafts
            </span>
          </div>
          <div className="p-4 pb-0">
            {/* Auto-schedule button */}
            <button className="w-full group flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-primary/20 bg-primary/10 hover:bg-primary/20 transition-all text-primary text-xs font-bold">
              <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
              Auto-Schedule with AI
            </button>
          </div>
          {/* Draft List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {posts
              .filter((p) => p.status === "draft")
              .map((draft) => (
                <div
                  key={draft.id}
                  className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-3 cursor-move hover:border-primary/50 hover:shadow-md transition-all group relative"
                >
                  <div className="absolute top-3 right-3 text-gray-400 group-hover:text-primary cursor-grab">
                    <GripVertical className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {/* Platform Icon - defaulting to Linkedin for filtering simplification */}
                    <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#0a66c2]">
                      <Linkedin className="h-3.5 w-3.5 fill-current" />
                    </div>
                    <span className="text-[10px] font-semibold text-text-secondary">
                      LINKEDIN
                    </span>
                  </div>
                  <p className="text-sm text-text-main dark:text-gray-200 line-clamp-2 leading-relaxed mb-3">
                    {draft.content}
                  </p>
                  <div className="flex items-center gap-2">
                    {draft.mediaAssets && draft.mediaAssets.length > 0 ? (
                      <div
                        className="h-8 w-8 rounded-md bg-cover bg-center border border-gray-200 dark:border-slate-700"
                        style={{
                          backgroundImage: `url(http://localhost:5214${draft.mediaAssets[0].url})`,
                        }}
                      ></div>
                    ) : (
                      <span className="text-[10px] text-text-secondary italic">
                        Text only
                      </span>
                    )}
                    <span className="text-[10px] text-text-secondary italic">
                      No date set
                    </span>
                  </div>
                </div>
              ))}
            {posts.filter((p) => p.status === "draft").length === 0 && (
              <div className="text-center text-text-secondary text-sm py-4">
                No drafts found.
              </div>
            )}
          </div>
        </div>

        {/* Content Area - Calendar */}
        <div className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-4 px-2">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevMonth}
                className="hover:bg-gray-200 dark:hover:bg-slate-700 p-1.5 rounded-full transition-colors text-text-main dark:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h3 className="text-xl font-bold text-text-main dark:text-white">
                {monthName}
              </h3>
              <button
                onClick={handleNextMonth}
                className="hover:bg-gray-200 dark:hover:bg-slate-700 p-1.5 rounded-full transition-colors text-text-main dark:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="text-xs font-medium text-text-secondary">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
              Peak engagement times highlighted
            </div>
          </div>

          <div className="flex-1 border border-surface-border rounded-xl overflow-hidden flex flex-col shadow-sm bg-white dark:bg-slate-900 transition-colors">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 border-b border-surface-border bg-gray-50 dark:bg-slate-800">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="py-3 text-center text-xs font-semibold text-text-secondary uppercase tracking-wide"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 grid-rows-5 flex-1 bg-white dark:bg-slate-900 overflow-y-auto">
              {/* Calendar Days */}

              {/* Current Month Days (Mocked Data based on design) */}
              {/* Current Month Days */}
              {calendarDays.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "border-b border-r border-surface-border p-2 flex flex-col gap-2 relative group hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors",
                    item.empty && "bg-gray-50/50 dark:bg-slate-800/50",
                    item.highlight && "bg-blue-50/50 dark:bg-blue-900/10",
                    item.current &&
                      "bg-primary-light dark:bg-blue-900/20 border-l-4 border-l-primary"
                  )}
                >
                  {!item.empty && (
                    <>
                      <div className="flex justify-between">
                        <span
                          className={cn(
                            "text-sm font-medium",
                            item.current
                              ? "text-primary font-bold"
                              : "text-text-secondary"
                          )}
                        >
                          {item.day}
                        </span>
                        {item.bestTime && (
                          <div title="Best time to post">
                            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                          </div>
                        )}
                        {item.current && (
                          <span className="text-[10px] text-primary font-bold uppercase">
                            Today
                          </span>
                        )}
                      </div>

                      {item.dropZone && (
                        <div className="border-2 border-dashed border-primary/40 bg-primary/5 rounded h-8 flex items-center justify-center">
                          <span className="text-[10px] text-primary font-bold uppercase tracking-wide">
                            Drop Here
                          </span>
                        </div>
                      )}

                      {item.events?.map((event, i) => (
                        <div
                          key={i}
                          className={cn(
                            "bg-white dark:bg-slate-800 border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-all shadow-sm group/event",
                            event.opacity && "opacity-60"
                          )}
                          style={{
                            borderLeftColor: event.color,
                            borderLeftWidth: "4px",
                          }}
                        >
                          {event.imageUrl && (
                            <div className="h-12 w-full bg-slate-100 dark:bg-slate-700 relative overflow-hidden">
                              <img
                                src={event.imageUrl}
                                alt="Post"
                                className="w-full h-full object-cover group-hover/event:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-1.5">
                            <div className="flex items-center justify-between mb-0.5">
                              {event.time && (
                                <span className="text-[9px] font-mono text-text-secondary bg-slate-100 dark:bg-slate-700 px-1 rounded">
                                  {event.time}
                                </span>
                              )}
                              <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: event.color }}
                              ></div>
                            </div>
                            <p className="text-[10px] text-text-main dark:text-gray-200 font-medium line-clamp-2 leading-tight">
                              {event.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
