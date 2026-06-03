import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export default function Select({ label, error, options, className = '', id, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-[#475569] uppercase tracking-wide">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`h-10 px-3 rounded-lg border bg-white text-sm text-[#0F172A] transition-colors focus:outline-none focus:ring-2 focus:ring-magenta focus:border-magenta ${
          error ? 'border-red-400' : 'border-[#E2E8F0]'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
