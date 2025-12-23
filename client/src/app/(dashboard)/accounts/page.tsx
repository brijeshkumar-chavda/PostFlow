"use client";

import { Users, Monitor, Linkedin, Instagram, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AccountsPage() {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur px-6 py-4 shrink-0 z-10 sticky top-0">
        <div className="flex items-center gap-4 lg:hidden">
          <h2 className="text-text-main dark:text-white text-lg font-bold">
            Accounts
          </h2>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-2 text-text-main dark:text-white">
            <Users className="text-primary h-6 w-6" />
            <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
              Connected Accounts
            </h2>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold text-sm rounded-lg transition-colors shadow-sm hover:shadow-md">
          <Plus className="h-4 w-4" />
          Add Account
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8 pb-20 scrollbar-hide">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                Social Media Profiles
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {/* LinkedIn */}
              <div className="flex items-center justify-between p-4 border border-blue-100 dark:border-slate-700 rounded-xl bg-gray-50/50 dark:bg-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#0a66c2]">
                    <Linkedin className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                      LinkedIn
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Connected as brijesh
                    </p>
                  </div>
                </div>
                <button className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors">
                  Disconnect
                </button>
              </div>

              {/* Instagram */}
              <div className="flex items-center justify-between p-4 border border-blue-100 dark:border-slate-700 rounded-xl bg-gray-50/50 dark:bg-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-50 dark:bg-pink-900/30 flex items-center justify-center text-[#E1306C]">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                      Instagram
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Connected as @brijesh_ux
                    </p>
                  </div>
                </div>
                <button className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors">
                  Disconnect
                </button>
              </div>

              {/* Add Account Button */}
              <button className="w-full py-2 flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl text-text-secondary hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-bold">
                + Add Another Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
