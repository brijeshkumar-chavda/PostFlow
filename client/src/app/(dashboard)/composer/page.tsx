"use client";

import {
  LayoutGrid,
  Settings,
  Calendar,
  Briefcase,
  Camera,
  Layers,
  Sparkles,
  Hash,
  Smile,
  Bold,
  Italic,
  Upload,
  X,
  Plus,
  MessageSquare,
  ChevronRight,
  Smartphone,
  Monitor,
  Globe,
  MoreHorizontal,
  ThumbsUp,
  Heart,
  Lightbulb,
  Repeat,
  Send,
  Zap,
  List,
  Loader2,
  Wand2,
  Image as ImageIcon,
  Video,
  RefreshCw,
  Check,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import dynamic from "next/dynamic";
import { EmojiStyle, Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { MediaThumbnail } from "@/components/media-thumbnail";
import { MediaPreviewModal } from "@/components/media-preview-modal";
import { SchedulePostModal } from "@/components/schedule-post-modal";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

export default function ComposerPage() {
  const { resolvedTheme } = useTheme();
  const [platform, setPlatform] = useState("all");
  const [previewPlatform, setPreviewPlatform] = useState<
    "linkedin" | "instagram"
  >("linkedin");
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const linkedinCarouselRef = useRef<HTMLDivElement>(null);
  const instagramCarouselRef = useRef<HTMLDivElement>(null);

  const emojiPickerContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [isMagicPostOpen, setIsMagicPostOpen] = useState(false);
  const [magicTopic, setMagicTopic] = useState("");
  const [isMagicGenerating, setIsMagicGenerating] = useState(false);
  const [isHashtagsLoading, setIsHashtagsLoading] = useState(false);
  const [isMediaGeneratorOpen, setIsMediaGeneratorOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Helper to format text with hashtags and mentions
  const formatText = (text: string, platform: "linkedin" | "instagram") => {
    if (!text)
      return platform === "linkedin" ? "Start writing to preview..." : "";

    // Check if the text is already HTML (Tiptap can return HTML)
    // If it contains things like <p>, assume it's HTML and extract text or handle simpler
    // For now, let's assume we want to preserve line breaks but strip other complex HTML
    // OR if we are treating input as plain text that just happens to have HTML entities.

    // Simple fix: If text seems to just be text, just escape it.
    // However, the issue described "generated post content in the demo preview but it's in HTML format"
    // implies we are seeing raw tag text like "<p>Hello</p>" in the div.
    // This happens if we double escape.

    // Let's assume input 'text' is raw text (e.g. from editor.getText()).
    // If it's already HTML (from editor.getHTML()), we shouldn't escape tags we want to keep.

    // Since we use editor?.getText() in other places, let's stick to text.
    // But formatText does escaping.

    let formatted = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Format hashtags and mentions
    formatted = formatted.replace(
      /([#@][\w\u0590-\u05ff]+)/g,
      '<span class="text-[#0a66c2] dark:text-[#70b5f9] hover:underline cursor-pointer font-medium">$1</span>'
    );

    // Platform specific tweaks
    if (platform === "instagram") {
      formatted = formatted.replace(
        /([#@][\w\u0590-\u05ff]+)/g,
        '<span class="text-[#00376b] dark:text-[#e0f1ff] cursor-pointer">$1</span>'
      );
    }

    // Convert newlines to breaks
    return formatted.replace(/\n/g, "<br />");
  };
  const [mediaGenType, setMediaGenType] = useState<"image" | "video">("image");
  const [mediaPrompt, setMediaPrompt] = useState("");
  const [isGeneratingMedia, setIsGeneratingMedia] = useState(false);
  const [isExtractingContext, setIsExtractingContext] = useState(false);
  const [selectedPreviewMedia, setSelectedPreviewMedia] = useState<File | null>(
    null
  );
  // Generated media state (for preview before adoption)
  const [generatedFile, setGeneratedFile] = useState<File | null>(null);
  const [generatedFilePreviewUrl, setGeneratedFilePreviewUrl] = useState<
    string | null
  >(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = mediaFiles.map((file) => URL.createObjectURL(file));

    if (urls.length === 0 && selectedPreviewMedia) {
      // Fallback or explicit selection handling if needed,
      // but generally mediaFiles is the source.
      // For now, if mediaFiles is empty but selected exists (edge case?), do nothing.
    }
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [mediaFiles]);

  const scrollCarousel = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right"
  ) => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleSaveMedia = (originalFile: File, newFile: File) => {
    setMediaFiles((prev) =>
      prev.map((f) => (f === originalFile ? newFile : f))
    );
    setSelectedPreviewMedia(newFile);
  };

  const handleGenerateMedia = async () => {
    if (!mediaPrompt.trim()) return;

    setIsGeneratingMedia(true);
    try {
      let mediaUrl = "";
      let fileName = "";
      let mimeType = "";

      if (mediaGenType === "image") {
        // Call Real AI API
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: mediaPrompt, type: "image" }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(
            errData.details ||
              errData.error ||
              "Failed to generate image via API"
          );
        }

        const data = await response.json();
        mediaUrl = data.content; // API returns the image URL
        fileName = `generated-${Date.now()}.png`;
        mimeType = "image/png";
      } else {
        // Simulate video generation for now
        await new Promise((resolve) => setTimeout(resolve, 2000));
        mediaUrl =
          "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-997-large.mp4";
        fileName = "generated-video.mp4";
        mimeType = "video/mp4";
      }

      // Fetch the asset (real or simulated) to convert to File object
      // Note: fetching from external URL might fail due to CORS if not proxied,
      // but DALL-E URLs typically allow GET.
      const mediaRes = await fetch(mediaUrl);
      const blob = await mediaRes.blob();
      const file = new File([blob], fileName, { type: mimeType });

      // Instead of adding directly, set for preview
      setGeneratedFile(file);
      setGeneratedFilePreviewUrl(URL.createObjectURL(blob));
    } catch (error: any) {
      console.error("Failed to generate media:", error);
      alert(
        `Generation Failed: ${
          error.message || "Unknown error"
        }. Please check your API configuration.`
      );
    } finally {
      setIsGeneratingMedia(false);
    }
  };

  const handleGeneratePromptFromContext = async () => {
    const editorText = editor?.getText() || "";
    if (!editorText.trim()) {
      alert(
        "Please write some text in your post first to generate a contextual image."
      );
      return;
    }

    setIsExtractingContext(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: editorText, type: "visual_description" }),
      });

      if (!response.ok) {
        throw new Error("Failed to extract context from post");
      }

      const data = await response.json();
      setMediaPrompt(data.content);
    } catch (error: any) {
      console.error("Failed to extract context:", error);
      alert(
        "Failed to analyze post context. Please try entering a description manually."
      );
    } finally {
      setIsExtractingContext(false);
    }
  };

  const handleUseGeneratedMedia = () => {
    if (generatedFile) {
      setMediaFiles((prev) => [...prev, generatedFile]);
      setGeneratedFile(null);
      if (generatedFilePreviewUrl) URL.revokeObjectURL(generatedFilePreviewUrl);
      setGeneratedFilePreviewUrl(null);
      setIsMediaGeneratorOpen(false);
      setMediaPrompt("");
    }
  };

  const handleDiscardGeneratedMedia = () => {
    setGeneratedFile(null);
    if (generatedFilePreviewUrl) URL.revokeObjectURL(generatedFilePreviewUrl);
    setGeneratedFilePreviewUrl(null);
  };

  const handleRegenerateMedia = () => {
    handleDiscardGeneratedMedia();
    handleGenerateMedia();
  };

  const openMediaGenerator = (type: "image" | "video") => {
    setMediaGenType(type);
    setIsMediaGeneratorOpen(true);
    // Reset state to ensure clean slate
    setIsGeneratingMedia(false);
    setMediaPrompt("");
    setGeneratedFile(null);
    if (generatedFilePreviewUrl) URL.revokeObjectURL(generatedFilePreviewUrl);
    setGeneratedFilePreviewUrl(null);
  };
  const handleSuggestHashtags = async () => {
    setIsHashtagsLoading(true);
    try {
      const editorText = editor?.getText() || "";
      // Regex to find existing hashtags (word starting with #)
      const existingHashtags = new Set(
        (editorText.match(/#\w+/g) || []).map((tag) => tag.toLowerCase())
      );

      const context = editorText || "social media growth and tech";

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: context, type: "hashtags" }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(
          errData.details || errData.error || "Failed to generate hashtags"
        );
      }

      const data = await response.json();
      const newHashtagsRaw = data.content.trim().split(/\s+/);

      // Filter out duplicates
      const uniqueHashtags = newHashtagsRaw.filter(
        (tag: string) => !existingHashtags.has(tag.toLowerCase())
      );

      if (uniqueHashtags.length > 0) {
        const hashtagsToInsert = " " + uniqueHashtags.join(" ");
        editor?.chain().focus().insertContent(hashtagsToInsert).run();
      } else {
        // Optional: visual feedback that no new tags were added could go here
        console.log("No new unique hashtags found");
      }
    } catch (error: any) {
      console.error(
        "Hashtag Generation Error (falling back to simulation):",
        error
      );

      // Fallback Simulation
      const hashtags = [
        " #ContentCreation",
        " #GrowthMindset",
        " #DigitalMarketing",
        " #SocialMediaStrategy",
        " #ProductivityHacks",
        " #TechTrends",
        " #StartupLife",
        " #Innovation",
      ];

      const editorText = editor?.getText() || "";
      const existingHashtags = new Set(
        (editorText.match(/#\w+/g) || []).map((tag) => tag.toLowerCase())
      );

      // Shuffle and pick 3-5 that aren't already there
      const uniqueFallback = hashtags
        .map((h) => h.trim())
        .filter((h) => !existingHashtags.has(h.toLowerCase()));

      if (uniqueFallback.length > 0) {
        const count = Math.min(
          Math.floor(Math.random() * 3) + 3,
          uniqueFallback.length
        );
        const selectedHashtags =
          " " +
          uniqueFallback
            .sort(() => 0.5 - Math.random())
            .slice(0, count)
            .join(" ");
        editor?.chain().focus().insertContent(selectedHashtags).run();
      }
    } finally {
      setIsHashtagsLoading(false);
    }
  };

  const handleMagicPost = async () => {
    if (!magicTopic.trim()) return;

    setIsMagicGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: magicTopic, type: "post" }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(
          errData.details || errData.error || "Failed to generate post"
        );
      }

      const data = await response.json();
      editor?.commands.setContent(data.content);
      setIsMagicPostOpen(false);
      setMagicTopic("");
    } catch (error: any) {
      console.error("Magic Post Error (falling back to simulation):", error);

      // Fallback Simulation
      const generatedPost = `
        <p><strong>${magicTopic}</strong></p>
        <p>I utilized to think that ${magicTopic.toLowerCase()} was complicated. But then I realized I was approaching it all wrong.</p>
        <p>Here are 3 specific ways to master it:</p>
        <p>1. <strong>Start Small</strong>: Don't boil the ocean.</p>
        <p>2. <strong>Stay Consistent</strong>: Show up every single day.</p>
        <p>3. <strong>Analyze Data</strong>: Let the numbers guide you.</p>
        <p>What's your experience with this? Let me know below! 👇</p>
        <p>#${magicTopic.replace(/\s+/g, "")} #Growth #Learning</p>
      `;

      editor?.commands.setContent(generatedPost);
      setIsMagicPostOpen(false);
      setMagicTopic("");
    } finally {
      setIsMagicGenerating(false);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const remainingSlots = 20 - mediaFiles.length;

      if (remainingSlots <= 0) {
        alert("You have reached the maximum limit of 20 media files.");
        e.target.value = ""; // Reset the value even if no files are added
        return;
      }

      if (newFiles.length > remainingSlots) {
        alert(
          `You can only add ${remainingSlots} more file${
            remainingSlots === 1 ? "" : "s"
          }. The rest were ignored.`
        );
        setMediaFiles((prev) => [
          ...prev,
          ...newFiles.slice(0, remainingSlots),
        ]);
      } else {
        setMediaFiles((prev) => [...prev, ...newFiles]);
      }
      // Reset the value to allow selecting the same file again
      e.target.value = "";
    }
  };

  const removeFile = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("video/")
      );

      const remainingSlots = 20 - mediaFiles.length;

      if (remainingSlots <= 0) {
        alert("You have reached the maximum limit of 20 media files.");
        return;
      }

      if (newFiles.length > remainingSlots) {
        alert(
          `You can only add ${remainingSlots} more file${
            remainingSlots === 1 ? "" : "s"
          }. The rest were ignored.`
        );
        setMediaFiles((prev) => [
          ...prev,
          ...newFiles.slice(0, remainingSlots),
        ]);
      } else {
        setMediaFiles((prev) => [...prev, ...newFiles]);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiPickerContainerRef.current &&
        !emojiPickerContainerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "What do you want to share with your network today?",
      }),
    ],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Use getText() for social media captions (plain text)
      setContent(editor.getText());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert focus:outline-none max-w-none min-h-[180px] p-4 text-base leading-relaxed text-slate-900 dark:text-white",
      },
    },
  });

  const handleBold = () => editor?.chain().focus().toggleBold().run();
  const handleItalic = () => editor?.chain().focus().toggleItalic().run();
  const handleList = () => editor?.chain().focus().toggleBulletList().run();
  const handleEmoji = () => setShowEmojiPicker(!showEmojiPicker);

  const onEmojiClick = (emojiData: any) => {
    editor?.chain().focus().insertContent(emojiData.emoji).run();
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex h-full flex-col font-display overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Sub Header */}
      <header className="flex items-center justify-between border-b border-gray-200 dark:border-[#1e293b] pl-6 pr-16 py-3 bg-white dark:bg-surface-darker z-10 shrink-0">
        <div className="flex items-center gap-3 text-slate-900 dark:text-white">
          <div className="size-8 text-primary flex items-center justify-center">
            <LayoutGrid className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
            Smart Post Creator
          </h2>
          <span className="ml-4 text-xs font-medium text-slate-500 dark:text-gray-400 bg-gray-100 dark:bg-[#1e293b] px-2 py-1 rounded">
            Draft saved 2m ago
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 border-l border-gray-200 dark:border-[#1e293b] pl-6">
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-white hover:bg-opacity-90 transition-all text-sm font-bold leading-normal tracking-[0.015em] shadow-[0_0_15px_rgba(10,102,194,0.3)]"
            >
              <span className="truncate">Schedule Post</span>
              <Calendar className="h-4 w-4 ml-2" />
            </button>
            {/* User icon removed */}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Editor */}
        <main className="flex-1 flex flex-col min-w-[500px] border-r border-gray-200 dark:border-[#1e293b] bg-white dark:bg-[#0f111a] overflow-y-auto custom-scrollbar">
          <div className="max-w-3xl w-full mx-auto px-8 py-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">
                Compose Post
              </h1>
              <div className="flex bg-gray-100 dark:bg-[#1e293b] p-1 rounded-lg">
                {[
                  { id: "linkedin", label: "LinkedIn", icon: Briefcase },
                  { id: "instagram", label: "Instagram", icon: Camera },
                  { id: "all", label: "All", icon: Layers },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all shadow-none",
                      platform === p.id
                        ? "bg-white dark:bg-surface-darker text-primary shadow-sm"
                        : "text-slate-500 dark:text-slate-400"
                    )}
                  >
                    <p.icon className="h-4 w-4" />
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Post Content Section */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-end">
                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">
                  Post
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsMagicPostOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                    Magic Post
                  </button>
                  <button
                    onClick={handleSuggestHashtags}
                    disabled={isHashtagsLoading}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isHashtagsLoading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Hash className="h-3.5 w-3.5" />
                    )}
                    {isHashtagsLoading ? "Suggesting..." : "Suggest Hashtags"}
                  </button>
                </div>
              </div>
              <div className="relative group border border-gray-200 dark:border-[#334155] rounded-lg bg-gray-50 dark:bg-[#1b2130] focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
                <EditorContent editor={editor} />
                <div className="flex items-center justify-end gap-2 p-2 border-t border-gray-100 dark:border-[#334155] bg-gray-50/50 dark:bg-[#1b2130]/50 relative z-10">
                  <div className="relative" ref={emojiPickerRef}>
                    <button
                      onClick={handleEmoji}
                      className={cn(
                        "p-1 hover:text-primary transition-colors",
                        showEmojiPicker && "text-primary bg-primary/10 rounded"
                      )}
                    >
                      <Smile className="h-4.5 w-4.5" />
                    </button>
                  </div>
                  <button
                    onClick={handleBold}
                    className={cn(
                      "p-1 hover:text-primary transition-colors",
                      editor?.isActive("bold") &&
                        "text-primary bg-primary/10 rounded"
                    )}
                  >
                    <Bold className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={handleItalic}
                    className={cn(
                      "p-1 hover:text-primary transition-colors",
                      editor?.isActive("italic") &&
                        "text-primary bg-primary/10 rounded"
                    )}
                  >
                    <Italic className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={handleList}
                    className={cn(
                      "p-1 hover:text-primary transition-colors",
                      editor?.isActive("bulletList") &&
                        "text-primary bg-primary/10 rounded"
                    )}
                  >
                    <List className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              {/* Responsive Emoji Picker that pushes layout */}
              {showEmojiPicker && (
                <div
                  ref={emojiPickerContainerRef}
                  className="z-20 animate-in slide-in-from-top-2 duration-200"
                >
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    emojiStyle={EmojiStyle.GOOGLE}
                    theme={resolvedTheme === "dark" ? Theme.DARK : Theme.LIGHT}
                    width="100%"
                    height={350}
                    skinTonesDisabled
                    previewConfig={{ showPreview: false }}
                  />
                </div>
              )}
            </div>

            {/* Media Assets */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300 flex items-center gap-2">
                  Media Assets
                  <div className="group relative">
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full cursor-help",
                        mediaFiles.length >= 20
                          ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {20 - mediaFiles.length} remaining
                    </span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-md w-48 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 invisible group-hover:visible">
                      Most social platforms (LinkedIn, Instagram) limit posts to
                      20 media items.
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
                    </div>
                  </div>
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => openMediaGenerator("image")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <ImageIcon className="h-3.5 w-3.5" />
                    Generate Image
                  </button>
                </div>
              </div>
              <div
                onClick={handleFileClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all group",
                  isDragging
                    ? "border-primary bg-primary/10"
                    : "border-gray-300 dark:border-[#334155] bg-gray-50 dark:bg-surface-darker hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  multiple // Allow multiple file selection
                />
                <div className="size-12 rounded-full bg-gray-200 dark:bg-[#1e293b] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="text-slate-500 dark:text-primary h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-700 dark:text-white">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                    SVG, PNG, JPG or MP4
                  </p>
                  <div className="mt-4 flex items-start gap-2 text-left bg-blue-50 dark:bg-blue-900/10 p-2.5 rounded-lg border border-blue-100 dark:border-blue-900/20">
                    <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-800 dark:text-white">
                        Pro Tip:
                      </span>{" "}
                      Use{" "}
                      <span className="font-mono bg-white dark:bg-[#1e293b] px-1 rounded border border-gray-200 dark:border-[#334155]">
                        4:5
                      </span>{" "}
                      (1080x1350px) or{" "}
                      <span className="font-mono bg-white dark:bg-[#1e293b] px-1 rounded border border-gray-200 dark:border-[#334155]">
                        1:1
                      </span>{" "}
                      (1080x1080px) ratio for best results on LinkedIn &
                      Instagram.
                    </p>
                  </div>
                </div>
              </div>

              {/* Selected Media Previews */}
              {mediaFiles.length > 0 && (
                <div className="flex gap-3 overflow-x-auto py-2 custom-scrollbar">
                  {mediaFiles.map((file, index) => (
                    <MediaThumbnail
                      key={index}
                      file={file}
                      index={index}
                      onRemove={removeFile}
                      onClick={setSelectedPreviewMedia}
                    />
                  ))}
                  <div
                    onClick={handleFileClick}
                    className="relative w-24 h-24 shrink-0 rounded-lg flex items-center justify-center border border-gray-200 dark:border-[#334155] bg-gray-50 dark:bg-[#1b2130] text-slate-400 dark:text-slate-500 hover:text-primary cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <Plus className="h-6 w-6" />
                  </div>
                </div>
              )}
            </div>

            {/* Comment Section */}
          </div>
        </main>

        {/* Live Preview Pane */}
        <aside className="hidden xl:flex w-[480px] bg-gray-100 dark:bg-[#0b0d14] flex-col shrink-0 border-l border-gray-200 dark:border-[#1e293b]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#1e293b] min-h-[60px]">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-gray-300">
              Demo Preview
            </h2>
          </div>

          <div className="flex px-6 pt-4 pb-2 gap-6 border-b border-gray-200 dark:border-[#1e293b]">
            <button
              onClick={() => setPreviewPlatform("linkedin")}
              className={cn(
                "text-sm font-semibold pb-3 transition-colors",
                previewPlatform === "linkedin"
                  ? "border-b-2 border-primary text-slate-900 dark:text-white"
                  : "text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200"
              )}
            >
              LinkedIn
            </button>
            <button
              onClick={() => setPreviewPlatform("instagram")}
              className={cn(
                "text-sm font-semibold pb-3 transition-colors",
                previewPlatform === "instagram"
                  ? "border-b-2 border-primary text-slate-900 dark:text-white"
                  : "text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200"
              )}
            >
              Instagram
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-gray-100 dark:bg-[#0b0d14]">
            {/* Mobile Mockup Container - Frame Removed */}
            <div className="w-[375px] bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden relative h-[812px] flex flex-col shrink-0">
              {previewPlatform === "linkedin" ? (
                /* LinkedIn Mobile */
                <div className="flex-1 flex flex-col bg-[#F3F2EF] dark:bg-black overflow-y-auto custom-scrollbar">
                  {/* Feed Post */}
                  <div className="bg-white dark:bg-[#1b1f23] mt-2 pb-2">
                    {/* Post Header */}
                    <div className="px-3 pt-3 pb-1 flex gap-2">
                      <img
                        src="https://ui-avatars.com/api/?name=Jane+Doe&background=random"
                        className="size-10 rounded-full"
                        alt="Profile"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-[#191919] dark:text-white leading-tight">
                            Jane Doe
                          </h4>
                          <MoreHorizontal className="h-5 w-5 text-slate-600" />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate leading-tight">
                          Marketing Strategist
                        </p>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                          <span>1h • </span> <Globe className="h-3 w-3" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className="px-3 py-1 text-[14px] text-[#191919] dark:text-white leading-[1.4] whitespace-pre-wrap break-words font-[system-ui]"
                      dangerouslySetInnerHTML={{
                        __html: formatText(content, "linkedin"),
                      }}
                    />

                    {/* Media Carousel */}
                    {previewUrls.length > 0 ? (
                      <div className="mt-2 w-full relative group">
                        <div
                          ref={linkedinCarouselRef}
                          className="w-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          {previewUrls.map((url, index) => (
                            <div
                              key={url}
                              className="w-full flex-shrink-0 snap-center relative"
                            >
                              {mediaFiles[index]?.type.startsWith("video") ? (
                                <video
                                  src={url}
                                  className="w-full h-auto max-h-[400px] object-cover"
                                  controls
                                />
                              ) : (
                                <img
                                  src={url}
                                  className="w-full h-auto object-cover"
                                  alt={`Content ${index + 1}`}
                                />
                              )}
                              {/* Optional Counter for LinkedIn */}
                              {previewUrls.length > 1 && (
                                <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full select-none">
                                  {index + 1}/{previewUrls.length}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {/* Navigation Arrows */}
                        {previewUrls.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                scrollCarousel(linkedinCarouselRef, "left")
                              }
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md z-10"
                            >
                              <ChevronRight className="h-4 w-4 rotate-180" />
                            </button>
                            <button
                              onClick={() =>
                                scrollCarousel(linkedinCarouselRef, "right")
                              }
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md z-10"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-48 flex items-center justify-center text-slate-400 text-xs text-center border-y border-gray-100 dark:border-gray-800">
                        Image / Video Preview
                      </div>
                    )}

                    {/* Interaction Stats */}
                    <div className="px-3 py-2 flex items-center justify-between text-xs text-slate-500 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3 text-blue-600 filled" /> 24
                      </div>
                      <div>2 comments</div>
                    </div>

                    {/* Actions */}
                    <div className="px-1 py-1 flex items-center justify-between mt-1">
                      <button className="flex flex-col items-center gap-1 p-2 flex-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">
                        <ThumbsUp className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                          Like
                        </span>
                      </button>
                      <button className="flex flex-col items-center gap-1 p-2 flex-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">
                        <MessageSquare className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                          Comment
                        </span>
                      </button>
                      <button className="flex flex-col items-center gap-1 p-2 flex-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">
                        <Repeat className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                          Repost
                        </span>
                      </button>
                      <button className="flex flex-col items-center gap-1 p-2 flex-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">
                        <Send className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                          Send
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Instagram Mobile */
                <div className="flex-1 flex flex-col bg-white dark:bg-black overflow-y-auto custom-scrollbar">
                  {/* Post Header */}
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://ui-avatars.com/api/?name=Jane+Doe&background=random"
                        className="size-8 rounded-full border border-gray-200"
                        alt="Profile"
                      />
                      <span className="text-sm font-semibold text-[#262626] dark:text-white">
                        janedoe_marketing
                      </span>
                    </div>
                    <MoreHorizontal className="h-5 w-5" />
                  </div>

                  {/* Media (Carousel) */}
                  <div className="w-full bg-slate-100 dark:bg-slate-900 overflow-hidden relative group">
                    {previewUrls.length > 0 ? (
                      <div
                        ref={instagramCarouselRef}
                        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        {previewUrls.map((url, index) => (
                          <div
                            key={url}
                            className="w-full flex-shrink-0 snap-center relative aspect-square bg-black flex items-center justify-center"
                          >
                            {mediaFiles[index]?.type.startsWith("video") ? (
                              <video
                                src={url}
                                className="w-full h-full object-cover"
                                controls
                              />
                            ) : (
                              <img
                                src={url}
                                className="w-full h-full object-cover"
                                alt={`IG Content ${index + 1}`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="aspect-square flex items-center justify-center text-slate-400 text-sm">
                        No media
                      </div>
                    )}

                    {/* Navigation Arrows */}
                    {previewUrls.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            scrollCarousel(instagramCarouselRef, "left")
                          }
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md z-10"
                        >
                          <ChevronRight className="h-4 w-4 rotate-180" />
                        </button>
                        <button
                          onClick={() =>
                            scrollCarousel(instagramCarouselRef, "right")
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md z-10"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {/* Pagination Dots for Instagram */}
                    {previewUrls.length > 1 && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                        {previewUrls.map((_, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`w-1.5 h-1.5 rounded-full shadow-sm transition-colors ${
                              dotIndex === 0 ? "bg-white" : "bg-white/50" // Simple logic: highlight first for now since we can't easily track scroll position without more state
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <div className="flex items-center gap-4">
                      <Heart className="h-6 w-6 text-[#262626] dark:text-white" />
                      <MessageSquare className="h-6 w-6 text-[#262626] dark:text-white -rotate-90" />
                      <Send className="h-6 w-6 text-[#262626] dark:text-white" />
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-bookmark h-6 w-6 text-[#262626] dark:text-white"
                      >
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                      </svg>
                    </div>
                  </div>

                  {/* Likes */}
                  <div className="px-3 text-sm font-semibold text-[#262626] dark:text-white mb-1">
                    24 likes
                  </div>

                  {/* Caption */}
                  <div className="px-3 pb-4">
                    <div className="text-[14px] text-[#262626] dark:text-white leading-[1.25]">
                      <span className="font-semibold mr-1">
                        janedoe_marketing
                      </span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: formatText(content, "instagram"),
                        }}
                      ></span>
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      View all 2 comments
                    </div>
                    <div className="mt-1 text-[10px] text-slate-400 uppercase tracking-wide">
                      1 HOUR AGO
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Media Preview Modal */}
      {selectedPreviewMedia && (
        <MediaPreviewModal
          file={selectedPreviewMedia}
          onClose={() => setSelectedPreviewMedia(null)}
          onSave={handleSaveMedia}
        />
      )}

      {/* Schedule Post Modal */}
      <SchedulePostModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        selectedPreviewMedia={mediaFiles[0] || null}
        postContent={content}
      />

      {/* Magic Post Modal */}
      {isMagicPostOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200 dark:border-[#334155] animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Wand2 className="h-5 w-5" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Magic Post Generator
                  </h3>
                </div>
                <button
                  onClick={() => setIsMagicPostOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5">
                    What should this post be about?
                  </label>
                  <textarea
                    value={magicTopic}
                    onChange={(e) => setMagicTopic(e.target.value)}
                    placeholder="e.g. My journey learning React, 5 tips for productivity..."
                    className="w-full h-32 rounded-lg border border-gray-300 dark:border-[#334155] bg-white dark:bg-black/20 p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                </div>

                <button
                  onClick={handleMagicPost}
                  disabled={!magicTopic.trim() || isMagicGenerating}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isMagicGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Writing Magic...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Full Post
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 dark:bg-[#0f111a] border-t border-gray-200 dark:border-[#334155]">
              <p className="text-xs text-center text-slate-500 dark:text-gray-400">
                AI will generate a structured post with hooks, points, and
                hashtags.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Media Generator Modal */}
      {isMediaGeneratorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-gray-200 dark:border-[#334155] animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-primary">
                  {mediaGenType === "image" ? (
                    <ImageIcon className="h-5 w-5" />
                  ) : (
                    <Video className="h-5 w-5" />
                  )}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                    Generate AI {mediaGenType}
                  </h3>
                </div>
                <button
                  onClick={() => setIsMediaGeneratorOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column: Preview area */}
                <div className="flex-1 min-h-[300px] flex flex-col gap-4">
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    {isGeneratingMedia ? (
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        <p className="text-sm font-medium text-slate-500 animate-pulse">
                          Generating your asset...
                        </p>
                      </div>
                    ) : generatedFilePreviewUrl ? (
                      mediaGenType === "image" ? (
                        <img
                          src={generatedFilePreviewUrl}
                          alt="Generated AI asset"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <video
                          src={generatedFilePreviewUrl}
                          controls
                          className="w-full h-full object-contain"
                        />
                      )
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-slate-400">
                        <ImageIcon className="h-12 w-12 opacity-20" />
                        <p className="text-sm">
                          No {mediaGenType} generated yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Settings & Actions */}
                <div className="flex-1 flex flex-col gap-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">
                        Description
                      </label>
                      <button
                        onClick={handleGeneratePromptFromContext}
                        disabled={isExtractingContext || isGeneratingMedia}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all disabled:opacity-50"
                      >
                        {isExtractingContext ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Sparkles className="h-3 w-3" />
                        )}
                        Generate from Post
                      </button>
                    </div>
                    <textarea
                      value={mediaPrompt}
                      onChange={(e) => setMediaPrompt(e.target.value)}
                      disabled={isGeneratingMedia}
                      placeholder={`e.g. A futuristic office workspace with neon lights...`}
                      className="w-full h-40 rounded-lg border border-gray-300 dark:border-[#334155] bg-white dark:bg-black/20 p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-slate-900 dark:text-white placeholder:text-slate-400 transition-all disabled:opacity-50"
                    />
                  </div>

                  <div className="mt-auto space-y-3">
                    <button
                      onClick={handleGenerateMedia}
                      disabled={!mediaPrompt.trim() || isGeneratingMedia}
                      className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 shadow-lg active:scale-95"
                    >
                      {isGeneratingMedia ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Regenerating...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4" />
                          {generatedFile
                            ? "Regenerate"
                            : "Generate " +
                              (mediaGenType === "image" ? "Image" : "Video")}
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleUseGeneratedMedia}
                      disabled={!generatedFile || isGeneratingMedia}
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 shadow-lg active:scale-95 translate-y-0 hover:-translate-y-0.5"
                    >
                      <Check className="h-5 w-5" />
                      Save Asset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
