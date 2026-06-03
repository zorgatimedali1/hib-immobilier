interface BadgeProps {
  variant?: 'magenta' | 'leaf' | 'slate' | 'red' | 'amber';
  children: string;
}

const variants: Record<string, string> = {
  magenta: 'bg-magenta/10 text-magenta',
  leaf: 'bg-leaf/10 text-leaf',
  slate: 'bg-slate-100 text-slate-600',
  red: 'bg-red-100 text-red-700',
  amber: 'bg-amber-100 text-amber-700',
};

export default function Badge({ variant = 'slate', children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
}
