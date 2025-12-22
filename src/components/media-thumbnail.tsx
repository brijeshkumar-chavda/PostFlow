import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface MediaThumbnailProps {
  file: File;
  index: number;
  onRemove: (index: number) => void;
  onClick: (file: File) => void;
}

export function MediaThumbnail({
  file,
  index,
  onRemove,
  onClick,
}: MediaThumbnailProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!objectUrl) return null;

  return (
    <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-gray-200 dark:border-[#334155] group bg-gray-100 dark:bg-[#1b2130]">
      {file.type.startsWith("video/") ? (
        <video
          src={objectUrl}
          className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
          controls={false}
          muted
          loop
          autoPlay={false} // Disabled autoplay for thumbnails to save resources
          onMouseOver={(e) => e.currentTarget.play()}
          onMouseOut={(e) => e.currentTarget.pause()}
          onClick={() => onClick(file)}
        />
      ) : (
        <img
          className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
          alt={`Upload preview ${index + 1}`}
          src={objectUrl}
          onClick={() => onClick(file)}
        />
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
        className="absolute top-1 right-1 bg-black/60 hover:bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
