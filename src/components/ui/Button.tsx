import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/src/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "icon";
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-lg border text-[14px] font-bold leading-none shadow-none transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "h-9.5 border-[#111317] bg-[#202124] px-4.5 text-white hover:bg-[#111317]",
        variant === "secondary" &&
          "h-9.5 border-[#dfe3e8] bg-white px-4.5 text-[#101828] hover:bg-[#f7f7f7]",
        variant === "icon" &&
          "h-7 w-7 border-[#d8dde3] bg-white p-0 text-[#2d3135] hover:bg-[#f7f7f7]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
