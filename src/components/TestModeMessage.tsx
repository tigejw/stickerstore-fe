import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "./ui/alert-dialog";

const STORAGE_KEY = "stickerstore-test-mode-ack";

export function TestModeMessage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) setOpen(true);
  }, []);

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="border border-accent/20">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-accent text-lg font-semibold">
            This is a demo store!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-text-muted text-sm leading-relaxed">
            This website is a portfolio project and not a live store. Payments are
            processed through Stripe's test mode meaning no real charges or payments will occur.
            You can use Stripe's test card to checkout the payment handling:D
            <span className="text-text-muted text-xs uppercase tracking-wide block mt-3">
              Test Card
            </span>
            <span className="font-mono text-sm">4242 4242 4242 4242</span>
            <span className="block text-text-muted text-xs mt-1">
              any future expiry · any cvc
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-accent text-white hover:bg-accent/90"
          >
            I understand, enter site
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}