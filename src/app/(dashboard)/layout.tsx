"use client";

import {
  LayoutDashboard,
  FileEdit,
  Calendar,
  BarChart,
  Users,
  Settings,
  PlusCircle,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Composer (AI)", href: "/composer", icon: FileEdit },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Analytics", href: "/analytics", icon: BarChart },
    { name: "Accounts", href: "/accounts", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden selection:bg-primary selection:text-white">
      <div className="fixed top-4 right-4 z-[60]">
        <ThemeToggle />
      </div>
      {/* Sidebar for Desktop */}
      <aside className="hidden w-72 flex-col justify-between border-r border-border-blue/30 bg-surface-dark p-6 lg:flex">
        <div className="flex flex-col gap-8">
          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 ring-2 ring-border-blue"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQc3xK2hWb0ExptHgHP-yyz9OdrENSyk4oQEsbE7zlMyjLcLPbz-kSnFhkla6VJ8GqI_Flk5-X2j0imCeyYSID0av7xUZmxqMjvHiV0ftDR4O4eZbjls5z5y-GggavTzWRJr8gKMqhob9I5NPQkE-dSiQg_GNyDCVimR-3Fe_nXdB-Bywoh79a5DmV_i5YRiYV8SXSszgr9MKWVHfQ5hoIQ3nJcG1WhZqbI3RUcyEgKrvjGqYgIhdida24BhKrIeLC_IaCD2ivIC5K")',
              }}
            ></div>
            <div className="flex flex-col">
              <h1 className="text-white text-base font-bold leading-normal">
                Alex Johnson
              </h1>
              <p className="text-text-secondary text-sm font-normal leading-normal">
                @alexsocials
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all",
                    isActive
                      ? "bg-[#1d4ed8] border border-border-blue/50 text-white"
                      : "text-text-secondary hover:bg-[#1e40af] hover:text-white"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-white" : "group-hover:text-white"
                    )}
                  />
                  <span className="text-sm font-medium leading-normal">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <button className="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-wide hover:brightness-110 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)]">
            <PlusCircle className="h-5 w-5" />
            <span className="truncate">Create Post</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-surface-dark p-6 transition-transform duration-300 lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-xl font-bold">Menu</h1>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {/* Reuse content layout for mobile if simpler, or just duplicate structure */}
        <div className="flex flex-col gap-8 h-full">
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all",
                  pathname === item.href
                    ? "bg-[#1d4ed8] border border-border-blue/50 text-white"
                    : "text-text-secondary hover:bg-[#1e40af] hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium leading-normal">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <button className="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-wide hover:brightness-110 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              <PlusCircle className="h-5 w-5" />
              <span className="truncate">Create Post</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-surface-dark border-b border-border-blue/30">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="text-white font-bold">PostFlow</span>
          <div className="w-6" /> {/* Spacer */}
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
