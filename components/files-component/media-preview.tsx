import React, {
  useEffect,
  useState,
  MouseEvent,
  WheelEvent,
  useRef,
} from "react";
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface MediaPreviewProps {
  onClose: () => void;
  title: string;
  mediaUrl: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

interface Position {
  x: number;
  y: number;
}

interface ToolbarProps {
  title: string;
  onClose: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
  onDownload: () => void;
  scale: number;
}

function Toolbar({
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

export default function MediaPreview({
  onClose,
  title,
  mediaUrl,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}: MediaPreviewProps) {
  const [state, setState] = useState({
    isLoading: true,
    scale: 1,
    rotation: 0,
    position: { x: 0, y: 0 } as Position,
    isDragging: false,
    dragStart: { x: 0, y: 0 } as Position,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const getBoundedPosition = (newX: number, newY: number): Position => {
    if (!containerRef.current || !imageRef.current) return { x: newX, y: newY };

    const container = containerRef.current.getBoundingClientRect();
    const image = imageRef.current.getBoundingClientRect();
    const scaledWidth = image.width * state.scale;
    const scaledHeight = image.height * state.scale;
    const maxX = Math.max(0, (scaledWidth - container.width) / 2);
    const maxY = Math.max(0, (scaledHeight - container.height) / 2);

    return {
      x: Math.min(Math.max(newX, -maxX), maxX),
      y: Math.min(Math.max(newY, -maxY), maxY),
    };
  };

  const handleZoom = (delta: number) => {
    setState((prev) => {
      const newScale = Math.min(Math.max(prev.scale + delta, 0.5), 2);
      const deltaScale = newScale - prev.scale;
      const newPos = {
        x: prev.position.x - prev.position.x * deltaScale,
        y: prev.position.y - prev.position.y * deltaScale,
      };
      const boundedPos = getBoundedPosition(newPos.x, newPos.y);
      return { ...prev, scale: newScale, position: boundedPos };
    });
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    handleZoom(e.deltaY < 0 ? 0.25 : -0.25);
  };

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      isDragging: true,
      dragStart: {
        x: e.clientX - prev.position.x,
        y: e.clientY - prev.position.y,
      },
    }));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!state.isDragging) return;
    e.preventDefault();

    requestAnimationFrame(() => {
      const newX = e.clientX - state.dragStart.x;
      const newY = e.clientY - state.dragStart.y;
      const boundedPosition = getBoundedPosition(newX, newY);
      setState((prev) => ({ ...prev, position: boundedPosition }));
    });
  };

  const handleMouseUp = () => {
    setState((prev) => ({ ...prev, isDragging: false }));
  };

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      position: { x: 0, y: 0 },
      scale: 1,
      rotation: 0,
    }));
  }, [mediaUrl]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && hasNext && onNext) onNext();
      else if (e.key === "ArrowLeft" && hasPrev && onPrev) onPrev();
      else if ((e.key === "+" || e.key === "=") && state.scale < 2)
        handleZoom(0.25);
      else if (e.key === "-" && state.scale > 0.5) handleZoom(-0.25);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, hasNext, hasPrev, state.scale]);

  return (
    <div className="fixed inset-0 w-screen h-screen max-w-none p-0 bg-black/50 z-[9999]">
      <Toolbar
        title={title}
        onClose={onClose}
        onZoomIn={() => handleZoom(0.25)}
        onZoomOut={() => handleZoom(-0.25)}
        onRotate={() =>
          setState((prev) => ({
            ...prev,
            rotation: (prev.rotation + 90) % 360,
            position: { x: 0, y: 0 },
          }))
        }
        onDownload={() => window.open(mediaUrl, "_blank")}
        scale={state.scale}
      />

      <div
        ref={containerRef}
        role="presentation"
        tabIndex={0}
        className="w-full h-full flex items-center justify-center pt-16 overflow-hidden focus:outline-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div className="relative max-w-[65vw] max-h-[65vh] flex items-center justify-center">
          {state.isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/10 animate-pulse" />
            </div>
          )}
          <img
            ref={imageRef}
            src={mediaUrl}
            alt={title}
            className={`max-w-full max-h-[calc(100vh-8rem)] object-contain shadow-xl select-none ${
              state.isLoading
                ? "opacity-0"
                : "opacity-100 transition-all duration-300"
            } ${state.isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{
              transform: `translate(${state.position.x}px, ${state.position.y}px) scale(${state.scale}) rotate(${state.rotation}deg)`,
              transition: state.isDragging ? "none" : "transform 0.3s ease-out",
            }}
            onLoad={() => setState((prev) => ({ ...prev, isLoading: false }))}
            onMouseDown={handleMouseDown}
            draggable={false}
          />
        </div>
      </div>

      {hasPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 rounded-full text-white/80 hover:text-white transition-all duration-200 z-[9999]"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 rounded-full text-white/80 hover:text-white transition-all duration-200 z-[9999]"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
