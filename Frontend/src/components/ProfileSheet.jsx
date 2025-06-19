import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useGetBalance } from "@/hooks/queries/internalQueries";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSheetHistory } from "@/hooks/useSheetHistory";
import { selectTheme, setTheme } from "@/store/slices/themeSlice";
import {
  ArrowLeftRightIcon,
  LogOut,
  MoonIcon,
  Settings,
  SlidersHorizontal,
  SunIcon,
  UserIcon,
  WalletMinimalIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router";

const themeMaping = [
  { name: "system", icon: SlidersHorizontal },
  { name: "dark", icon: MoonIcon },
  { name: "light", icon: SunIcon },
];

function ProfileSheet({ children }) {
  const { isOpen, handleOpenChange } = useSheetHistory("profileSheetOpen");
  const isMobile = useIsMobile();
  const { data: balance } = useGetBalance();
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <Sheet modal={!isMobile} open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="h-lvh w-full pb-18 sm:min-w-md sm:pb-0 sm:pl-6">
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-4">
          {/*================== Profile Info ================== */}
          <div className="flex flex-col items-center gap-2">
            <Avatar className="size-16">
              <AvatarImage
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/a/AATXAJwJ56LqNyGRvIdELAraD5tw4mwn6jZq7C8JP_oV=s96-c"
                alt="User Profile Picture"
              />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-center text-lg font-semibold">John Doe</h3>
              <p className="text-muted-foreground">john.doe@gmail.com</p>
            </div>
          </div>
          <Separator className="my-6" />
          {/* =============== Menu Items =============== */}
          <div className="space-y-8 text-[0.94rem] sm:font-medium">
            <div tabIndex={0} className="flex">
              <div className="flex">
                <WalletMinimalIcon />
                <span className="ml-4">Balance : ₹ {balance}</span>
              </div>
            </div>

            <div tabIndex={0} className="flex">
              <UserIcon />
              <span className="ml-4">Account Details</span>
            </div>

            <div tabIndex={0} className="flex">
              <ArrowLeftRightIcon />
              <span className="ml-4">Transactions</span>
            </div>

            <div tabIndex={0} className="flex">
              <Settings />
              <span className="ml-4">Settings</span>
            </div>
          </div>

          {/*  ============== Theme Btns ============== */}
          <div className="Theme-Btns mt-auto flex justify-around sm:font-medium">
            {themeMaping.map((theme) => (
              <div key={theme.name}>
                <Button
                  onClick={() => dispatch(setTheme(theme.name))}
                  size="lg"
                  variant="outline"
                  className={`h-12 w-18 ${currentTheme === theme.name && "!bg-input"}`}
                >
                  <theme.icon className="size-5" />
                </Button>
                <p className="mt-2 text-center text-sm capitalize">{theme.name}</p>
              </div>
            ))}
          </div>
        </div>

        <SheetFooter>
          <Button onClick={() => navigate("/auth/logout")} variant="outline" className="w-full gap-3">
            <LogOut className="size-4" />
            Logout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ProfileSheet;
