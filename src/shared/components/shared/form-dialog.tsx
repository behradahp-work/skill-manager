//---------- React ----------
import type { FormEventHandler, ReactElement, ReactNode } from "react";

//---------- Packages ----------
import { Dialog } from "@base-ui/react/dialog";

//---------- Components ----------
import { Button } from "@/shared/components/ui/button";

interface FormDialogProps {
  trigger: ReactElement;
  title: string;
  description: string;
  submitLabel: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}

export default function FormDialog({
  trigger,
  title,
  description,
  submitLabel,
  open,
  onOpenChange,
  onSubmit,
  children,
}: FormDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger render={trigger} />
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/45" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md -translate-1/2 overflow-auto rounded-xl border bg-popover p-5 text-popover-foreground shadow-lg sm:p-6">
          <Dialog.Title className="text-lg font-semibold tracking-tight">{title}</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-muted-foreground">{description}</Dialog.Description>
          <form className="mt-5 space-y-5" onSubmit={onSubmit}>
            {children}
            <div className="flex flex-wrap justify-end gap-2">
              <Dialog.Close render={<Button type="button" variant="outline" className="h-11 px-4" />}>
                Cancel
              </Dialog.Close>
              <Button type="submit" className="h-11 px-4">{submitLabel}</Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
