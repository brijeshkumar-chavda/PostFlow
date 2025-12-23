"use client";

import {
  Sparkles,
  Lightbulb,
  FilePlus,
  Heart,
  Globe,
  TrendingUp,
  Briefcase,
  Camera,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-[1200px] p-4 md:p-8 lg:p-12 flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
            Welcome back, Alex
          </h2>
          <p className="text-text-secondary text-base font-normal">
            Here is your social media performance overview for{" "}
            <span className="text-primary font-medium">Monday, Oct 23</span>.
          </p>
        </div>
        <button className="flex lg:hidden items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-lg">
          Create Post
        </button>
      </header>

      {/* AI Insight */}
      <section className="@container">
        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-200 dark:border-border-blue bg-white dark:bg-[#1e293b] p-5 shadow-sm transition-all hover:border-primary/50 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-slate-900 dark:text-white text-base font-bold leading-tight flex items-center gap-2">
                <Sparkles className="sm:hidden text-primary h-5 w-5" />
                AI Insight Available
              </p>
              <p className="text-text-secondary text-sm md:text-base font-normal leading-normal">
                Your followers are highly active right now. Schedule a post to
                boost engagement by ~20%.
              </p>
            </div>
          </div>
          <button className="flex w-full md:w-auto min-w-[140px] cursor-pointer items-center justify-center gap-2 rounded-lg h-9 px-4 bg-primary/10 border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-white transition-all whitespace-nowrap">
            <Lightbulb className="h-[18px] w-[18px]" />
            Generate Idea
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Posts */}
        <div className="flex flex-col gap-3 rounded-xl p-6 border border-gray-200 dark:border-border-blue bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-[#334155] transition-colors group">
          <div className="flex justify-between items-start">
            <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">
              Total Posts
            </p>
            <FilePlus className="text-border-blue group-hover:text-primary transition-colors h-6 w-6" />
          </div>
          <div className="flex items-end gap-3">
            <p className="text-slate-900 dark:text-white text-3xl font-bold leading-none">
              124
            </p>
            <span className="inline-flex items-center text-primary text-sm font-medium bg-primary/10 px-2 py-0.5 rounded-full">
              <TrendingUp className="h-[14px] w-[14px] mr-0.5" />
              +2%
            </span>
          </div>
          <p className="text-text-secondary text-xs">vs. last month</p>
        </div>

        {/* Engagement */}
        <div className="flex flex-col gap-3 rounded-xl p-6 border border-gray-200 dark:border-border-blue bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-[#334155] transition-colors group">
          <div className="flex justify-between items-start">
            <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">
              Engagement
            </p>
            <Heart className="text-border-blue group-hover:text-primary transition-colors h-6 w-6" />
          </div>
          <div className="flex items-end gap-3">
            <p className="text-slate-900 dark:text-white text-3xl font-bold leading-none">
              4.5k
            </p>
            <span className="inline-flex items-center text-primary text-sm font-medium bg-primary/10 px-2 py-0.5 rounded-full">
              <TrendingUp className="h-[14px] w-[14px] mr-0.5" />
              +15%
            </span>
          </div>
          <p className="text-text-secondary text-xs">vs. last week</p>
        </div>

        {/* Total Reach */}
        <div className="flex flex-col gap-3 rounded-xl p-6 border border-gray-200 dark:border-border-blue bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-[#334155] transition-colors group">
          <div className="flex justify-between items-start">
            <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">
              Total Reach
            </p>
            <Globe className="text-border-blue group-hover:text-primary transition-colors h-6 w-6" />
          </div>
          <div className="flex items-end gap-3">
            <p className="text-slate-900 dark:text-white text-3xl font-bold leading-none">
              12.1k
            </p>
            <span className="inline-flex items-center text-primary text-sm font-medium bg-primary/10 px-2 py-0.5 rounded-full">
              <TrendingUp className="h-[14px] w-[14px] mr-0.5" />
              +8%
            </span>
          </div>
          <p className="text-text-secondary text-xs">vs. last week</p>
        </div>
      </section>

      {/* Main Charts Area */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="xl:col-span-2 flex flex-col rounded-xl border border-gray-200 dark:border-border-blue bg-white dark:bg-surface-dark p-6">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">
                Performance Trends
              </h3>
              <p className="text-text-secondary text-sm">
                LinkedIn vs Instagram Interactions
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#0f172a] p-1 rounded-lg border border-gray-200 dark:border-border-blue">
              <button className="px-3 py-1 text-xs font-medium bg-[#1d4ed8] text-white rounded shadow-sm">
                7D
              </button>
              <button className="px-3 py-1 text-xs font-medium text-text-secondary hover:text-white transition-colors">
                30D
              </button>
              <button className="px-3 py-1 text-xs font-medium text-text-secondary hover:text-white transition-colors">
                3M
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-[250px] relative w-full">
            {/* SVG Chart from User's Code */}
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 478 150"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="#3b82f6"
                    stopOpacity="0.2"
                  ></stop>
                  <stop
                    offset="100%"
                    stopColor="#3b82f6"
                    stopOpacity="0"
                  ></stop>
                </linearGradient>
              </defs>
              <path
                d="M0 109C18.15 109 18.15 21 36.3 21C54.46 21 54.46 41 72.6 41C90.7 41 90.7 93 108.9 93C127 93 127 33 145.2 33C163.4 33 163.4 101 181.5 101C199.7 101 199.7 61 217.8 61C236 61 236 45 254.1 45C272.3 45 272.3 121 290.4 121C308.6 121 308.6 149 326.7 149C344.9 149 344.9 1 363 1C381.2 1 381.2 81 399.4 81C417.5 81 417.5 129 435.7 129C453.8 129 453.8 25 472 25V149H0V109Z"
                fill="url(#chartGradient)"
              ></path>
              <path
                d="M0 109C18.15 109 18.15 21 36.3 21C54.46 21 54.46 41 72.6 41C90.7 41 90.7 93 108.9 93C127 93 127 33 145.2 33C163.4 33 163.4 101 181.5 101C199.7 101 199.7 61 217.8 61C236 61 236 45 254.1 45C272.3 45 272.3 121 290.4 121C308.6 121 308.6 149 326.7 149C344.9 149 344.9 1 363 1C381.2 1 381.2 81 399.4 81C417.5 81 417.5 129 435.7 129C453.8 129 453.8 25 472 25"
                fill="none"
                stroke="#3b82f6"
                strokeLinecap="round"
                strokeWidth="3"
              ></path>
              <path
                d="M0 130C20 130 20 80 40 80C60 80 60 100 80 100C100 100 100 120 120 120C140 120 140 60 160 60C180 60 180 90 200 90C220 90 220 50 240 50C260 50 260 110 280 110C300 110 300 130 320 130C340 130 340 40 360 40C380 40 380 70 400 70C420 70 420 100 440 100C460 100 460 60 472 60"
                fill="none"
                stroke="#94a3b8"
                strokeDasharray="6 6"
                strokeLinecap="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
          <div className="flex justify-between mt-4 px-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <p
                key={day}
                className="text-text-secondary text-xs font-bold uppercase tracking-wider"
              >
                {day}
              </p>
            ))}
          </div>
        </div>

        {/* Upcoming Queue */}
        <div className="flex flex-col rounded-xl border border-gray-200 dark:border-border-blue bg-white dark:bg-surface-dark overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-border-blue bg-gray-50 dark:bg-[#0f172a]">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">
              Upcoming Queue
            </h3>
          </div>
          <div className="flex flex-col p-2">
            {[
              {
                title: "Q3 Product Roadmap Announcement",
                time: "Tomorrow, 10:00 AM",
                icon: Briefcase,
                color: "text-[#0077b5]",
                border: "border-[#0077b5]/30",
                bg: "bg-[#0077b5]/20",
              },
              {
                title: "Behind the scenes: Team Lunch",
                time: "Wed, 2:30 PM",
                icon: Camera,
                color: "text-[#E1306C]",
                border: "border-[#E1306C]/30",
                bg: "bg-[#E1306C]/20",
              },
              {
                title: "Hiring Alert: Senior Designer",
                time: "Thu, 9:00 AM",
                icon: Briefcase,
                color: "text-[#0077b5]",
                border: "border-[#0077b5]/30",
                bg: "bg-[#0077b5]/20",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-[#334155] rounded-lg transition-colors cursor-pointer group"
              >
                <div
                  className={`flex-shrink-0 size-10 rounded ${item.bg} ${item.color} flex items-center justify-center border ${item.border}`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 dark:text-white text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="text-text-secondary h-[14px] w-[14px]" />
                    <p className="text-text-secondary text-xs">{item.time}</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
                </div>
              </div>
            ))}
            <a
              href="#"
              className="mt-2 text-center text-primary text-xs font-bold uppercase tracking-wide py-2 hover:bg-primary/5 rounded transition-colors"
            >
              View Full Calendar
            </a>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="flex flex-col gap-4">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold">
          Recent Activity
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-border-blue bg-white dark:bg-surface-dark">
          <table className="w-full text-left text-sm text-text-secondary">
            <thead className="bg-gray-50 dark:bg-[#0f172a] text-xs uppercase text-slate-500 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold">
                  Post
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  Platform
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-right">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-border-blue/50">
              <tr className="hover:bg-gray-50 dark:hover:bg-[#334155] transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  Introducing our new AI features
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <Briefcase className="h-[18px] w-[18px]" /> LinkedIn
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/40 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 dark:bg-green-400"></span>{" "}
                    Published
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-slate-900 dark:text-white font-medium">
                  1.2k views
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-[#334155] transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  Monday Motivation Quote
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <Camera className="h-[18px] w-[18px]" /> Instagram
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/40 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 dark:bg-green-400"></span>{" "}
                    Published
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-slate-900 dark:text-white font-medium">
                  85 likes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
