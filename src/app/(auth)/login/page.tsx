"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Linkedin,
  Facebook,
  Chrome,
} from "lucide-react";
import { authService } from "@/lib/auth/auth-service";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function onEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Login simulation successful!");
    }, 2000);
    // await authService.loginWithEmail(email);
  }

  const handleSocialLogin = (provider: "google" | "linkedin" | "facebook") => {
    setIsLoading(true);
    authService.loginWithSocial(provider);
    setTimeout(() => setIsLoading(false), 2000); // clear loading for demo
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-xl dark:bg-gray-950/50">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to manage your cross-platform content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="name@company.com"
                  type="email"
                  className="pl-9 bg-gray-50/50"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="pl-9 bg-gray-50/50"
                  required
                />
              </div>
            </div>
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-md"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In with Email
            </Button>
          </form>

          <div className="relative mt-6 mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/80 px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
              className="flex flex-col h-auto py-3 gap-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
            >
              <Chrome className="h-5 w-5" />
              <span className="text-xs">Google</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("linkedin")}
              disabled={isLoading}
              className="flex flex-col h-auto py-3 gap-1 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
            >
              <Linkedin className="h-5 w-5" />
              <span className="text-xs">LinkedIn</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading}
              className="flex flex-col h-auto py-3 gap-1 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-200"
            >
              <Facebook className="h-5 w-5" />
              <span className="text-xs">Facebook</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
