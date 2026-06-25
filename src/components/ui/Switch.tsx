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
"relative cursor-pointer h-5 w-8 rounded-md transition",
        checked ? "bg-[#202124]" : "bg-[#e1e4e8]",
        disabled ? "cursor-not-allowed opacity-70" : "",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-1 h-3 w-3 rounded-[3px] bg-white transition",
          checked ? "left-4" : "left-1",
        ].join(" ")}
      />
    </button>
  );
}
