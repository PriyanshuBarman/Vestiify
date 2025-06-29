import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function FundLogo({ logoCode, className }) {
  return (
    <Avatar className={cn("rounded-md sm:size-10", className)}>
      {/* <AvatarImage src={`https://assets2.kuvera.in/production/atlantis/web/assets/img/amc-m/${logoCode}.svg`} /> */}
      <AvatarImage
        src={`https://assets-netstorage.groww.in/mf-assets/logos/${logoCode === "parag" ? "ppfas" : logoCode}_groww.png`}
        className="object-contain"
        alt={`${logoCode} logo`}
      />
      <AvatarFallback className={cn("rounded-md sm:size-10", className)} />
    </Avatar>
  );
}

export default FundLogo;
