import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import ProfilePage from "@/pages/ProfilePage";

function ProfileSheet({ children }) {
  const isMobile = useIsMobile();

  return (
    <Sheet modal={!isMobile}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="relative flex size-8.5 shrink-0 overflow-hidden rounded-full"
        >
          {children}
        </button>
      </SheetTrigger>
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
