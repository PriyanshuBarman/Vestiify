import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

function LoadingState({ isLoading = true, fullPage, className = "" }) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "flex justify-center",
          fullPage && "h-dvh items-center",
          className,
        )}
      >
        {fullPage ? (
          <Loader2Icon className="text-primary size-12 animate-spin" />
        ) : (
          <div className="bg-accent text-foreground flex h-fit items-center gap-2 rounded-full px-4 py-1 text-xs italic shadow sm:px-6 sm:py-2 sm:font-medium">
            <Loader2Icon className="size-4 animate-spin" />
            <span>Loading...</span>
          </div>
        )}
      </div>
    );
  }
}

export default LoadingState;
