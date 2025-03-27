import React, { useEffect, useState, MouseEvent, WheelEvent } from "react";
import dynamic from "next/dynamic";
import { MediaPreviewProps, PreviewState } from "./types";

// Dynamically import components
const Toolbar = dynamic(() =>
  import("./toolbar").then((mod) => ({ default: mod.Toolbar }))
);
const Navigation = dynamic(() =>
  import("./navigation").then((mod) => ({ default: mod.Navigation }))
);
const ImageViewer = dynamic(() =>
  import("./image-viewer").then((mod) => ({ default: mod.ImageViewer }))
);

export default function MediaPreview({
  onClose,
  title,
  mediaUrl,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}: MediaPreviewProps) {
  const [state, setState] = useState<PreviewState>({
    isLoading: true,
    scale: 1,
    rotation: 0,
    position: { x: 0, y: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
  });

  const getBoundedPosition = (newX: number, newY: number) => {
    const container = document.querySelector(".image-container");
    const image = document.querySelector(".preview-image");
    if (!container || !image) return { x: newX, y: newY };

    const containerRect = container.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();
    const scaledWidth = imageRect.width * state.scale;
    const scaledHeight = imageRect.height * state.scale;
    const maxX = Math.max(0, (scaledWidth - containerRect.width) / 2);
    const maxY = Math.max(0, (scaledHeight - containerRect.height) / 2);

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

      <ImageViewer
        title={title}
        mediaUrl={mediaUrl}
        isLoading={state.isLoading}
        scale={state.scale}
        rotation={state.rotation}
        position={state.position}
        isDragging={state.isDragging}
        onLoad={() => setState((prev) => ({ ...prev, isLoading: false }))}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />

      <Navigation
        onNext={onNext}
        onPrev={onPrev}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </div>
  );
}
