//---------- React ----------
import { useState, type ReactElement } from "react";

//---------- Packages ----------
import { AlertDialog } from "@base-ui/react/alert-dialog";

//---------- Components ----------
import { Button } from "@/shared/components/ui/button";

interface ConfirmDeleteDialogProps {
  trigger: ReactElement;
  title: string;
  description: string;
  onDelete: () => void;
}

export default function ConfirmDeleteDialog({ trigger, title, description, onDelete }: ConfirmDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  function deleteEntry() {
    try {
      onDelete();
      setOpen(false);
    } catch {
      setError(true);
    }
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={(nextOpen) => {
      if (nextOpen) setError(false);
      setOpen(nextOpen);
    }}>
      <AlertDialog.Trigger render={trigger} />
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 z-40 bg-black/45" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md -translate-1/2 overflow-auto rounded-xl border bg-popover p-5 text-popover-foreground shadow-lg sm:p-6">
          <AlertDialog.Title className="text-lg font-semibold tracking-tight">{title}</AlertDialog.Title>
          <AlertDialog.Description className="mt-1 wrap-anywhere text-sm text-muted-foreground">
            {description}
          </AlertDialog.Description>
          {error && <p className="mt-4 text-sm text-destructive" role="alert">Couldn’t save the deletion. Try again.</p>}
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <AlertDialog.Close render={<Button type="button" variant="outline" className="h-11 px-4" />}>
              Cancel
            </AlertDialog.Close>
            <Button type="button" variant="destructive" className="h-11 px-4" onClick={deleteEntry}>
              Delete
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
