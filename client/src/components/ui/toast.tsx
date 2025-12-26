"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (props: {
    title: string;
    description?: string;
    type?: ToastType;
    duration?: number;
  }) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    ({
      title,
      description,
      type = "info",
      duration = 4000,
    }: {
      title: string;
      description?: string;
      type?: ToastType;
      duration?: number;
    }) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, type }]);

      setTimeout(() => {
        dismiss(id);
      }, duration);
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center gap-2 p-4 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex w-full max-w-md items-start gap-4 overflow-hidden rounded-xl border p-4 shadow-lg transition-all animate-in slide-in-from-top-12 fade-in duration-300",
              // Glassmorphism and Colors
              "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md",
              t.type === "success" &&
                "border-emerald-500/20 shadow-emerald-500/10",
              t.type === "error" && "border-red-500/20 shadow-red-500/10",
              t.type === "warning" && "border-amber-500/20 shadow-amber-500/10",
              t.type === "info" && "border-blue-500/20 shadow-blue-500/10"
            )}
          >
            <div className="shrink-0 pt-0.5">
              {t.type === "success" && (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              )}
              {t.type === "error" && (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              {t.type === "warning" && (
                <AlertCircle className="h-5 w-5 text-amber-500" />
              )}
              {t.type === "info" && <Info className="h-5 w-5 text-blue-500" />}
            </div>
            <div className="flex-1 gap-1">
              <h3 className="font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100">
                {t.title}
              </h3>
              {t.description && (
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.description}
                </p>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 rounded-md p-1 text-slate-400 opacity-0 transition-opacity hover:text-slate-900 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 dark:text-slate-500 dark:hover:text-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
