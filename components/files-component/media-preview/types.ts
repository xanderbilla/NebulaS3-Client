export interface Position {
  x: number;
  y: number;
}

export interface MediaPreviewProps {
  onClose: () => void;
  title: string;
  mediaUrl: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface PreviewState {
  isLoading: boolean;
  scale: number;
  rotation: number;
  position: Position;
  isDragging: boolean;
  dragStart: Position;
}
