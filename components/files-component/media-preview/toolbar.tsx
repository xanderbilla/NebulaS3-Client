import React from "react";
import { X, Download, ZoomIn, ZoomOut, RotateCw } from "lucide-react";

interface ToolbarProps {
  readonly title: string;
  readonly onClose: () => void;
  readonly onZoomIn: () => void;
  readonly onZoomOut: () => void;
  readonly onRotate: () => void;
  readonly onDownload: () => void;
  readonly scale: number;
}

export function Toolbar({
  title,
  onClose,
  onZoomIn,
  onZoomOut,
  onRotate,
  onDownload,
  scale,
}: ToolbarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-black flex items-center justify-between px-6 border-b border-white/10 z-[10000]">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onClose}
          className="p-2 hover:bg-white/10 active:bg-white/20 text-white/80 hover:text-white transition-all duration-200 rounded-full z-[10001]"
          aria-label="Close preview"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="h-8 w-1 bg-blue-500" />
        <h2 className="text-white font-medium text-lg tracking-wide">
          {title}
        </h2>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-1.5">
        <button
          onClick={onZoomIn}
          disabled={scale >= 2}
          className="p-2 hover:bg-white/10 active:bg-white/20 text-white/80 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={onZoomOut}
          disabled={scale <= 0.5}
          className="p-2 hover:bg-white/10 active:bg-white/20 text-white/80 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={onRotate}
          className="p-2 hover:bg-white/10 active:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
          aria-label="Rotate image"
        >
          <RotateCw className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-white/10" />
        <button
          onClick={onDownload}
          className="p-2 hover:bg-white/10 active:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
          aria-label="Download image"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
