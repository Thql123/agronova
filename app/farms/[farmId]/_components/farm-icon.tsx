import type { SVGProps } from "react";

const paths = {
  dashboard: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  production: "m12 3 10 5-10 5L2 8z M2 12l10 5 10-5 M2 16l10 5 10-5",
  inventory: "M5 21 19 3 M8 17C2 17 3 11 8 12 M11 13C5 12 6 6 11 8 M14 9C9 7 11 2 15 4 M9 16c6 2 9-3 5-5 M13 12c6 2 9-3 5-5",
  finances: "M5 4h15v16H5z M5 8H2v12h14 M13 10h7v6h-7z M16 13h1",
  analytics: "m4 20 16-16 M7 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6 M17 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  meeting: "M4 5h16v16H4z M4 10h16 M8 2v6 M16 2v6 M8 14h3v3H8z",
  team: "M15 21H2v-3c0-4 13-4 13 0z M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M17 4c4 0 4 7 0 7 M18 14c3 0 4 2 4 5",
  ai: "m9 3-1 3-3 1-2 3 2 2-1 3 3 2 2-1 3 2 3-2 1-3 3-1 2-3-2-2 1-3-3-2-2 1z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  marketplace: "M4 10v11h16V10 M3 10l2-7h14l2 7 M3 10c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 M9 21v-7h6v7 M8 3l-1 7 M16 3l1 7",
  search: "M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14 M15 15l6 6",
  bell: "M5 17h14l-2-3V9a5 5 0 0 0-10 0v5z M10 21h4 M12 2v2",
  logout: "M9 4H3v16h6 M8 12h13 M16 7l5 5-5 5",
  trend: "m3 17 6-6 4 3 8-9 M16 5h5v5",
  expand: "M14 3h7v7 M10 21H3v-7",
} as const;

export type FarmIconName = keyof typeof paths;

export function FarmIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: FarmIconName }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d={paths[name]} />
    </svg>
  );
}
