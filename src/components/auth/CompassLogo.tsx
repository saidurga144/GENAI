
export function CompassLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="8" fill="url(#logo-gradient)" fillOpacity="0.1" />
      <rect x="1" y="1" width="38" height="38" rx="7" stroke="url(#logo-gradient)" strokeWidth="2" />
      <circle cx="20" cy="20" r="10" stroke="url(#logo-gradient)" strokeWidth="2" strokeOpacity="0.8" />
      <circle cx="20" cy="20" r="6" stroke="url(#logo-gradient)" strokeWidth="2" strokeOpacity="0.8" />
      <path
        d="M20 16L22.5 20L20 24L17.5 20L20 16Z"
        stroke="url(#logo-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
