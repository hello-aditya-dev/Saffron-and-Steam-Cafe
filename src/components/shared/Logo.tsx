export function LogoMark({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const fill = dark ? "#FBF7EF" : "#2A1E18";
  const accent = dark ? "#E9A23B" : "#D65A31";
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Saffron & Steam"
      role="img"
    >
      {/* Steam lines */}
      <path
        d="M142 14C142 14 146 8 146 14C146 20 150 14 150 14"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M136 18C136 18 140 12 140 18C140 24 144 18 144 18"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Cup body */}
      <path
        d="M128 22H158C158 22 160 22 160 24V42C160 48 155 52 149 52H137C131 52 128 48 128 42V24C128 22 128 22 128 22Z"
        fill="none"
        stroke={fill}
        strokeWidth="2"
      />
      {/* Handle */}
      <path
        d="M160 28C164 28 168 30 168 35C168 40 164 42 160 42"
        fill="none"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Saffron dots */}
      <circle cx="140" cy="36" r="2" fill={accent} opacity="0.8" />
      <circle cx="146" cy="40" r="2" fill={accent} opacity="0.6" />
      <circle cx="152" cy="36" r="2" fill={accent} opacity="0.8" />
      {/* Wordmark */}
      <text
        x="4"
        y="32"
        fontFamily="Georgia, serif"
        fontSize="18"
        fontWeight="700"
        fill={fill}
        letterSpacing="0.02em"
      >
        Saffron
      </text>
      <text
        x="4"
        y="50"
        fontFamily="Georgia, serif"
        fontSize="18"
        fontWeight="700"
        fill={fill}
        letterSpacing="0.02em"
      >
        <tspan fill={accent} fontSize="14">&amp; </tspan>
        Steam
      </text>
    </svg>
  );
}

export function LogoWordmark({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const fill = dark ? "#FBF7EF" : "#2A1E18";
  const accent = dark ? "#E9A23B" : "#D65A31";
  return (
    <svg
      viewBox="0 0 320 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Saffron & Steam — Coffee · Brunch · Evenings"
      role="img"
    >
      <text x="0" y="24" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" fill={fill} letterSpacing="0.03em">
        Saffron
      </text>
      <text x="120" y="24" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" fill={fill} letterSpacing="0.03em">
        <tspan fill={accent} fontSize="16">&amp; </tspan>Steam
      </text>
    </svg>
  );
}

export function FaviconIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#2A1E18" />
      <path
        d="M10 20H22C22 20 23 20 23 21V24C23 27 21 28 19 28H13C11 28 10 27 10 24V21C10 20 10 20 10 20Z"
        fill="#F3EBDD"
        stroke="#F3EBDD"
        strokeWidth="1"
      />
      <path d="M22 22C23 22 25 23 25 25C25 27 23 28 22 28" stroke="#F3EBDD" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="15" cy="24" r="1" fill="#D65A31" />
      <circle cx="18" cy="25.5" r="1" fill="#E9A23B" />
      <circle cx="21" cy="24" r="1" fill="#D65A31" />
      <path d="M14 18C14 18 16 14 16 18C16 22 18 18 18 18" stroke="#F3EBDD" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}