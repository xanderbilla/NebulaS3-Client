type BackgroundShapeVariant = 
  | "default"
  | "about" 
  | "contact" 
  | "404" 
  | "login";

interface BackgroundShapeProps {
  variant?: BackgroundShapeVariant;
}

export default function BackgroundShape({ variant = "default" }: BackgroundShapeProps) {
  // Simplified approach - less complex class concatenation
  const baseClasses = "pointer-events-none absolute z-0 bg-gradient-to-br from-purple-200/60 via-pink-200/40 to-transparent dark:from-purple-900/40 dark:via-pink-900/30 dark:to-transparent";
  
  // Specific styles for default variant only - reduces conditional logic
  if (variant === "default") {
    return (
      <div 
        className={`${baseClasses} top-[-8rem] left-1/2 -translate-x-1/2 w-[120vw] h-[60vw] max-w-[1200px] max-h-[600px] rounded-b-full blur-2xl`} 
      />
    );
  }
  
  // Optional variants only loaded when needed
  if (variant === "about") {
    return (
      <div 
        className={`${baseClasses} top-[-6rem] left-[40%] -translate-x-1/2 w-[100vw] h-[40vw] max-w-[1100px] max-h-[500px] rounded-l-[60%] rounded-br-[40%] blur-3xl`}
      />
    );
  }
  
  if (variant === "contact") {
    return (
      <div 
        className={`${baseClasses} top-[-10rem] left-[65%] -translate-x-1/2 w-[90vw] h-[50vw] max-w-[1000px] max-h-[480px] rounded-tr-[80%] rounded-bl-[40%] blur-xl`}
      />
    );
  }
  
  if (variant === "404") {
    return (
      <div 
        className={`${baseClasses} top-[-12rem] left-1/2 -translate-x-1/2 w-[130vw] h-[65vw] max-w-[1300px] max-h-[650px] rounded-tl-[70%] rounded-br-[70%] blur-[100px]`}
      />
    );
  }
  
  if (variant === "login") {
    return (
      <div 
        className={`${baseClasses} top-[-7rem] left-[30%] -translate-x-1/2 w-[95vw] h-[45vw] max-w-[950px] max-h-[450px] rounded-br-[80%] rounded-tl-[40%] blur-2xl`}
      />
    );
  }
  
  // Default fallback
  return (
    <div 
      className={`${baseClasses} top-[-8rem] left-1/2 -translate-x-1/2 w-[120vw] h-[60vw] max-w-[1200px] max-h-[600px] rounded-b-full blur-2xl`} 
    />
  );
}
