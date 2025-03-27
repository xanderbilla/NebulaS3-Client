export interface Position {
  x: number;
  y: number;
}

export interface MediaPreviewProps {
  readonly onClose: () => void;
  readonly title: string;
  readonly mediaUrl: string;
  readonly onNext?: () => void;
  readonly onPrev?: () => void;
  readonly hasNext?: boolean;
  readonly hasPrev?: boolean;
}

export interface PreviewState {
  isLoading: boolean;
  scale: number;
  rotation: number;
  position: Position;
  isDragging: boolean;
  dragStart: Position;
}
