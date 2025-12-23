"use client";

import React from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Calendar,
  Briefcase,
  Camera,
  Pencil,
  MapPin, // Fallback for location/other
  Send,
  Linkedin,
  Instagram,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SchedulePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPreviewMedia: File | null;
  postContent: string;
}

export function SchedulePostModal({
  isOpen,
  onClose,
  selectedPreviewMedia,
  postContent,
}: SchedulePostModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="w-full max-w-5xl bg-white dark:bg-[#1a2632] rounded-xl shadow-2xl overflow-hidden flex flex-col relative border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-200 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700 shrink-0">
          <div>
            <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">
              Schedule Your Post
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal mt-1">
              Select the optimal time to publish to your selected platforms.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden">
          {/* Left Column: Calendar */}
          <div className="flex-1 p-6 lg:border-r border-slate-100 dark:border-slate-700 overflow-y-auto">
            <div className="max-w-[400px] mx-auto">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6 px-2">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-900 dark:text-white">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <p className="text-slate-900 dark:text-white text-base font-bold">
                  October 2023
                </p>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-900 dark:text-white">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-x-1 gap-y-2">
                {/* Days of week */}
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div
                    key={i}
                    className="text-slate-400 dark:text-slate-500 text-[13px] font-bold text-center py-2"
                  >
                    {day}
                  </div>
                ))}

                {/* Empty slots for previous month */}
                <div className="h-10 w-full"></div>
                <div className="h-10 w-full"></div>
                <div className="h-10 w-full"></div>

                {/* Days 1-31 (Static simulation as per design) */}
                {[...Array(30)].map((_, i) => {
                  const day = i + 1;
                  const isSelected = day === 5;

                  return (
                    <button
                      key={day}
                      className={cn(
                        "h-10 w-full flex items-center justify-center text-sm font-medium rounded-full transition-all",
                        isSelected
                          ? "bg-primary text-white font-bold shadow-md shadow-primary/30"
                          : "text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Details & Preview */}
          <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
            {/* Post Preview Card */}
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-lg p-4 flex items-center gap-4">
              <div className="shrink-0 rounded-lg overflow-hidden h-16 w-16 bg-slate-200 dark:bg-slate-700 relative">
                {selectedPreviewMedia ? (
                  selectedPreviewMedia.type.startsWith("video") ? (
                    <video
                      src={URL.createObjectURL(selectedPreviewMedia)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      className="w-full h-full object-cover"
                      src={URL.createObjectURL(selectedPreviewMedia)}
                      alt="Post Media"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Camera className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-slate-900 dark:text-white text-sm font-semibold truncate">
                  {postContent || "Post content preview..."}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Publishing to:
                  </span>
                  <div className="flex gap-1.5 items-center">
                    <Linkedin className="h-[18px] w-[18px] text-[#0077b5]" />
                    <Instagram className="h-[18px] w-[18px] text-[#E1306C]" />
                  </div>
                </div>
              </div>
              <button className="shrink-0 text-primary hover:text-primary/80 transition-colors">
                <Pencil className="h-5 w-5" />
              </button>
            </div>

            {/* Time Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-slate-900 dark:text-slate-200 text-sm font-medium">
                  Time
                </span>
                <div className="relative">
                  <input
                    className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white h-11 px-3 focus:ring-2 focus:ring-primary focus:border-primary border outline-none transition-all"
                    type="time"
                    defaultValue="10:00"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-slate-900 dark:text-slate-200 text-sm font-medium">
                  Time Zone
                </span>
                <div className="relative">
                  <select className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white h-11 px-3 focus:ring-2 focus:ring-primary focus:border-primary appearance-none border outline-none transition-all pr-10">
                    <option>(UTC-05:00) Eastern Time</option>
                    <option>(UTC-08:00) Pacific Time</option>
                    <option>(UTC+00:00) London</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none h-5 w-5" />
                </div>
              </label>
            </div>

            {/* AI Suggestion */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex gap-3 items-start">
              <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-slate-900 dark:text-white text-sm font-medium">
                  AI Suggestion
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-xs mt-0.5 leading-relaxed">
                  Your audience engagement peaks at{" "}
                  <span className="font-bold text-primary">10:00 AM</span> on
                  Tuesdays. We&apos;ve selected this time for you.
                </p>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1 hidden lg:block"></div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700 mt-auto">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In future this would save
                  onClose();
                  alert("Post scheduled!");
                }}
                className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium shadow-md shadow-primary/20 transition-all flex items-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
