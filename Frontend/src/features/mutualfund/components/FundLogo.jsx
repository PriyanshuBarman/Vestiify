import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function FundLogo({ shortCode, className }) {
  return (
    <Avatar className={cn("rounded-md sm:size-10", className)}>
      {/* <AvatarImage src={`https://assets2.kuvera.in/production/atlantis/web/assets/img/amc-m/${shortCode}.svg`} /> */}
      <AvatarImage
        src={`https://assets-netstorage.groww.in/mf-assets/logos/${shortCode === "parag" ? "ppfas" : shortCode}_groww.png`}
        className="object-contain"
        alt={`${shortCode} logo`}
      />
      <AvatarFallback className={cn("rounded-md sm:size-10", className)} />
    </Avatar>
  );
}

export default FundLogo;
