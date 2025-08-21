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
import { DashboardForm } from "./add-application-form";

export default function AddApplicationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Application</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>App New Application</DialogTitle>
        </DialogHeader>
        <DashboardForm />
        <DialogFooter>
          <Button type="submit">Submit</Button>
          <DialogClose asChild>
            <Button variant={"destructive"}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
