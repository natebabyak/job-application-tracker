import {
  ApplicationSchema,
  ApplicationSend,
  applicationStatuses,
} from "@/app/dashboard/constants";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface DashboardApplicationAddProps {
  multi: boolean;
}

export function DashboardApplicationAdd({
  multi,
}: DashboardApplicationAddProps) {
  const title = `Add Application${multi && "s"}`;

  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<ApplicationSend>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      position: "",
      company: "",
      submitted_on: new Date(),
      status: "submitted",
    },
  });

  async function onSubmit(values: ApplicationSend) {
    const application = {
      ...values,
      submitted_on: values.submitted_on.toISOString().slice(0, 10),
    };

    const response = await fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    router.refresh();

    form.reset();

    if (!multi) {
      setOpen(false);
    }
  }

  return isMobile ? (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button variant={multi ? "outline" : "default"}>{title}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="justify-start">{title}</DrawerTitle>
        </DrawerHeader>
        <ApplicationAddForm />
        <DrawerFooter className="flex justify-end gap-2">
          <DrawerClose asChild>
            <Button variant="outline">{multi ? "Done" : "Cancel"}</Button>
          </DrawerClose>
          <Button form="application-add" type="submit">
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant={multi ? "outline" : "default"}>{title}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ApplicationAddForm />
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">{multi ? "Done" : "Cancel"}</Button>
          </DialogClose>
          <Button form="application-add" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  function ApplicationAddForm() {
    return (
      <Form {...form}>
        <form id="application-add" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 px-4 md:px-0">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pointer-events-none">
                    Position
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pointer-events-none">Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Apt Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="submitted_on"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pointer-events-none">
                      Submitted on
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline">
                            <span className="font-normal">
                              {field.value.toLocaleDateString()}
                            </span>
                            <CalendarIcon className="ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        side="bottom"
                        className="w-auto p-0"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pointer-events-none">
                      Status
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent align="start" side="bottom">
                        <SelectGroup>
                          <SelectLabel>Statuses</SelectLabel>
                          {applicationStatuses.map((applicationStatus) => (
                            <SelectItem
                              key={applicationStatus}
                              value={applicationStatus}
                            >
                              <span className="capitalize">
                                {applicationStatus}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    );
  }
}
