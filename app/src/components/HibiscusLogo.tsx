interface HibiscusLogoProps {
  className?: string;
  monochrome?: boolean;
}

export default function HibiscusLogo({ className = '', monochrome = false }: HibiscusLogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M24 8C24 8 18 14 18 20C18 24 21 27 24 27C27 27 30 24 30 20C30 14 24 8 24 8Z"
        fill={monochrome ? 'currentColor' : '#D6007D'}
      />
      <path
        d="M24 8C24 8 30 14 30 20C30 24 27 27 24 27C21 27 18 24 18 20C18 14 24 8 24 8Z"
        fill={monochrome ? 'currentColor' : '#F04EA6'}
        opacity="0.8"
      />
      <path
        d="M24 12C24 12 14 16 12 22C10 26 13 30 16 30C19 30 22 27 22 23C22 19 24 12 24 12Z"
        fill={monochrome ? 'currentColor' : '#D6007D'}
        opacity="0.7"
      />
      <path
        d="M24 12C24 12 34 16 36 22C38 26 35 30 32 30C29 30 26 27 26 23C26 19 24 12 24 12Z"
        fill={monochrome ? 'currentColor' : '#D6007D'}
        opacity="0.7"
      />
      <path
        d="M24 16C24 16 16 20 15 26C14 30 17 33 20 32C23 31 25 28 25 24C25 21 24 16 24 16Z"
        fill={monochrome ? 'currentColor' : '#F04EA6'}
        opacity="0.6"
      />
      <path
        d="M24 16C24 16 32 20 33 26C34 30 31 33 28 32C25 31 23 28 23 24C23 21 24 16 24 16Z"
        fill={monochrome ? 'currentColor' : '#F04EA6'}
        opacity="0.6"
      />
      <circle cx="24" cy="20" r="4" fill={monochrome ? 'currentColor' : '#F59E0B'} />
      <circle cx="24" cy="18" r="1.5" fill={monochrome ? 'currentColor' : '#FBBF24'} />
      <circle cx="22" cy="21" r="1" fill={monochrome ? 'currentColor' : '#FBBF24'} />
      <circle cx="26" cy="21" r="1" fill={monochrome ? 'currentColor' : '#FBBF24'} />
      <circle cx="24" cy="23" r="1" fill={monochrome ? 'currentColor' : '#FBBF24'} />
    </svg>
  );
}
