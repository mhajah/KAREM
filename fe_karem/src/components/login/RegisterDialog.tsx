import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RegisterForm } from "./RegisterForm";
import React from "react";

export function RegisterDialog({ link = false }: { link?: boolean }) {
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <Dialog>
      <DialogTrigger asChild ref={ref}>
        <Button variant={link ? "outline" : "default"} size={link ? "sm" : "default"}>
          Zarejestruj się
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-foreground">
        <DialogHeader>
          <DialogTitle>Rejestracja</DialogTitle>
        </DialogHeader>
        <RegisterForm triggerRef={ref} />
      </DialogContent>
    </Dialog>
  );
}
