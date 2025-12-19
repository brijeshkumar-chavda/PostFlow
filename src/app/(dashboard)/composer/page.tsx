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
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import dynamic from "next/dynamic";
import { EmojiStyle } from "emoji-picker-react";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

export default function ComposerPage() {
  const [platform, setPlatform] = useState("all");
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
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
        placeholder:
          "What do you want to share with your network today? Type '/' for AI commands...",
      }),
    ],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // For preview, we use HTML to reflect formatting
      setContent(editor.getHTML());
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
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-white hover:bg-opacity-90 transition-all text-sm font-bold leading-normal tracking-[0.015em] shadow-[0_0_15px_rgba(10,102,194,0.3)]">
              <span className="truncate">Schedule Post</span>
              <Calendar className="h-4 w-4 ml-2" />
            </button>
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-gray-200 dark:ring-[#1e293b]"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCbxQikr-McggRSefUcmUC_uk5vwIgJ-eDL9HD-h9LG5sWgTST2EClfPe_aUxYtV8LHfKgj8BbWKnjL_KgFMWyAeQJMWvz618Bdw4BA6uIvND2y_WNb4EXEFL7HwxQDgfKtwSqzSAMpF534U-Q1LDJ5gFAyx0ZDqxZ_2GOnePSKPzUyIzYS7eNfypiywLLM_iJ-KlasFdHy7PU2O6pMmjXtxcxLBY2nBs5l6P234xlzEx80wS3QJ4JC9--TRv8CWtBXiDMNFstiCoqe")',
              }}
            ></div>
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

            {/* Caption Section */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-end">
                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">
                  Caption
                </label>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-colors">
                    <Sparkles className="h-3.5 w-3.5" />
                    Generate Hook
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1e293b] hover:bg-[#2c3b54] text-white text-xs font-bold transition-colors">
                    <Hash className="h-3.5 w-3.5" />
                    Suggest Hashtags
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
                <div className="z-20 animate-in slide-in-from-top-2 duration-200">
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    emojiStyle={EmojiStyle.GOOGLE}
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
              <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">
                Media Assets
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-[#334155] bg-gray-50 dark:bg-surface-darker rounded-xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <div className="size-12 rounded-full bg-gray-200 dark:bg-[#1e293b] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="text-slate-500 dark:text-primary h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-700 dark:text-white">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                    SVG, PNG, JPG or MP4 (max. 800x400px)
                  </p>
                </div>
              </div>
              <div className="flex gap-3 overflow-x-auto py-2">
                <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-gray-200 dark:border-[#334155] group">
                  <img
                    className="w-full h-full object-cover"
                    alt="Modern architecture"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyXdriyZXjdgU66B-ge7FSHYdSTdfKTcplDJrPDJo-x2jTIgrCfTSIjEeaTKWiqXFcm9aUhI8186QMirrXlUO-lI-xm2aDzAPi_6rGwZayvLDqLRdba-CZED-BOhjs4rX7Ji9VUkzhL4-JPZcZvigeB0P-qzYzKzBaRYEvi3s4pDdQllXruCKvSgWCV-cvy4SHpKcoyXnU8A2YcKsS1ettfVomrsCUxP2t3eaPZx71aN68_LUXdo9MWMV92g8_vVCmNwo9UAdkMBA1"
                  />
                  <button className="absolute top-1 right-1 bg-black/60 hover:bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <div className="relative w-24 h-24 shrink-0 rounded-lg flex items-center justify-center border border-gray-200 dark:border-[#334155] bg-gray-50 dark:bg-[#1b2130] text-slate-400 dark:text-slate-500 hover:text-primary cursor-pointer hover:border-primary/50 transition-colors">
                  <Plus className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Comment Section */}
            <div className="border-t border-gray-200 dark:border-[#1e293b] pt-6 mt-2">
              <button className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-50 dark:bg-[#1b2130] hover:bg-gray-100 dark:hover:bg-[#1e293b] transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold dark:text-white">
                      First Comment
                    </p>
                    <p className="text-xs text-slate-500 dark:text-gray-400">
                      Add links or extra hashtags here
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-white" />
              </button>
            </div>
          </div>
        </main>

        {/* Live Preview Pane */}
        <aside className="hidden xl:flex w-[480px] bg-gray-100 dark:bg-[#0b0d14] flex-col shrink-0 border-l border-gray-200 dark:border-[#1e293b]">
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-[#1e293b]">
            <h3 className="font-medium text-slate-700 dark:text-white">
              Live Preview
            </h3>
            <div className="flex items-center gap-2 bg-white dark:bg-[#1b2130] rounded-md p-1 border border-gray-200 dark:border-[#1e293b]">
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  previewDevice === "mobile"
                    ? "bg-gray-100 dark:bg-surface-darker text-primary shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-primary"
                )}
              >
                <Smartphone className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => setPreviewDevice("desktop")}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  previewDevice === "desktop"
                    ? "bg-gray-100 dark:bg-surface-darker text-primary shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-primary"
                )}
              >
                <Monitor className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          <div className="flex px-6 pt-4 pb-2 gap-6 border-b border-gray-200 dark:border-[#1e293b]">
            <button className="text-sm font-semibold pb-3 border-b-2 border-primary text-slate-900 dark:text-white">
              LinkedIn
            </button>
            <button className="text-sm font-medium pb-3 text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200 transition-colors">
              Instagram
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-gray-100 dark:bg-[#0b0d14]">
            {/* LinkedIn Mockup */}
            <div className="w-full max-w-[400px] bg-white dark:bg-[#1b2130] border border-gray-200 dark:border-[#334155] rounded-lg shadow-sm h-fit">
              <div className="p-3 flex gap-3">
                <div
                  className="size-12 rounded-full bg-cover bg-center shrink-0"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsK3sdpDqhjkP-Jsc6S9U46cH0RrNVr6lTqPlZiEtxXuQfaoJm_c8WTfJX901UM7mXvRGW8eUQXxI73IB0fdH5fWkyCASF2E46fhzUU2Xqu-RxPhjSbSZQZJPaLYSp1ZOwaTHV388-1Hr81qo-ji6FwKqId9zE-S7xyk8lZJvqydgxqZIfYQc3OhH00Ov38o4Rwq9BbF58s5a5jRbAC27P71eyqMCbgv66bE1Xr6Bwuxt58OY-cGeN-itQWoJZk2yxqkSzMhL4bAkc")',
                  }}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      Jane Doe
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-gray-400">
                      • 1st
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-gray-400 truncate">
                    Marketing Strategist | AI Enthusiast
                  </p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                    <span>Now</span>
                    <span>•</span>
                    <Globe className="h-[10px] w-[10px]" />
                  </div>
                </div>
                <button className="text-slate-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded p-1 h-fit">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              <div
                className="px-3 pb-2 text-sm text-slate-800 dark:text-gray-100 leading-normal prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    content || "Your post content preview will appear here...",
                }}
              />
              <div className="w-full aspect-[4/3] bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover"
                  alt="Architecture preview"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU44ZCVRqssyNlYf3T1CQGCfzOn8lS2a4znzn2TceTDmu16VinGTyrf_FnFxZr-2gw--7YZGqgzONziMN9R6NQ6-baWmy0M1oIVTLBQBSMcO7jJZL-Gnlb8Z18AuiWE_KAExSLb6oZIhSnWAoqwNZpUBR-0u5yq652ACw3n0GhwmU_6hWf4NQeFNcQozL5BWx1sw5_MPpuWMxjXyv5xLra68LF62k8dlIFinHsSD8n6OMr7TET0vYUmMk_jO2Q0Jmd8vxyF_xKaow"
                />
              </div>
              <div className="px-3 py-2 border-b border-gray-100 dark:border-[#334155]">
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-gray-400">
                  <div className="flex -space-x-1">
                    <div className="size-4 rounded-full bg-blue-500 flex items-center justify-center">
                      <ThumbsUp className="h-[10px] w-[10px] text-white" />
                    </div>
                    <div className="size-4 rounded-full bg-red-500 flex items-center justify-center">
                      <Heart className="h-[10px] w-[10px] text-white" />
                    </div>
                    <div className="size-4 rounded-full bg-yellow-500 flex items-center justify-center">
                      <Lightbulb className="h-[10px] w-[10px] text-white" />
                    </div>
                  </div>
                  <span className="ml-1 hover:text-blue-500 hover:underline cursor-pointer">
                    You and 42 others
                  </span>
                  <span className="ml-auto hover:text-blue-500 hover:underline cursor-pointer">
                    8 comments
                  </span>
                </div>
              </div>
              <div className="px-2 py-1 flex items-center justify-between">
                {[
                  { label: "Like", icon: ThumbsUp },
                  { label: "Comment", icon: MessageSquare },
                  { label: "Repost", icon: Repeat },
                  { label: "Send", icon: Send },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex items-center justify-center gap-2 flex-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-slate-600 dark:text-gray-300 transition-colors"
                  >
                    <action.icon className="h-4.5 w-4.5" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-surface-darker border-t border-gray-200 dark:border-[#1e293b]">
            <div className="flex gap-3 items-start">
              <Zap className="text-primary h-5 w-5 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  Pro Tip
                </p>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                  LinkedIn posts with images get 2x higher comment rates. You
                  are doing great!
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
