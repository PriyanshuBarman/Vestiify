import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Loader2Icon } from "lucide-react";

export default function ReusableDialog({
  title = "Dialog Title",
  description = "This is a reusable dialog.",
  children,
  open,
  onOpenChange,
  cancelButtonText,
  confirmButtonText,
  onConfirm,
  isPending = false,
  icon,
  dialogOnly = false,
  drawerOnly = false,
}) {
  const isMobile = useIsMobile();

  if (isMobile && !dialogOnly) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="items-center">
            <div className="mx-auto">{icon}</div>
            <DrawerTitle className="text-center text-lg">{title}</DrawerTitle>

            <DrawerDescription className="text-center text-sm">
              {description}
            </DrawerDescription>
          </DrawerHeader>

          <DrawerFooter className="flex-row">
            {cancelButtonText && (
              <DrawerClose asChild>
                <Button
                  size="lg"
                  variant="outline"
                  disabled={isPending}
                  className="flex-1"
                >
                  {cancelButtonText}
                </Button>
              </DrawerClose>
            )}
            {confirmButtonText && (
              <Button
                size="lg"
                onClick={onConfirm}
                disabled={isPending}
                className="flex-1"
              >
                {isPending ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  confirmButtonText
                )}
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  if (!drawerOnly) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="gap-8">
          <DialogHeader className="items-center">
            <div className="mx-auto">{icon}</div>
            <DialogTitle className="text-center text-lg">{title}</DialogTitle>

            <DialogDescription className="text-center text-sm">
              {description}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-row gap-3">
            {cancelButtonText && (
              <DialogClose asChild>
                <Button
                  size="lg"
                  variant="outline"
                  disabled={isPending}
                  className="flex-1"
                >
                  {cancelButtonText}
                </Button>
              </DialogClose>
            )}
            {confirmButtonText && (
              <Button
                size="lg"
                onClick={onConfirm}
                disabled={isPending}
                className="flex-1"
              >
                {isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  confirmButtonText
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
