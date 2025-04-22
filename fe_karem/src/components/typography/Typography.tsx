import { cn } from "@/lib/utils";

type HeaderProps = {
  children: React.ReactNode;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

export const Header = ({ children, variant, className }: HeaderProps) => {
  if (variant === "h1") {
    return <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>{children}</h1>
  }
  if (variant === "h2") {
    return <h2 className={cn("scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl", className)}>{children}</h2>
  }
  if (variant === "h3") {
    return <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>{children}</h3>
  }
  if (variant === "h4") {
    return <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>{children}</h4>
  }
  if (variant === "h5") {
    return <h5 className={cn("scroll-m-20 text-lg font-semibold tracking-tight", className)}>{children}</h5>
  }
  if (variant === "h6") {
    return <h6 className={cn("scroll-m-20 text-base font-semibold tracking-tight", className)}>{children}</h6>
  }
  return null;
}

type CaptionProps = {
  children: React.ReactNode;
  className?: string;
}

export const Caption = ({ children, className }: CaptionProps) => {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
}

