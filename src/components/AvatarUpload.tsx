import { useRef, useState } from "react";
import { Upload, X, Loader2, User } from "lucide-react";
import { uploadAvatar } from "@/lib/api";
import { cn } from "@/lib/utils";

interface AvatarUploadProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-32 w-32",
};

export function AvatarUpload({
  currentUrl,
  onUpload,
  className,
  size = "md",
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPG, PNG, WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB");
      return;
    }

    setError("");
    setUploading(true);

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      const { url } = await uploadAvatar(file);
      setPreview(url);
      onUpload(url);
      URL.revokeObjectURL(localUrl);
    } catch (err: any) {
      setError(err.message || "Upload failed");
      setPreview(currentUrl || null);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className={cn(
          "relative rounded-full border-2 border-dashed border-border cursor-pointer overflow-hidden transition-all",
          sizes[size],
          dragging && "border-primary bg-primary/10",
          uploading && "opacity-70"
        )}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        title="Click or drag to upload avatar"
      >
        {preview ? (
          <img
            src={preview}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <User className="h-1/2 w-1/2 text-muted-foreground" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-full">
          {uploading ? (
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          ) : (
            <Upload className="h-6 w-6 text-white" />
          )}
        </div>
      </div>

      {/* Clear button */}
      {preview && !uploading && (
        <button
          type="button"
          onClick={() => { setPreview(null); onUpload(""); }}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          <X className="h-3 w-3" />
          Remove
        </button>
      )}

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
