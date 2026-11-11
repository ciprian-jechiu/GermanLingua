import type { SVGProps } from "react";

const paths = {
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  mail: "M3 6h18v12H3z M3 7l9 6 9-6",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 7v5l3 2",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  arrowLeft: "M19 12H5 M11 6l-6 6 6 6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  chevron: "M6 9l6 6 6-6",
  menu: "M4 7h16 M4 12h16 M4 17h16",
  close: "M6 6l12 12 M18 6L6 18",
  gift: "M4 11h16v9H4z M3 7h18v4H3z M12 7v13 M12 7c-1.5-3.5-6-3-5 0 M12 7c1.5-3.5 6-3 5 0",
  cap: "M2 9l10-5 10 5-10 5L2 9Z M6 11.5V16c2 2.5 10 2.5 12 0v-4.5 M22 9v6",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z M4 19a2 2 0 0 1 2-2h13 M9 7h6",
  award: "M12 14a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z M8.5 13 7 21l5-2.5 5 2.5-1.5-8",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M2.5 20c.5-4 3-6 6.5-6s6 2 6.5 6 M16 4.3a3.5 3.5 0 0 1 0 6.4 M18 14.3c2 .8 3.2 2.700 3.500 5.700",
  calendar: "M4 6h16v15H4z M4 10h16 M8 3v5 M16 3v5",
  ear: "M7 10a5 5 0 1 1 10 0c0 3-3 3.500-3 6.500a3 3 0 0 1-6 0 M10 10a2 2 0 1 1 4 0",
  eye: "M2 12s3.500-7 10-7 10 7 10 7-3.500 7-10 7S2 12 2 12Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  repeat: "M4 11V9a3 3 0 0 1 3-3h12 M16 3l3 3-3 3 M20 13v2a3 3 0 0 1-3 3H5 M8 21l-3-3 3-3",
  chat: "M4 5h16v11H9l-5 4V5Z M8 9h8 M8 12h5",
  laptop: "M5 5h14v10H5z M2 19h20 M2 19l3-4 M22 19l-3-4",
  building: "M5 21V4h9v17 M14 9h5v12 M3 21h18 M8 8h3 M8 12h3 M8 16h3",
  quote: "M5 17c2 0 4-1.500 4-5V7H4v5h3 M14 17c2 0 4-1.500 4-5V7h-5v5h3",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M12 12h.01",
  spark: "M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800L12 3Z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, ...props }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}

export function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.500 21v-7.500h2.500l.400-3h-2.900V8.600c0-.900.300-1.500 1.600-1.500h1.500V4.400C16.300 4.300 15.400 4.200 14.400 4.200c-2.200 0-3.700 1.300-3.700 3.800v2.500H8.200v3h2.500V21h2.800Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3.500" y="3.500" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.200" cy="6.800" r="0.900" fill="currentColor" stroke="none" />
    </svg>
  );
}
