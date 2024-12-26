import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProfileForm } from "./LoginForm";

export function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Zaloguj się</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-foreground">
        <DialogHeader>
          <DialogTitle>Logowanie</DialogTitle>
          <DialogDescription>Jeżeli nie posiadasz konta, zarejestruj się.</DialogDescription>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
}
