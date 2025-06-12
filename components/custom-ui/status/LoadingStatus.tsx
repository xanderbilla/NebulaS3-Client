import { InlineSpinner } from "@/components/ui/spinner";

export default function LoadingStatus() {
  return (
    <span className="glass-text opacity-70 font-medium flex items-center">
      <InlineSpinner size="sm" />
      Connecting...
    </span>
  );
}
