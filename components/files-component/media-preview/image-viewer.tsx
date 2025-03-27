import Image from "next/image";
import React, { useRef, MouseEvent, WheelEvent } from "react";

interface Position {
  x: number;
  y: number;
}

interface ImageViewerProps {
  readonly title: string;
  readonly mediaUrl: string;
  readonly isLoading: boolean;
  readonly scale: number;
  readonly rotation: number;
  readonly position: Position;
  readonly isDragging: boolean;
  onLoad: () => void;
  readonly onMouseDown: (e: MouseEvent) => void;
  readonly onMouseMove: (e: MouseEvent) => void;
  readonly onMouseUp: () => void;
  readonly onWheel: (e: WheelEvent) => void;
}

export function ImageViewer({
  title,
  mediaUrl,
  isLoading,
  scale,
  rotation,
  position,
  isDragging,
  onLoad,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onWheel,
}: ImageViewerProps) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <button
      ref={containerRef}
      type="button"
      aria-label={`Image viewer container for ${title}`}
      className="w-full h-full flex items-center justify-center pt-16 overflow-hidden focus:outline-none"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={onWheel}
    >
      <div className="relative max-w-[65vw] max-h-[65vh] flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/10 animate-pulse" />
          </div>
        )}
        <Image
          ref={imageRef}
          src={mediaUrl}
          alt={title}
          className={`max-w-full max-h-[calc(100vh-8rem)] object-contain shadow-xl select-none ${
            isLoading ? "opacity-0" : "opacity-100 transition-all duration-300"
          } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
          onLoad={onLoad}
          onMouseDown={onMouseDown}
          draggable={false}
        />
      </div>
    </button>
  );
}
