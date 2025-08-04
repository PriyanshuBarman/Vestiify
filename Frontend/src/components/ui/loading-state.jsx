import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const LoadingState = ({ isLoading, className = "" }) => {
  if (isLoading) {
    return (
      <div className={cn("flex justify-center", className)}>
        <div className="bg-accent flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium italic">
          <Loader2 className="size-4 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // if (showSuccessMessage) {
  //   return (
  //     <div
  //       className={`flex justify-center transition-all duration-150 ease-in-out ${
  //         isExiting
  //           ? "-translate-y-2 transform opacity-0"
  //           : "translate-y-0 transform opacity-100"
  //       } ${className}`}
  //     >
  //       <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1 text-sm font-medium text-green-700">
  //         <Check className="size-4" /> {successText}
  //       </div>
  //     </div>
  //   );
  // }
};

export default LoadingState;
