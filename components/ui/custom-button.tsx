import { cn } from "@/lib/utils";
import type { CustomButtonProps } from "@/types/ui";

export default function CustomButton({
  title,
  onClick,
  icon,
  variant = "default",
  className,
  ...props
}: Readonly<CustomButtonProps>) {
  const variantStyles = {
    default: "glass-button",
    outline:
      "glass-card glass-text border border-white/30 dark:border-white/10",
    ghost: "glass-hover glass-text",
    secondary:
      "bg-white/30 dark:bg-white/10 glass-text hover:bg-white/40 dark:hover:bg-white/20",
    link: "bg-transparent text-primary text-base font-medium hover:text-primary/80 p-0 rounded-none transition-colors", // removed underline, increased text size, added hover effect
  };

  return (
    <button
      className={cn(
        "flex items-center gap-2 text-sm",
        "transition-colors duration-200 cursor-pointer",
        "rounded-full px-4 py-2 w-fit",
        variantStyles[variant],
        className,
        variant === "link" && "px-0 py-0 rounded-none text-base font-medium"
      )}
      onClick={onClick}
      aria-label={`${title}`}
      {...props}
    >
      {icon}
      {title}
    </button>
  );
}
