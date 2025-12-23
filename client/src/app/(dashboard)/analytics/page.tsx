"use client";

import {
  Search,
  Bell,
  Calendar,
  Download,
  Users,
  TrendingUp,
  Heart,
  Globe,
  MousePointerClick,
  ArrowRight,
  Sparkles,
  BarChart,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur px-6 py-4 shrink-0 z-10 sticky top-0">
        <div className="flex items-center gap-4 lg:hidden">
          <h2 className="text-text-main dark:text-white text-lg font-bold">
            Analytics
          </h2>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-2 text-text-main dark:text-white">
            <BarChart className="text-primary h-6 w-6" />
            <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
              Analytics Overview
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2 border border-transparent focus-within:border-primary/50 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all w-64">
            <Search className="text-text-secondary h-5 w-5" />
            <input
              className="bg-transparent border-none text-sm text-text-main dark:text-white focus:ring-0 placeholder-gray-500 w-full ml-2 outline-none"
              placeholder="Search metrics..."
              type="text"
            />
          </div>
          <button className="relative p-2 text-text-muted hover:text-primary transition-colors rounded-lg hover:bg-primary/10">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8 pb-20 scrollbar-hide">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Controls & Export */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="bg-surface-light dark:bg-surface-dark p-1 rounded-lg border border-border inline-flex shadow-sm">
              <button className="px-4 py-1.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white text-sm font-semibold shadow-sm border border-gray-200 dark:border-slate-600">
                All Platforms
              </button>
              <button className="px-4 py-1.5 rounded-md text-text-secondary hover:text-text-main dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors flex items-center gap-2">
                <span className="size-2 rounded-full bg-blue-500"></span>{" "}
                LinkedIn
              </button>
              <button className="px-4 py-1.5 rounded-md text-text-secondary hover:text-text-main dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors flex items-center gap-2">
                <span className="size-2 rounded-full bg-pink-500"></span>{" "}
                Instagram
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center bg-surface-light dark:bg-surface-dark border border-border rounded-lg px-3 py-1.5 text-sm text-text-main dark:text-white gap-2 cursor-pointer hover:border-blue-400 transition-colors shadow-sm">
                <Calendar className="h-4 w-4 text-text-secondary" />
                <span>Last 30 Days</span>
                <ChevronDown className="h-4 w-4 text-text-secondary" />
              </div>
              <button className="flex items-center gap-2 px-4 py-1.5 bg-primary hover:bg-primary-hover text-white font-bold text-sm rounded-lg transition-colors shadow-sm hover:shadow-md">
                <Download className="h-4 w-4" />
                Export Report
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Followers */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-border shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-text-secondary text-sm font-medium">
                    Total Followers
                  </p>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">
                    12,450
                  </h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> 5.2%
                </span>
                <span className="text-text-secondary text-xs">
                  vs last month
                </span>
              </div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
            </div>

            {/* Engagement Rate */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-border shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-text-secondary text-sm font-medium">
                    Engagement Rate
                  </p>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">
                    4.8%
                  </h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <Heart className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> 1.1%
                </span>
                <span className="text-text-secondary text-xs">
                  vs last month
                </span>
              </div>
            </div>

            {/* Reach */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-border shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-text-secondary text-sm font-medium">
                    Total Reach
                  </p>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">
                    45.2k
                  </h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <Globe className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> 12.3%
                </span>
                <span className="text-text-secondary text-xs">
                  vs last month
                </span>
              </div>
            </div>

            {/* CTR */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-border shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-text-secondary text-sm font-medium">
                    Avg. CTR
                  </p>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">
                    2.1%
                  </h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <MousePointerClick className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" /> 0.5%
                </span>
                <span className="text-text-secondary text-xs">
                  vs last month
                </span>
              </div>
            </div>
          </div>

          {/* AI Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl p-1 shadow-sm border border-blue-100 dark:border-slate-700">
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-lg px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-slate-800 p-2.5 rounded-lg shrink-0 border border-blue-100 dark:border-slate-700 shadow-sm">
                  <Sparkles className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-slate-800 dark:text-white font-bold text-sm mb-1">
                    AI Recommendation
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Your carousel posts on LinkedIn are performing{" "}
                    <span className="text-primary font-bold">20% better</span>{" "}
                    than text-only updates. Try repurposing your top Instagram
                    carousels.
                  </p>
                </div>
              </div>
              <button className="text-xs font-semibold bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm">
                Generate Carousel
              </button>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Audience Growth Chart */}
            <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark rounded-xl border border-border p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-slate-800 dark:text-white font-bold text-lg">
                  Audience Growth
                </h3>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>{" "}
                    Total
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>{" "}
                    LinkedIn
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>{" "}
                    Instagram
                  </span>
                </div>
              </div>
              <div className="h-64 w-full flex items-end gap-1 relative pt-10 pl-6 border-l border-b border-gray-200 dark:border-slate-700">
                {/* Horizontal grid lines */}
                {[0, 0.25, 0.5, 0.75].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 h-px bg-gray-100 dark:bg-slate-800"
                    style={{ top: `${pos * 100}%` }}
                  ></div>
                ))}
                {/* Y-axis labels */}
                <div className="absolute -left-8 top-0 text-xs text-gray-400">
                  15k
                </div>
                <div className="absolute -left-8 top-1/4 text-xs text-gray-400">
                  10k
                </div>
                <div className="absolute -left-8 top-2/4 text-xs text-gray-400">
                  5k
                </div>
                <div className="absolute -left-8 top-3/4 text-xs text-gray-400">
                  2k
                </div>

                <svg
                  className="absolute inset-0 w-full h-full overflow-visible p-6"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,80 Q40,75 80,60 T160,50 T240,40 T320,30 T400,20 T480,10"
                    fill="none"
                    stroke="#0a66c2" // LinkedIn color (primary)
                    strokeWidth="3"
                  ></path>
                  <path
                    d="M0,120 Q40,115 80,110 T160,105 T240,90 T320,85 T400,80 T480,75"
                    fill="none"
                    opacity="0.7"
                    stroke="#3b82f6"
                    strokeDasharray="4,4"
                    strokeWidth="2"
                  ></path>
                  <path
                    d="M0,150 Q40,145 80,140 T160,135 T240,120 T320,105 T400,90 T480,85"
                    fill="none"
                    opacity="0.7"
                    stroke="#ec4899"
                    strokeDasharray="4,4"
                    strokeWidth="2"
                  ></path>
                  <circle
                    cx="240"
                    cy="40"
                    fill="#0a66c2"
                    r="5"
                    stroke="#ffffff"
                    strokeWidth="2"
                  ></circle>
                  <g transform="translate(250, 20)">
                    <rect fill="#1e293b" height="40" rx="4" width="90"></rect>
                    <text fill="#9ca3af" fontSize="10" x="10" y="16">
                      May 12
                    </text>
                    <text
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                      x="10"
                      y="30"
                    >
                      14,230
                    </text>
                  </g>
                </svg>

                {/* X-axis labels */}
                {["May 1", "May 8", "May 15", "May 22", "May 29"].map(
                  (date, i) => (
                    <div
                      key={i}
                      className="absolute -bottom-6 text-xs text-gray-400"
                      style={{ left: `${i * 25}%` }}
                    >
                      {date}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Demographics Chart */}
            <div className="lg:col-span-1 bg-surface-light dark:bg-surface-dark rounded-xl border border-border p-6 shadow-sm flex flex-col">
              <h3 className="text-slate-800 dark:text-white font-bold text-lg mb-6">
                Demographics
              </h3>
              <div className="relative flex-1 flex items-center justify-center my-4 min-h-[200px]">
                <svg
                  className="rotate-[-90deg]"
                  height="180"
                  viewBox="0 0 100 100"
                  width="180"
                >
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    r="40"
                    stroke="#f1f5f9"
                    strokeWidth="12"
                    className="dark:stroke-slate-800"
                  ></circle>
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    r="40"
                    stroke="#0a66c2"
                    strokeDasharray="100 251"
                    strokeDashoffset="0"
                    strokeWidth="12"
                  ></circle>
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    r="40"
                    stroke="#3b82f6"
                    strokeDasharray="60 251"
                    strokeDashoffset="-100"
                    strokeWidth="12"
                  ></circle>
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    r="40"
                    stroke="#ec4899"
                    strokeDasharray="40 251"
                    strokeDashoffset="-160"
                    strokeWidth="12"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-slate-800 dark:text-white">
                    42%
                  </span>
                  <span className="text-xs text-text-secondary">Tech</span>
                </div>
              </div>
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                    <span className="text-text-secondary">Tech Industry</span>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    42%
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-text-secondary">Marketing</span>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    25%
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                    <span className="text-text-secondary">Creative</span>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    18%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Posts */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-slate-800 dark:text-white font-bold text-lg">
                  Top Performing Posts
                </h3>
                <a
                  className="text-primary text-sm font-medium hover:underline"
                  href="#"
                >
                  View All
                </a>
              </div>
              <div className="space-y-4">
                {/* Post 1 */}
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-slate-700">
                  <div
                    className="w-16 h-16 rounded-md bg-cover bg-center shrink-0 shadow-sm"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtjG32NGB8Ya5JeHMJH4t9OShRoZrxgTqljVla0asMDcBTv-vS4Jc4OXESTMhUxwnYyerZmAC4mwwM1r321I6fo6pfDDGk5_sBaRVXEvWZ8T15Wc6K-Z_EgMrFeAU5sQZ4mu6HIOiMgU1_63LUiwdWdb5JsAEH2rn5H4_-TlTfPaE0uIj1JkPeQ3FN1FzxYsZuiEb0qDNz1sTQ0Lg9GslIdL_pLFrzsikPjlNPE_zoyTuHp2WywQaRRKaV1AbYQz5RZvuTFrfdGKIH")',
                    }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 p-0.5 rounded text-[10px] leading-none px-1.5 font-bold">
                        LI
                      </span>
                      <p className="text-slate-800 dark:text-white text-sm font-semibold truncate">
                        10 Tips for Better UX Design in 2024
                      </p>
                    </div>
                    <p className="text-text-secondary text-xs">
                      Posted 2 days ago
                    </p>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <p className="text-slate-800 dark:text-white font-bold text-sm">
                        2.4k
                      </p>
                      <p className="text-[10px] text-text-secondary">Likes</p>
                    </div>
                    <div>
                      <p className="text-slate-800 dark:text-white font-bold text-sm">
                        142
                      </p>
                      <p className="text-[10px] text-text-secondary">Comm.</p>
                    </div>
                  </div>
                </div>

                {/* Post 2 */}
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-slate-700">
                  <div
                    className="w-16 h-16 rounded-md bg-cover bg-center shrink-0 shadow-sm"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJG4YUsOi1rLIHPoeQwGmd-AYluWFuljkEgWo2G36If0oH0KwGYyZIkY8-OaqKtaIknylDNNQBe633RciBRbnWHZ5Wo0sYj1ocCYG4-qM-43xDT5dzwi7s4gvq5DgNEJgPK1eSa7_rVEw0HQ95mabVEyXNyChQDGGkz3-Qu5IBet0skRdQBRl5WPXjNT2I5iGpRVOayIRepN0NIJE6fx758RrWwzZMjIc6c-Z3SDMPw7JIBD0J0MwPb1EejlysA2zJiJfcB1S2NlfE")',
                    }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 p-0.5 rounded text-[10px] leading-none px-1.5 font-bold">
                        IG
                      </span>
                      <p className="text-slate-800 dark:text-white text-sm font-semibold truncate">
                        Behind the scenes at our new office!
                      </p>
                    </div>
                    <p className="text-text-secondary text-xs">
                      Posted 5 days ago
                    </p>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <p className="text-slate-800 dark:text-white font-bold text-sm">
                        1.8k
                      </p>
                      <p className="text-[10px] text-text-secondary">Likes</p>
                    </div>
                    <div>
                      <p className="text-slate-800 dark:text-white font-bold text-sm">
                        89
                      </p>
                      <p className="text-[10px] text-text-secondary">Comm.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Time to Post */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-slate-800 dark:text-white font-bold text-lg">
                  Best Time to Post
                </h3>
                <div className="flex items-center gap-2">
                  <span className="size-3 bg-blue-100 dark:bg-blue-900/30 rounded-sm"></span>
                  <span className="text-[10px] text-text-secondary">Low</span>
                  <span className="size-3 bg-primary rounded-sm ml-2"></span>
                  <span className="text-[10px] text-text-secondary">High</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 h-full justify-center">
                <div className="grid grid-cols-8 gap-1 text-[10px] text-text-secondary text-center mb-1">
                  <div></div>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <div key={day}>{day}</div>
                    )
                  )}
                </div>
                {/* 9am Row */}
                <div className="grid grid-cols-8 gap-1 items-center">
                  <div className="text-[10px] text-text-secondary text-right pr-2">
                    9am
                  </div>
                  <div className="h-6 rounded bg-blue-100 dark:bg-blue-900/30"></div>
                  <div className="h-6 rounded bg-blue-300 dark:bg-blue-700/50"></div>
                  <div className="h-6 rounded bg-primary/40"></div>
                  <div className="h-6 rounded bg-primary/60"></div>
                  <div className="h-6 rounded bg-blue-100 dark:bg-blue-900/30"></div>
                  <div className="h-6 rounded bg-slate-100 dark:bg-slate-800"></div>
                  <div className="h-6 rounded bg-slate-100 dark:bg-slate-800"></div>
                </div>
                {/* 12pm Row */}
                <div className="grid grid-cols-8 gap-1 items-center">
                  <div className="text-[10px] text-text-secondary text-right pr-2">
                    12pm
                  </div>
                  <div className="h-6 rounded bg-blue-300 dark:bg-blue-700/50"></div>
                  <div className="h-6 rounded bg-primary/80"></div>
                  <div className="h-6 rounded bg-primary"></div>
                  <div className="h-6 rounded bg-primary/80"></div>
                  <div className="h-6 rounded bg-blue-300 dark:bg-blue-700/50"></div>
                  <div className="h-6 rounded bg-slate-100 dark:bg-slate-800"></div>
                  <div className="h-6 rounded bg-slate-100 dark:bg-slate-800"></div>
                </div>
                {/* 3pm Row */}
                <div className="grid grid-cols-8 gap-1 items-center">
                  <div className="text-[10px] text-text-secondary text-right pr-2">
                    3pm
                  </div>
                  <div className="h-6 rounded bg-blue-100 dark:bg-blue-900/30"></div>
                  <div className="h-6 rounded bg-primary/30"></div>
                  <div className="h-6 rounded bg-primary/50"></div>
                  <div className="h-6 rounded bg-primary/40"></div>
                  <div className="h-6 rounded bg-blue-100 dark:bg-blue-900/30"></div>
                  <div className="h-6 rounded bg-slate-100 dark:bg-slate-800"></div>
                  <div className="h-6 rounded bg-slate-100 dark:bg-slate-800"></div>
                </div>
                {/* 6pm Row */}
                <div className="grid grid-cols-8 gap-1 items-center">
                  <div className="text-[10px] text-text-secondary text-right pr-2">
                    6pm
                  </div>
                  <div className="h-6 rounded bg-slate-100 dark:bg-slate-800"></div>
                  <div className="h-6 rounded bg-blue-100 dark:bg-blue-900/30"></div>
                  <div className="h-6 rounded bg-blue-300 dark:bg-blue-700/50"></div>
                  <div className="h-6 rounded bg-blue-100 dark:bg-blue-900/30"></div>
                  <div className="h-6 rounded bg-slate-100 dark:bg-slate-800"></div>
                  <div className="h-6 rounded bg-slate-100 dark:bg-slate-800"></div>
                  <div className="h-6 rounded bg-slate-100 dark:bg-slate-800"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
