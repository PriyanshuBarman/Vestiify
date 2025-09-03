import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export function ConfirmationDrawer({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmButtonText,
  isPending,
}) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="mx-auto max-w-md">
        <div className="p-6">
          <DrawerHeader>
            <DrawerTitle className="text-center text-xl font-medium">
              {title}
            </DrawerTitle>
            <DrawerDescription className="text-center text-base">
              {description}
            </DrawerDescription>
          </DrawerHeader>

          <div className="mt-8 flex flex-col gap-3">
            <Button
              variant="destructive"
              className="w-full py-6 text-base font-medium"
              onClick={onConfirm}
              disabled={isPending}
            >
              {isPending ? "Processing..." : confirmButtonText}
            </Button>

            <DrawerClose asChild>
              <Button
                variant="outline"
                className="w-full py-6 text-base font-medium"
              >
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
