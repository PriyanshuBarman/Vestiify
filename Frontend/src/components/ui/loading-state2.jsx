import { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react";

const LoadingState = ({
  isLoading,
  data,
  loadingText = "Loading...",
  successText = "Loaded successfully!",
  showSuccess = true,
  successDuration = 2000,
  className = "",
}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isLoading && data && data.length > 0 && showSuccess) {
      setShowSuccessMessage(true);
      setIsExiting(false);
      const timer = setTimeout(() => {
        setIsExiting(true);
        // Remove from DOM after animation completes
        setTimeout(() => {
          setShowSuccessMessage(false);
          setIsExiting(false);
        }, 300); // Match the animation duration
      }, successDuration);
      return () => clearTimeout(timer);
    }
  }, [isLoading, data, showSuccess, successDuration]);

  if (isLoading) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="bg-accent flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium italic">
          <Loader2 className="size-4 animate-spin" /> {loadingText}
        </div>
      </div>
    );
  }

  if (showSuccessMessage) {
    return (
      <div
        className={`flex justify-center transition-all duration-300 ease-in-out ${
          isExiting 
            ? "transform -translate-y-2 opacity-0" 
            : "transform translate-y-0 opacity-100"
        } ${className}`}
      >
        <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1 text-sm font-medium text-green-700">
          <Check className="size-4" /> {successText}
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingState;