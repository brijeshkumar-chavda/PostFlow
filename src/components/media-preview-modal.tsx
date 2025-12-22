import {
  X,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Save,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MediaPreviewModalProps {
  file: File;
  onClose: () => void;
  onSave: (originalFile: File, newFile: File) => void;
}

export function MediaPreviewModal({
  file,
  onClose,
  onSave,
}: MediaPreviewModalProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [imgTransform, setImgTransform] = useState({
    rotate: 0,
    flipH: false,
    flipV: false,
  });

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    // Reset transforms when file changes
    setImgTransform({ rotate: 0, flipH: false, flipV: false });
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleSave = async () => {
    if (!objectUrl) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = objectUrl;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Calculate dimensions based on rotation
    if (imgTransform.rotate % 180 !== 0) {
      canvas.width = img.height;
      canvas.height = img.width;
    } else {
      canvas.width = img.width;
      canvas.height = img.height;
    }

    if (!ctx) return;

    // Apply transforms
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((imgTransform.rotate * Math.PI) / 180);
    ctx.scale(imgTransform.flipH ? -1 : 1, imgTransform.flipV ? -1 : 1);

    // Draw image centered
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const newFile = new File([blob], file.name, {
        type: file.type,
      });
      onSave(file, newFile);
      onClose();
    }, file.type);
  };

  if (!objectUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors"
        >
          <X className="h-8 w-8" />
        </button>

        {file.type.startsWith("video/") ? (
          <video
            src={objectUrl}
            controls
            autoPlay
            className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
          />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div
              className="relative flex items-center justify-center overflow-hidden transition-all duration-300"
              style={{
                transform: `rotate(${imgTransform.rotate}deg) scale(${
                  imgTransform.flipH ? -1 : 1
                }, ${imgTransform.flipV ? -1 : 1})`,
              }}
            >
              <img
                src={objectUrl}
                alt="Full preview"
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Image Edit Controls */}
            <div
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-white dark:bg-[#1b2130] p-2 rounded-xl shadow-lg border border-gray-200 dark:border-[#334155]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() =>
                  setImgTransform((prev) => ({
                    ...prev,
                    rotate: prev.rotate - 90,
                  }))
                }
                className="p-2 hover:bg-gray-100 dark:hover:bg-primary/10 rounded-lg text-slate-700 dark:text-gray-300 hover:text-primary transition-colors"
                title="Rotate Left"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  setImgTransform((prev) => ({
                    ...prev,
                    rotate: prev.rotate + 90,
                  }))
                }
                className="p-2 hover:bg-gray-100 dark:hover:bg-primary/10 rounded-lg text-slate-700 dark:text-gray-300 hover:text-primary transition-colors"
                title="Rotate Right"
              >
                <RotateCw className="h-5 w-5" />
              </button>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
              <button
                onClick={() =>
                  setImgTransform((prev) => ({
                    ...prev,
                    flipH: !prev.flipH,
                  }))
                }
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  imgTransform.flipH
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-gray-100 dark:hover:bg-primary/10 text-slate-700 dark:text-gray-300"
                )}
                title="Flip Horizontal"
              >
                <FlipHorizontal className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  setImgTransform((prev) => ({
                    ...prev,
                    flipV: !prev.flipV,
                  }))
                }
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  imgTransform.flipV
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-gray-100 dark:hover:bg-primary/10 text-slate-700 dark:text-gray-300"
                )}
                title="Flip Vertical"
              >
                <FlipVertical className="h-5 w-5" />
              </button>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
