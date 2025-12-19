"use client";

import {
  User,
  Settings as SettingsIcon,
  Bell,
  Save,
  Moon,
  Sun,
  Laptop,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur px-6 py-4 shrink-0 z-10 sticky top-0">
        <div className="flex items-center gap-4 lg:hidden">
          <h2 className="text-text-main dark:text-white text-lg font-bold">
            Settings
          </h2>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-2 text-text-main dark:text-white">
            <SettingsIcon className="text-primary h-6 w-6" />
            <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
              Settings
            </h2>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold text-sm rounded-lg transition-colors shadow-sm hover:shadow-md">
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8 pb-20 scrollbar-hide">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Profile Section */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Information
              </h3>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="w-32 h-32 rounded-full bg-cover bg-center ring-4 ring-gray-100 dark:ring-slate-800 shadow-sm"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWZhSeadNRq5CT01JmMTPpDLm0I3QoAvSh34q55m-v1ihnztXXnGPy1bdkwziBr5ly0FqMD6u0RtN0ashAxITlJdX0euWp-aPyDq9DbdoLFsAgb12OQM2XzYtsLGSvSFkng9s4Ul8Zp_myglj0wBsIqm_8H1308YS87zoNscJoSxBlyJb6JUDaczDlM5r-qrYahLrvjOqJpFswSRSfSsMc-fVQFhvXjz9aa82V70ZUr_hL9YEcovYrs9IFmASq3GT2VIRsy0-mLqOC")',
                    }}
                  ></div>
                  <button className="text-sm font-semibold text-primary hover:text-primary-hover hover:underline">
                    Change Avatar
                  </button>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-blue-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main dark:text-white bg-transparent"
                      defaultValue="brijesh"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-blue-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main dark:text-white bg-transparent"
                      defaultValue="email@example.com"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-text-secondary">
                      Bio
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-blue-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main dark:text-white bg-transparent resize-none"
                      defaultValue="Digital content creator and social media strategist. Sharing tips on UX/UI and tech trends."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Preferences
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {/* Theme Settings */}
              <div>
                <label className="text-sm font-bold text-slate-800 dark:text-white block mb-3">
                  Appearance
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setTheme("light")}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all",
                      theme === "light"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800 text-text-secondary"
                    )}
                  >
                    <Sun className="h-6 w-6" />
                    Light
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all",
                      theme === "dark"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800 text-text-secondary"
                    )}
                  >
                    <Moon className="h-6 w-6" />
                    Dark
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all",
                      theme === "system"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800 text-text-secondary"
                    )}
                  >
                    <Laptop className="h-6 w-6" />
                    System
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div>
                <label className="text-sm font-bold text-slate-800 dark:text-white block mb-3">
                  Notifications
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-white">
                        Email Notifications
                      </p>
                      <p className="text-xs text-text-secondary">
                        Receive daily summaries and alerts.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-white">
                        Push Notifications
                      </p>
                      <p className="text-xs text-text-secondary">
                        Real-time alerts for engagement.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
