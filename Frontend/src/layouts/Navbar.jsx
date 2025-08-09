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
import { useGetUserData } from "@/hooks/queries/internalQueries";

const allowedRoutes = new Set(["/mutual-funds", "/stocks", "/gold"]);

function Navbar() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useGetUserData();

  if (!allowedRoutes.has(location.pathname) && isMobile) return;

  return (
    <nav className="bg-background z-50 flex items-center justify-between gap-8 px-4 pt-4 pb-2 sm:px-12 sm:py-2 xl:px-0">
      <div className="flex items-center gap-0 sm:gap-6">
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
          <Avatar className="size-8.5">
            <AvatarImage
              referrerPolicy="no-referrer"
              src={user?.avatar}
              alt="User Profile Picture"
            />
            <AvatarFallback className="text-3xl font-semibold text-shadow-lg">
              {user?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </ProfileSheet>
      </div>
    </nav>
  );
}

export default Navbar;

function NavLinks() {
  return (
    <div className="mt-2 hidden text-sm sm:mt-0 sm:flex sm:text-lg">
      <NavLink
        to="/coming-soon"
        className={({ isActive }) =>
          `${isActive ? "sm:text-foreground" : "text-muted-foreground hidden sm:inline-block"} shrink-0 rounded-md p-2 font-semibold`
        }
      >
        Stocks
      </NavLink>

      <NavLink
        to="/mutual-funds#explore"
        className={({ isActive }) =>
          `${isActive ? "sm:text-foreground" : "text-muted-foreground hidden sm:inline-block"} shrink-0 rounded-md p-2 font-semibold`
        }
      >
        Mutual Funds
      </NavLink>
    </div>
  );
}
