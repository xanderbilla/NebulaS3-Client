import { ReactNode } from "react";

export interface CardBadge {
  label: string;
  color: "green" | "blue" | "red" | "yellow" | "purple" | "gray";
}

export interface ItemCardProps {
  title: string;
  linkHref: string;
  icon?: ReactNode;
  badges?: CardBadge[];
  description?: string;
  date?: Date;
  className?: string;
  actions?: ReactNode;
  dateFormat?: Intl.DateTimeFormatOptions;
}
