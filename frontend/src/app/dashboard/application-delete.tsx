import { ApplicationReceive } from "./constants";
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

interface DashboardApplicationDeleteProps {
  application: ApplicationReceive;
}

export function DashboardApplicationDelete({
  application: { position, company, id },
}: DashboardApplicationDeleteProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch(`/api/applications/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    setOpen(false);

    setTimeout(() => void 0, 10);

    router.refresh();
  };

  return isMobile ? (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Trigger />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="justify-start">
            Delete application
          </DrawerTitle>
        </DrawerHeader>
        <Content />
        <DrawerFooter className="flex justify-end gap-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Footer />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Trigger />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete application</DialogTitle>
        </DialogHeader>
        <Content />
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Footer />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  function Trigger() {
    return (
      <Button onClick={() => setOpen(true)} size="icon" variant="outline">
        <Trash2Icon />
      </Button>
    );
  }

  function Content() {
    return (
      <p>
        Are you sure you want to delete <b>{position}</b> @ <b>{company}</b>?
      </p>
    );
  }

  function Footer() {
    return (
      <Button onClick={handleClick} variant="destructive">
        Confirm
      </Button>
    );
  }
}
