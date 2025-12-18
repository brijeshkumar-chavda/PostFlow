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
  User,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  GoogleIcon,
  LinkedInIcon,
  FacebookIcon,
} from "@/components/ui/social-icons";
import { authService } from "@/lib/auth/auth-service";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      alert("Account creation simulation successful!");
    }, 2000);
  }

  const handleSocialSignup = (provider: "google" | "linkedin" | "facebook") => {
    setIsLoading(true);
    authService.loginWithSocial(provider);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-xl dark:bg-gray-950/50">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Start managing your social presence today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onEmailSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    type="text"
                    className="pl-9 bg-gray-50/50"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    type="text"
                    className="pl-9 bg-gray-50/50"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="name@company.com"
                  type="email"
                  className="pl-9 bg-gray-50/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 bg-gray-50/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-md"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <div className="relative mt-6 mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/80 px-2 text-muted-foreground">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialSignup("google")}
              disabled={isLoading}
              className="group flex flex-col h-auto py-3 gap-1 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
            >
              <GoogleIcon className="h-5 w-5 transition-all duration-300 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100" />
              <span className="text-xs text-gray-600 group-hover:text-gray-900">
                Google
              </span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialSignup("linkedin")}
              disabled={isLoading}
              className="group flex flex-col h-auto py-3 gap-1 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
            >
              <LinkedInIcon className="h-5 w-5 transition-all duration-300 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100" />
              <span className="text-xs text-gray-600 group-hover:text-gray-900">
                LinkedIn
              </span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialSignup("facebook")}
              disabled={isLoading}
              className="group flex flex-col h-auto py-3 gap-1 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
            >
              <FacebookIcon className="h-5 w-5 transition-all duration-300 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100" />
              <span className="text-xs text-gray-600 group-hover:text-gray-900">
                Facebook
              </span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
