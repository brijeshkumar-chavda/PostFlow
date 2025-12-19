"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface User {
  name: string;
  email: string;
  token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // 1. Mock Bypass for Test User (so frontend works without backend being ready)
    if (email === "test@gmail.com" && password === "123") {
      console.log("[AuthService] Mock login successful");
      const mockUser = {
        name: "Alex Johnson",
        email: email,
        token: "mock-jwt-token-123",
      };
      localStorage.setItem("user", JSON.stringify(mockUser));
      return mockUser;
    }

    // 2. Real API Call
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("[AuthService] Login error:", error);
      throw error;
    }
  },

  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      return await response.json();
    } catch (error) {
      console.error("[AuthService] Register error:", error);
      throw error;
    }
  },

  loginWithSocial: async (provider: "google" | "linkedin" | "facebook") => {
    console.log(`[AuthService] Social login with ${provider} (mock)`);
    // TODO: Implement real OAuth flow with .NET backend
  },

  logout: async () => {
    localStorage.removeItem("user");
    // Optional: Call backend to invalidate token if needed
  },

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },
};
