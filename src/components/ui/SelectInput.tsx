import { ChevronDown } from "lucide-react";
import { useId } from "react";
import { cn } from "../../lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
  placeholder,
  helperText,
  required = false,
  className,
}: SelectInputProps) {
  const id = useId();

  return (
    <label className={cn("block", className)} htmlFor={id}>
      <div className="field-label">
        <span>{label}</span>
        {required ? <span className="text-slate-400">*</span> : null}
      </div>
      <div className="relative mt-2">
        <select
          className="field-select mt-0"
          id={id}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          value={value}
        >
          {placeholder ? (
            <option disabled value="">
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
      {helperText ? (
        <p className="field-help">{helperText}</p>
      ) : null}
    </label>
  );
}
