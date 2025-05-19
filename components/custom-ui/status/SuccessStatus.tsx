import SuccessIcon from "../../icons/SuccessIcon";

export default function SuccessStatus() {
  return (
    <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
      <SuccessIcon />
      Connection Established
    </span>
  );
}
