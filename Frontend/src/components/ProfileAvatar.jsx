import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useGetUserData } from "@/hooks/queries/internalQueries";
import { formatDate } from "date-fns";

function ProfileAvatar() {
  const { data: user = {} } = useGetUserData();

  return (
    <div className="relative flex items-center justify-center">
      <Avatar className="size-20">
        <AvatarImage
          referrerPolicy="no-referrer"
          src={user.avatar}
          alt="User Profile Picture"
        />
        <AvatarFallback className="text-3xl font-semibold text-shadow-lg">
          {user.name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Circular Text */}
      <svg
        viewBox="0 0 200 200"
        className="text-muted-foreground absolute size-[120px] text-[1.02rem] tracking-widest uppercase"
      >
        <defs>
          <path
            id="circlePath"
            d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
          />
        </defs>
        <text fill="currentColor">
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            • Growing Since {formatDate(user.createdAt, "MMM yy")} • Growing
            Since {formatDate(user.createdAt, "MMM yy")}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export default ProfileAvatar;
