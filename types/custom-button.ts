import { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "default"
  | "outline"
  | "ghost"
  | "secondary"
  | "link";

export interface CustomButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly title: string;
  readonly onClick: () => void;
  readonly icon?: ReactNode;
  readonly variant?: ButtonVariant;
  readonly className?: string;
}
