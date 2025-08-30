import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

function Logo() {
  return (
    <Avatar className="sm:size-9">
      <AvatarImage src="logo.png" className="" alt="Logo" />
      <AvatarFallback />
    </Avatar>
  );
}

export default Logo;
