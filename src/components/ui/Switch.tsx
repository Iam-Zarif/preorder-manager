type SwitchProps = {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: () => void;
};

export function Switch({ checked, disabled, label, onChange }: SwitchProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={checked}
      disabled={disabled}
      type="button"
      onClick={onChange}
      className={[
"relative cursor-pointer h-[20px] w-[32px] rounded-[6px] transition",
        checked ? "bg-[#202124]" : "bg-[#e1e4e8]",
        disabled ? "cursor-not-allowed opacity-70" : "",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-[4px] h-[12px] w-[12px] rounded-[3px] bg-white transition",
          checked ? "left-[16px]" : "left-[4px]",
        ].join(" ")}
      />
    </button>
  );
}
