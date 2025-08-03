import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

function LoadingState({ isLoading, className = "" }) {
  if (isLoading) {
    return (
      <div className={cn("flex justify-center", className)}>
        <div className="bg-accent flex items-center gap-2 rounded-full px-4 py-1 text-xs italic shadow">
          <Loader2Icon className="size-4 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }
}

export default LoadingState;
