import { Button } from "@/components/ui/button";
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
import { Trash2Icon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApplicationWithId } from "../../lib/constants";

export function DashboardDeleteApplicationButton({
  application: { position, company, id },
}: {
  application: ApplicationWithId;
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch(`/api/applications/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Something went wrong");

    setOpen(false);
    setTimeout(() => router.refresh(), 300);
  };

  return isMobile ? (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button onClick={() => setOpen(true)} size="icon" variant="outline">
          <Trash2Icon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="justify-start">
            Delete Application
          </DrawerTitle>
        </DrawerHeader>
        <p>
          Are you sure you want to delete {position} @ {company}?
        </p>
        <DrawerFooter className="flex justify-end gap-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button onClick={handleClick} variant="destructive">
            Confirm
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} size="icon" variant="outline">
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Application</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete {position} @ {company}?
        </p>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleClick} variant="destructive">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
