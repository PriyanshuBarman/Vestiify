import Logo from "@/components/Logo";
import ProfileSheet from "@/components/ProfileSheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-togle";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SearchIcon, ShoppingCart } from "lucide-react";
import MediaQuery from "react-responsive";
import { NavLink, useLocation, useNavigate } from "react-router";
import Desktopsearch from "../features/search/DesktopSearch";

const allowedRoutes = new Set(["/mutual-funds", "/stocks", "/gold"]);

function Navbar() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  if (!allowedRoutes.has(location.pathname) && isMobile) return;

  return (
    <nav className="bg-background z-50 flex h-16 items-center justify-between gap-8 px-4 sm:px-12 xl:px-0">
      <div className="flex items-center gap-0 sm:gap-8">
        <Logo />
        <NavLinks />
      </div>

      <MediaQuery minWidth={1100}>
        <Desktopsearch />
      </MediaQuery>

      {/* ========= Right side buttons ============ */}
      <div className="flex items-center justify-start gap-3 xl:gap-6">
        <Button
          aria-label="search"
          variant="ghost"
          onClick={() => navigate("/search")}
          size="icon"
          className="min-[1100px]:hidden"
        >
          <SearchIcon className="size-5.5" />
        </Button>
        <Button aria-label="cart" variant="ghost" size="icon">
          <ShoppingCart className="size-5.5" />
        </Button>
        {!isMobile && <ModeToggle />}
        <ProfileSheet>
          <Avatar tabIndex={0} className="size-8.5">
            <AvatarImage
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/a/AATXAJwJ56LqNyGRvIdELAraD5tw4mwn6jZq7C8JP_oV=s96-c"
              alt="User Profile Picture"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </ProfileSheet>
      </div>
    </nav>
  );
}

export default Navbar;

function NavLinks() {
  return (
    <div className="flex sm:gap-2">
      <NavLink
        to="/coming-soon"
        className={({ isActive }) =>
          `${isActive ? "sm:text-primary" : "text-muted-foreground hidden sm:inline-block"} shrink-0 rounded-md p-2 text-[0.95rem] font-semibold sm:text-sm sm:text-[1.08rem]`
        }
      >
        Stocks
      </NavLink>

      <NavLink
        to="/mutual-funds#explore"
        className={({ isActive }) =>
          `${isActive ? "sm:text-primary" : "text-muted-foreground hidden sm:inline-block"} shrink-0 rounded-md p-2 text-[0.95rem] font-semibold sm:text-sm sm:text-[1.08rem]`
        }
      >
        Mutual Funds
      </NavLink>
    </div>
  );
}
