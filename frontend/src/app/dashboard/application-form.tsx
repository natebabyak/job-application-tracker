import {
  Application,
  ApplicationSchema,
  applicationStatuses,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
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
import { zodResolver } from "@hookform/resolvers/zod";

export function DashboardApplicationForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: Application;
  onSubmit: (values: Application) => Promise<void>;
}) {
  const form = useForm<Application>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form id="application" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 px-4 md:px-0">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pointer-events-none">Position</FormLabel>
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
                            {field.value.toISOString().split("T")[0]}
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
                  <FormLabel className="pointer-events-none">Status</FormLabel>
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
