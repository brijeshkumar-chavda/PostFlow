"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { authService } from "@/lib/auth/auth-service";
import {
  GoogleIcon,
  LinkedInIcon,
  FacebookIcon,
} from "@/components/ui/social-icons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For test user or demo purposes, allow login
      if (email === "test@gmail.com" && password === "123") {
        router.push("/dashboard");
      } else {
        // Allow any login for now as requested "login easily",
        // but prioritizing the specific test case they mentioned.
        router.push("/dashboard");
      }
    }, 1500);
  }

  const handleSocialLogin = (provider: "google" | "linkedin" | "facebook") => {
    setIsLoading(true);
    authService.loginWithSocial(provider);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <>
      <div className="lg:hidden flex justify-center mb-6">
        <div className="flex items-center gap-2">
          <div className="size-8 flex items-center justify-center rounded bg-primary/20 text-primary">
            <Sparkles className="h-5 w-5 fill-current" />
          </div>
          <h2 className="text-black dark:text-white text-xl font-bold">
            PostFlow AI
          </h2>
        </div>
      </div>

      <div className="w-full">
        <div className="flex border-b border-gray-200 dark:border-border-dark">
          <Link
            href="/login"
            className="flex-1 pb-4 text-center text-sm font-semibold border-b-2 border-primary text-black dark:text-white transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="flex-1 pb-4 text-center text-sm font-semibold border-b-2 border-transparent text-gray-500 dark:text-text-secondary hover:text-black dark:hover:text-white transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <div className="text-center lg:text-left">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-text-secondary">
          Enter your credentials to access your dashboard.
        </p>
      </div>

      <form onSubmit={onEmailSubmit} className="mt-8 space-y-6">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <div className="mt-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-text-secondary">
                <Mail className="h-5 w-5" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border-0 py-3 pl-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-border-dark placeholder:text-gray-400 dark:placeholder:text-text-secondary focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-surface-dark sm:text-sm sm:leading-6 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-text-secondary">
                <Lock className="h-5 w-5" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border-0 py-3 pl-10 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-border-dark placeholder:text-gray-400 dark:placeholder:text-text-secondary focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-surface-dark sm:text-sm sm:leading-6 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-text-secondary hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-lg bg-primary px-3 py-3.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "Log in"
            )}
          </button>
        </div>
      </form>

      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-border-dark"></div>
        </div>
        <div className="relative flex justify-center text-sm font-medium leading-6">
          <span className="bg-white dark:bg-background-dark px-4 text-gray-500 dark:text-text-secondary">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => handleSocialLogin("google")}
          className="flex w-full items-center justify-center rounded-lg bg-white dark:bg-surface-dark px-3 py-2.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-border-dark hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        >
          <GoogleIcon className="h-5 w-5" />
          <span className="sr-only">Google</span>
        </button>
        <button
          onClick={() => handleSocialLogin("linkedin")}
          className="flex w-full items-center justify-center rounded-lg bg-white dark:bg-surface-dark px-3 py-2.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-border-dark hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        >
          <LinkedInIcon className="h-5 w-5" />
          <span className="sr-only">LinkedIn</span>
        </button>
        <button
          onClick={() => handleSocialLogin("facebook")}
          className="flex w-full items-center justify-center rounded-lg bg-white dark:bg-surface-dark px-3 py-2.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-border-dark hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        >
          <FacebookIcon className="h-5 w-5" />
          <span className="sr-only">Facebook</span>
        </button>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          By continuing, you agree to our{" "}
          <a href="#" className="font-medium text-primary hover:text-blue-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="font-medium text-primary hover:text-blue-500">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </>
  );
}
