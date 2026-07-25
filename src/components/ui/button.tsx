import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variantClass = variant === "primary"
    ? "admin-gradient-btn text-white hover:opacity-90"
    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50";

  return (
    <button
      className={cn("inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-bold transition disabled:opacity-60", variantClass, className)}
      {...props}
    />
  );
}
