import ErrorIcon from "../../icons/ErrorIcon";

export default function ErrorStatus() {
  return (
    <span className="text-red-600 dark:text-red-400 font-medium flex items-center backdrop-blur-sm">
      <ErrorIcon />
      Connection failed
    </span>
  );
}
