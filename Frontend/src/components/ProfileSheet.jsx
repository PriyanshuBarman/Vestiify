import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import ProfilePage from "@/pages/ProfilePage";

function ProfileSheet({ children }) {
  const isMobile = useIsMobile();

  return (
    <Sheet modal={!isMobile}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="h-svh min-w-md py-18 sm:rounded-l-2xl"
      >
        <ProfilePage />
      </SheetContent>
    </Sheet>
  );
}

export default ProfileSheet;
