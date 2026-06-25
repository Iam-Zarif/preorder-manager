import type { ReactNode } from "react";

type FieldProps = {
  label: ReactNode;
  description: string;
  children: ReactNode;
};

export function Field({ label, description, children }: FieldProps) {
  return (
    <div className="grid grid-cols-[220px_1fr] gap-[24px] border-b border-[#e0e3e7] py-[20px] last:border-b-0">
      <div>
        <label className="block text-[14px] font-bold leading-[20px] text-[#071323]">
          {label}
        </label>
        <p className="mt-[4px] max-w-[190px] text-[14px] leading-[20px] text-[#5f6b85]">
          {description}
        </p>
      </div>
      <div className="pt-[2px]">{children}</div>
    </div>
  );
}
