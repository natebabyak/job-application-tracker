import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

interface DashboardDialogDrawerProps {
  trigger: ReactNode;
  title: string;
  content: ReactNode;
  form?: string;
}

export default function DashboardDialogDrawer({
  trigger,
  title,
  content,
  form,
}: DashboardDialogDrawerProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  return isMobile ? (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        {content}
        <DrawerFooter className="flex justify-end gap-4">
          <DrawerClose asChild>
            <Button>{form ? "Cancel" : "Done"}</Button>
          </DrawerClose>
          {form && (
            <Button form={form} type="submit">
              Submit
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {content}
        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant={form ? "outline" : "default"}>
              {form ? "Cancel" : "Done"}
            </Button>
          </DialogClose>
          {form && (
            <Button form={form} type="submit">
              Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
