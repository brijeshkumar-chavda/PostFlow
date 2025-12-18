# Cross Platform Post App

## 🚀 Project Overview

A powerful, AI-enhanced social media management tool designed to streamline the process of creating and scheduling posts for LinkedIn and Instagram. The "PostMaster" application allows users to create content once and distribute it seamlessly across multiple platforms.

## 🎯 Problem Statement

Content creators and businesses struggle with:

- **Inefficiency**: Manually posting to LinkedIn, Instagram, and Facebook takes time.
- **Fragmentation**: Managing multiple tabs and apps for different social networks.
- **Content Block**: Difficulty coming up with engaging captions and hashtags.
- **Inconsistency**: Failing to maintain a regular posting schedule.

## 💡 Solution

A unified dashboard where users can:

1.  **Create**: Write posts with AI assistance for captions and hashtag generation.
2.  **Visualize**: Preview how the post will look on each specific platform (LinkedIn vs. Instagram).
3.  **Schedule**: Set a specific date and time for publication.
4.  **Analyze**: Track engagement metrics (likes, comments, reach) in one place.

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3 + shadcn/ui
- **Icons**: Official Brand SVGs + Lucide React
- **State Management**: Zustand

### Backend & Infrastructure

- **BaaS**: Supabase (Auth, Database, Storage, Edge Functions)
- **Authentication**: Supabase Auth (Email/Password, Google, LinkedIn, Facebook)
- **Database**: PostgreSQL (via Supabase)

## 🔑 Key Features

### 1. Authentication System

- Secure Login & Signup pages.
- Social Login integration (Google, LinkedIn, Facebook).
- Password visibility toggle.
- Professional, trustworthy UI design.

### 2. Dashboard ("Command Center")

- **Overview**: Quick stats (Total Posts, Engagement, Reach).
- **Sidebar Navigation**: Easy access to all core modules.
- **Recent Activity**: Snapshot of upcoming or recently published posts.

### 3. Smart Post Creator

- **Multi-Platform Support**: Toggle LinkedIn / Instagram targets.
- **AI Assistant**: Generate professional or casual captions instantly.
- **Media Upload**: Drag-and-drop images/videos.
- **Live Preview**: Real-time mobile/desktop preview of the post.

### 4. Scheduler

- Calendar view of queued posts.
- Drag-and-drop rescheduling.
- Timezone management.

### 5. Analytics

- Aggregated metrics across platforms.
- Growth trends visualization.

## 📱 User Flow

1.  **User logs in** (or signs up) via Email or Social Auth.
2.  **Lands on Dashboard** to see their current performance.
3.  **Clicks "Create Post"** to draft new content.
4.  **Selects Platforms** (e.g., Linkedin + Instagram).
5.  **Uses AI** to refine the caption.
6.  **Schedules** the post for next Tuesday at 10 AM.
7.  **Relax** - The system handles the publishing.
