import { ReactNode, ButtonHTMLAttributes } from "react";

// Button Types
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

// Card Types
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

// Filter Types
export interface BucketFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: "size" | "date" | null;
  setActiveFilter: (filter: "size" | "date" | null) => void;
  regions?: string[];
  selectedRegion?: string | null;
  onRegionChange?: (region: string | null) => void;
  sortOrder?: "asc" | "desc";
}

// Select Types
export interface SelectOption {
  value: string;
  label: string;
}
