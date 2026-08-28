import type { ChangeEvent, ReactNode } from "react";

const inputBase =
  "w-full min-h-[52px] px-4 bg-paper border rounded-xl text-[15.5px] focus:outline-none focus:ring-[3px] focus:ring-brand/[.18] focus:border-brand";

function borderClass(invalid: boolean) {
  return invalid ? "border-brand" : "border-border-strong";
}

function FieldShell({
  id,
  label,
  required,
  helper,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  helper?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-ink flex items-baseline gap-1.5 text-[14.5px] font-semibold">
        <span>{label}</span>
        <span className={required ? "text-brand text-sm font-semibold" : "text-faint text-[11.5px] font-medium"}>
          {required ? "*" : "Optional"}
        </span>
      </label>
      {children}
      {helper && !error ? <p className="text-faint text-[13px] leading-snug">{helper}</p> : null}
      {error ? (
        <p role="alert" className="text-brand-strong flex items-center gap-1.5 text-[13.5px] font-medium">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4.5M12 16h.01" />
          </svg>
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

interface BaseFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
  helper?: string;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  required,
  error,
  helper,
  type = "text",
  autoComplete,
  inputMode,
}: BaseFieldProps & { type?: string; autoComplete?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"] }) {
  return (
    <FieldShell id={id} label={label} required={required} helper={helper} error={error}>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={!!error}
        className={`${inputBase} ${borderClass(!!error)}`}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  required,
  error,
  helper,
  options,
  placeholder,
}: BaseFieldProps & { options: string[]; placeholder: string }) {
  return (
    <FieldShell id={id} label={label} required={required} helper={helper} error={error}>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={`${inputBase} ${borderClass(!!error)}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function TextareaField({ id, label, value, onChange, required, error, helper }: BaseFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} helper={helper} error={error}>
      <textarea
        id={id}
        name={id}
        rows={4}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={`${inputBase} min-h-[120px] resize-y py-3.5 font-sans leading-relaxed ${borderClass(!!error)}`}
      />
    </FieldShell>
  );
}

export function RadioGroupField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  options: string[];
}) {
  return (
    <FieldShell id={id} label={label}>
      <div role="radiogroup" aria-labelledby={id} className="flex flex-wrap gap-2.5">
        {options.map((opt) => {
          const checked = value === opt;
          return (
            <label
              key={opt}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-[15px] cursor-pointer ${
                checked ? "border-brand bg-brand-tint" : "border-border-strong bg-paper"
              }`}
            >
              <input type="radio" name={id} value={opt} checked={checked} onChange={onChange} className="accent-brand h-[17px] w-[17px]" />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
    </FieldShell>
  );
}

export function CheckboxField({
  id,
  label,
  checked,
  onChange,
  error,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          id={id}
          name={id}
          checked={checked}
          onChange={onChange}
          aria-invalid={!!error}
          className="accent-brand mt-0.5 h-[19px] w-[19px] flex-none"
        />
        <span className="text-ink text-[14.5px] leading-relaxed">{label}</span>
      </label>
      {error ? (
        <p role="alert" className="text-brand-strong pl-8 text-[13.5px] font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
}
