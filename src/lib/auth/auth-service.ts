"use client";

import { createClient } from "@supabase/supabase-js";

// NOTE: We will replace these with env variables later.
// For now, the client is initialized without keys to prevent errors.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AuthProvider {
  loginWithEmail: (email: string) => Promise<void>;
  loginWithSocial: (
    provider: "google" | "linkedin" | "facebook"
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const authService: AuthProvider = {
  loginWithEmail: async (email: string) => {
    // Adapter pattern: Call Supabase magic link or password logic here
    console.log(`[AuthService] Logging in with email: ${email}`);
    // await supabase.auth.signInWithOtp({ email });
  },
  loginWithSocial: async (provider: "google" | "linkedin" | "facebook") => {
    // Adapter pattern: Call Supabase OAuth
    console.log(`[AuthService] Logging in with provider: ${provider}`);
    // await supabase.auth.signInWithOAuth({ provider });
  },
  logout: async () => {
    console.log("[AuthService] Logging out");
    await supabase.auth.signOut();
  },
};
