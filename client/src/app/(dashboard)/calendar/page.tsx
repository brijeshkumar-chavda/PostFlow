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
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  color: string;
  title: string;
  opacity?: boolean;
  imageUrl?: string;
  time?: string;
  id: number;
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

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`http://localhost:5214/api/posts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts((prevPosts) => prevPosts.filter((p) => p.id !== id));
      } else {
        console.error("Failed to delete post");
        alert("Failed to delete post. Server responded with an error.");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Error deleting post. Check console for details.");
    }
  };

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
        id: post.id,
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
              Upcoming Posts
            </h3>
            <span className="bg-gray-100 dark:bg-slate-800 text-text-secondary text-[10px] px-2 py-0.5 rounded-full border border-gray-200 dark:border-slate-700">
              {
                posts.filter(
                  (p) =>
                    p.status === "scheduled" &&
                    new Date(p.scheduledTime) > new Date()
                ).length
              }{" "}
              Upcoming
            </span>
          </div>
          <div className="p-4 pb-0">
            {/* Auto-schedule button */}
            <button className="w-full group flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-primary/20 bg-primary/10 hover:bg-primary/20 transition-all text-primary text-xs font-bold">
              <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
              Auto-Schedule with AI
            </button>
          </div>
          {/* Upcoming Posts List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {posts
              .filter(
                (p) =>
                  p.status === "scheduled" &&
                  new Date(p.scheduledTime) > new Date()
              )
              .sort(
                (a, b) =>
                  new Date(a.scheduledTime).getTime() -
                  new Date(b.scheduledTime).getTime()
              )
              .map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg p-3 shadow-sm hover:shadow-md transition-all cursor-pointer group/post relative"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post.id);
                    }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/post:opacity-100 transition-all p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 z-10"
                    title="Delete Post"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  {/* Header: Icon + Time */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#0a66c2]">
                      <Linkedin className="h-3 w-3 fill-current" />
                    </div>
                    <span className="text-xs font-bold text-text-secondary dark:text-slate-400">
                      {new Date(post.scheduledTime).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      •{" "}
                      {new Date(post.scheduledTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  {/* Body: Content + Image */}
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-xs text-text-main dark:text-gray-200 font-medium line-clamp-2 leading-snug flex-1">
                      {post.content}
                    </p>
                    {post.mediaAssets && post.mediaAssets.length > 0 && (
                      <div className="h-9 w-9 flex-shrink-0 rounded bg-slate-100 dark:bg-slate-700 overflow-hidden">
                        <img
                          src={`http://localhost:5214${post.mediaAssets[0].url}`}
                          alt="Post"
                          className="w-full h-full object-cover group-hover/post:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            {posts.filter(
              (p) =>
                p.status === "scheduled" &&
                new Date(p.scheduledTime) > new Date()
            ).length === 0 && (
              <div className="text-center text-text-secondary text-sm py-8 bg-gray-50/50 dark:bg-slate-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-slate-700">
                <p>No upcoming posts</p>
                <p className="text-[10px] opacity-70 mt-1">
                  Schedule a post to see it here
                </p>
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

                      {/* Events */}
                      <div className="flex flex-col gap-1.5 mt-1">
                        {item.events?.map((event, i) => (
                          <div
                            key={i}
                            className={cn(
                              "bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg p-2.5 shadow-sm hover:shadow-md transition-all cursor-pointer group/event relative",
                              event.opacity && "opacity-60"
                            )}
                            style={{ borderLeft: `3px solid ${event.color}` }}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(event.id);
                              }}
                              className="absolute top-1 right-1 text-gray-400 hover:text-red-500 opacity-0 group-hover/event:opacity-100 transition-all p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 z-10"
                              title="Delete Post"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                            {/* Header: Icon + Time */}
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px]"
                                style={{ backgroundColor: event.color }}
                              >
                                {event.color === "#E1306C" ? (
                                  <Instagram className="w-3 h-3" />
                                ) : (
                                  <Linkedin className="w-3 h-3 fill-current" />
                                )}
                              </div>
                              {event.time && (
                                <span className="text-xs font-bold text-text-main dark:text-slate-200">
                                  {event.time}
                                </span>
                              )}
                            </div>

                            {/* Body: content + Image */}
                            <div className="flex justify-between items-start gap-2">
                              <p className="text-xs text-text-secondary dark:text-slate-300 font-medium line-clamp-2 leading-snug flex-1">
                                {event.title}
                              </p>
                              {event.imageUrl && (
                                <div className="h-9 w-9 flex-shrink-0 rounded bg-slate-100 dark:bg-slate-700 overflow-hidden">
                                  <img
                                    src={event.imageUrl}
                                    alt="Post"
                                    className="w-full h-full object-cover group-hover/event:scale-105 transition-transform duration-300"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
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
