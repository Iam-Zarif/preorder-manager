import { Check } from "lucide-react";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      type="button"
      className="flex h-[16px] w-[16px] cursor-pointer items-center justify-center rounded-[4px] border border-[#9da4ad] bg-white text-white"
    >
      {checked ? <Check size={12} strokeWidth={3} className="text-[#202124]" /> : null}
    </button>
  );
}
