import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

import { cn } from "@/src/lib/utils";

const controlClass =
  "h-[38px] rounded-[7px] border border-[#cdd3da] bg-white px-[12px] text-[14px] leading-none text-[#0b1220] outline-none focus:border-[#9aa4b2] focus:ring-2 focus:ring-[#e6e9ee]";

export function TextInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, "cursor-text", className)} {...props} />;
}

export function SelectInput({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(controlClass, "cursor-pointer", className)} {...props}>
      {children}
    </select>
  );
}
