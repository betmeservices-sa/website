// Set de iconos de línea (24x24, currentColor). Sin librerías externas.
import type { SVGProps } from 'react'

const paths: Record<string, React.ReactNode> = {
  phone: <path d="M6.6 3.5 4.2 4.6C3 5.2 2.4 6.6 2.9 7.9c1.9 5.4 6.1 9.6 11.5 11.5 1.3.5 2.7-.1 3.3-1.3l1.1-2.4c.3-.7.1-1.5-.5-1.9l-2.8-1.9c-.6-.4-1.3-.3-1.8.2l-.9.9a12 12 0 0 1-4.3-4.3l.9-.9c.5-.5.6-1.2.2-1.8L7.9 3.2c-.4-.6-1.2-.8-1.9-.5Z" />,
  whatsapp: <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.3A9 9 0 1 0 12 3Zm-2.6 5c.2 0 .4 0 .6.5l.7 1.7c.1.2.1.4 0 .6l-.5.8c-.1.2-.2.4 0 .7a7 7 0 0 0 3 3c.3.2.5.1.7 0l.7-.7c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.5.1.8-.4 1.6-1.2 1.8-1 .3-2.2.1-4.1-1a10 10 0 0 1-3.6-3.6c-1-1.7-1.2-3-.9-4 .2-.7.9-1.3 1.7-1.2Z" />,
  calendar: <><rect x="3.5" y="4.5" width="17" height="16" rx="2.5" /><path d="M3.5 9h17M8 3v3M16 3v3M8 13h3M8 17h6" /></>,
  filter: <path d="M3.5 5h17l-6.5 8v5l-4 2v-7L3.5 5Z" />,
  plug: <><path d="M9 3v5M15 3v5M6 8h12v2a6 6 0 0 1-12 0V8ZM12 16v5" /></>,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.3 3.8 5.4 3.8 8.5S14.5 18.2 12 20.5C9.5 18.2 8.2 15.1 8.2 12S9.5 5.8 12 3.5Z" /></>,
  tooth: <path d="M12 4c-2 0-2.5 1-4 1S5 4 4.5 6.5C4 9 5 12 5.5 15c.4 2.3.8 5 2 5s1.2-3 1.8-4.5c.3-.8.6-1 2.2-1s1.9.2 2.2 1c.6 1.5.6 4.5 1.8 4.5s1.6-2.7 2-5c.5-3 1.5-6 1-8.5C18 4 16.5 5 15 5s-1-1-3-1Z" />,
  car: <><path d="M4 12l1.5-4.5A2 2 0 0 1 7.4 6h9.2a2 2 0 0 1 1.9 1.5L20 12v5.5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V17H7v.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V12Z" /><path d="M4 12h16M7.5 14.5h.01M16.5 14.5h.01" /></>,
  home: <path d="M4 11 12 4l8 7M6 10v9h12v-9M10 19v-5h4v5" />,
  cart: <><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2l2 12h11l2-8H6.5" /></>,
  fork: <path d="M7 3v7a2 2 0 0 0 2 2v9M11 3v6M5 3v6M9 3v6M17 3c-1.5 0-2.5 2-2.5 5S16 12 17 12v9" />,
  briefcase: <><rect x="3.5" y="7.5" width="17" height="12" rx="2" /><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3.5 12.5h17" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12.5 10 17 19 7" />,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />,
  bolt: <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></>,
  chevron: <path d="M6 9l6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  bot: <><rect x="4.5" y="8" width="15" height="11" rx="3" /><path d="M12 8V5M9.5 13.2h.01M14.5 13.2h.01M9.5 16h5" /><circle cx="12" cy="4" r="1" /></>,
  user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.9-3.4 3.6-5.4 7-5.4s6.1 2 7 5.4" /></>,
}

export default function Icon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] ?? null}
    </svg>
  )
}
