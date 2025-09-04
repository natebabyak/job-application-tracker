"use client";

import { Application, ApplicationWithId } from "@/lib/constants";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DashboardApplicationForm } from "./application-form";
import { formatISO } from "date-fns";
import { Edit2Icon } from "lucide-react";

export function DashboardEditApplicationButton({
  application: { position, company, submitted_on, status, id },
}: {
  application: ApplicationWithId;
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const defaultValues = {
    position: position,
    company: company,
    submitted_on: new Date(submitted_on),
    status: status,
  };

  const onSubmit = async (values: Application) => {
    const application = {
      ...values,
      submitted_on: formatISO(values.submitted_on, { representation: "date" }),
    };

    const response = await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    });

    if (!response.ok) throw new Error("Something went wrong");

    setOpen(false);
    setTimeout(() => router.refresh(), 300);
  };

  return isMobile ? (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button size="icon" variant="outline">
          <Edit2Icon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="justify-start"></DrawerTitle>
        </DrawerHeader>
        <DashboardApplicationForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        />
        <DrawerFooter className="flex justify-end gap-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button form="application" type="submit">
            Save Changes
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Edit2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
        </DialogHeader>
        <DashboardApplicationForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        />
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="application" type="submit">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
