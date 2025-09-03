import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function FundLogo({ fundHouseDomain, className }) {
  return (
    <Avatar className={cn("size-9 rounded-md sm:size-10", className)}>
      <AvatarImage
        src={`https://img.logo.dev/${fundHouseDomain}?token=pk_Rlq_iuMcQHGZ2xOrcVGX7g&retina=true`}
        alt={`logo`}
        className="object-contain"
      />
      <AvatarFallback className={cn("rounded-md sm:size-10", className)} />
    </Avatar>
  );
}

export default FundLogo;
