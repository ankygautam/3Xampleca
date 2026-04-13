import { useId, type HTMLInputTypeAttribute } from "react";
import { cn } from "../../lib/utils";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  className?: string;
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  required = false,
  type = "text",
  className,
}: TextInputProps) {
  const id = useId();

  return (
    <label className={cn("block", className)} htmlFor={id}>
      <div className="field-label">
        <span>{label}</span>
        {required ? <span className="text-slate-400">*</span> : null}
      </div>
      <input
        className="field-input"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      {helperText ? (
        <p className="field-help">{helperText}</p>
      ) : null}
    </label>
  );
}
