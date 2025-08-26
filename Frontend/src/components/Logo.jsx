import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

function Logo() {
  return (
    <Avatar className="size-10 rounded-full sm:size-12">
      <AvatarImage src="favicon.ico" className="scale-130" alt="Logo" />
      <AvatarFallback>VS</AvatarFallback>
    </Avatar>
  );
}

export default Logo;
