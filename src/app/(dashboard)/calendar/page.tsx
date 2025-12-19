"use client";

import { useState } from "react";
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
}

interface CalendarDay {
  day: number;
  events?: CalendarEvent[];
  bestTime?: boolean;
  highlight?: boolean;
  dropZone?: boolean;
  current?: boolean;
}

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "week" | "list">("month");

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Header */}
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
              4 Drafts
            </span>
          </div>
          <div className="p-4 pb-0">
            <button className="w-full group flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-primary/20 bg-primary/10 hover:bg-primary/20 transition-all text-primary text-xs font-bold">
              <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
              Auto-Schedule with AI
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Draft Item 1 */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-3 cursor-move hover:border-primary/50 hover:shadow-md transition-all group relative">
              <div className="absolute top-3 right-3 text-gray-400 group-hover:text-primary cursor-grab">
                <GripVertical className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#0a66c2]">
                  <Linkedin className="h-3.5 w-3.5 fill-current" />
                </div>
                <span className="text-[10px] font-semibold text-text-secondary">
                  LINKEDIN
                </span>
              </div>
              <p className="text-sm text-text-main dark:text-gray-200 line-clamp-2 leading-relaxed mb-3">
                Excited to announce our Q4 roadmap! We're focusing on scaling
                infrastructure and improving UX. #tech #roadmap
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="h-8 w-8 rounded-md bg-cover bg-center border border-gray-200 dark:border-slate-700"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxUYF0YHU0YE0WxJjmWq_rTlZj7XDFcTud8IrGHhCEd-IupQlfiR3NBg-pC2O1QQXt2OTOzGLJmwwatjzGWCc3I2mpY7ekY4IC2B3c8rBFXvSFGKP2JrIg7Z-7iBcTcdfXdRSFFIgW94KXVhalv9hsv-Ck0cRiR56_L1rV5yOgRvZvqSIxehz0B0Y6T_ZGRjQ50EOcLTpz4hC6f5st17sf4AOis7UjT2h8mINB2SU3idqwg-Hl_NRsf4NtNN94dhVRK9C1Bf7aPfTz")',
                  }}
                ></div>
                <span className="text-[10px] text-text-secondary italic">
                  No date set
                </span>
              </div>
            </div>

            {/* Draft Item 2 */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-3 cursor-move hover:border-primary/50 hover:shadow-md transition-all group relative">
              <div className="absolute top-3 right-3 text-gray-400 group-hover:text-primary cursor-grab">
                <GripVertical className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-pink-50 dark:bg-pink-900/30 flex items-center justify-center text-[#E1306C]">
                  <Instagram className="h-3.5 w-3.5" />
                </div>
                <span className="text-[10px] font-semibold text-text-secondary">
                  INSTAGRAM
                </span>
              </div>
              <p className="text-sm text-text-main dark:text-gray-200 line-clamp-2 leading-relaxed mb-3">
                Office vibes today 🌿☕️ Getting ready for the weekend launch.
                #startuplife
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="h-8 w-8 rounded-md bg-cover bg-center border border-gray-200 dark:border-slate-700"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAMbmE51VWAyMN-pr1XEq0BwU_sX4WPCb3q6xRu5LhHb1mOtzbC6Wg4QRWKBJuxgMBzccc6BIThRrDJNscrEU3OJaLIHWEyfialfC1Asi-YEDYooxlpgFvbvQMA3smxCvPH6ntSceDXDym6RuESCQg8kWgFoSQlVIluEgF4GX44FrMqbgqGYcMZm6poRRd70-ws-yXvQ0M80im186d-CTXIEFgcdGpA99taR6KJd0Ffp5xzWOsAPJWm1hJjMW18eB7RLo39yc6ahltl")',
                  }}
                ></div>
                <span className="text-[10px] text-text-secondary italic">
                  No date set
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area - Calendar */}
        <div className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-4 px-2">
            <div className="flex items-center gap-4">
              <button className="hover:bg-gray-200 dark:hover:bg-slate-700 p-1.5 rounded-full transition-colors text-text-main dark:text-white">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h3 className="text-xl font-bold text-text-main dark:text-white">
                October 2023
              </h3>
              <button className="hover:bg-gray-200 dark:hover:bg-slate-700 p-1.5 rounded-full transition-colors text-text-main dark:text-white">
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
              {/* Previous Month Days */}
              <div className="border-b border-r border-surface-border bg-gray-50 dark:bg-slate-800/50 p-2 flex flex-col gap-2 min-h-[100px]">
                <span className="text-sm font-medium text-gray-400">29</span>
              </div>
              <div className="border-b border-r border-surface-border bg-gray-50 dark:bg-slate-800/50 p-2 flex flex-col gap-2 min-h-[100px]">
                <span className="text-sm font-medium text-gray-400">30</span>
              </div>

              {/* Current Month Days (Mocked Data based on design) */}
              {/* Current Month Days (Mocked Data based on design) */}
              {(
                [
                  { day: 1 },
                  {
                    day: 2,
                    events: [
                      {
                        color: "#0a66c2",
                        title: "Product Launch Teaser",
                      },
                    ],
                  },
                  {
                    day: 3,
                    bestTime: true,
                    events: [
                      {
                        color: "#E1306C",
                        title: "Behind Scenes Reel",
                      },
                      {
                        color: "#0a66c2",
                        title: "Article Share",
                        opacity: true,
                      },
                    ],
                    highlight: true,
                  },
                  { day: 4 },
                  { day: 5 },
                  { day: 6 },
                  { day: 7, bestTime: true, highlight: true },
                  { day: 8 },
                  { day: 9, dropZone: true },
                  { day: 10 },
                  {
                    day: 11,
                    events: [
                      {
                        color: "#E1306C",
                        title: "Weekend Vibes",
                      },
                    ],
                  },
                  { day: 12 },
                  { day: 13 },
                  { day: 14 },
                  { day: 15 },
                  { day: 16, current: true },
                  ...Array.from({ length: 14 }, (_, i) => ({ day: 17 + i })),
                  {
                    day: 31,
                    events: [
                      {
                        color: "#0a66c2",
                        title: "Halloween Post",
                      },
                    ],
                  },
                ] as CalendarDay[]
              ).map((item) => (
                <div
                  key={item.day}
                  className={cn(
                    "border-b border-r border-surface-border p-2 flex flex-col gap-2 relative group hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors",
                    item.highlight && "bg-blue-50/50 dark:bg-blue-900/10",
                    item.current &&
                      "bg-primary-light dark:bg-blue-900/20 border-l-4 border-l-primary"
                  )}
                >
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
                        "bg-white dark:bg-slate-800 border-2 rounded px-2 py-1.5 cursor-pointer hover:border-primary transition-colors flex items-center gap-2 shadow-sm",
                        event.opacity && "opacity-60"
                      )}
                      style={{ borderColor: `${event.color}4D` }} // 30% opacity border
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: event.color }}
                      ></div>
                      <span className="text-[10px] text-text-main dark:text-gray-200 font-medium truncate">
                        {event.title}
                      </span>
                    </div>
                  ))}
                </div>
              ))}

              {/* Next Month Days */}
              <div className="border-r border-surface-border bg-gray-50 dark:bg-slate-800/50 p-2 flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-400">1</span>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800/50 p-2 flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-400">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
