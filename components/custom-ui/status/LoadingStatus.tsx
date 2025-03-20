import LoadingSpinner from "../../icons/LoadingSpinner";

export default function LoadingStatus() {
  return (
    <span className="glass-text opacity-70 font-medium flex items-center">
      <LoadingSpinner />
      Connecting...
    </span>
  );
}
