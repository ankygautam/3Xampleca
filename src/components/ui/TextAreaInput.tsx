import { useId } from "react";
import { cn } from "../../lib/utils";

interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

export function TextAreaInput({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  required = false,
  rows = 4,
  className,
}: TextAreaInputProps) {
  const id = useId();

  return (
    <label className={cn("block", className)} htmlFor={id}>
      <div className="field-label">
        <span>{label}</span>
        {required ? <span className="text-slate-400">*</span> : null}
      </div>
      <textarea
        className="field-textarea"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={value}
      />
      {helperText ? (
        <p className="field-help">{helperText}</p>
      ) : null}
    </label>
  );
}
