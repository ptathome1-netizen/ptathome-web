import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function IconPro(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M8 13.5L10.5 16L16 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 7.5H15"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function IconEase(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="4"
        y="6"
        width="16"
        height="12"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <path
        d="M8 11.5C9 12.5 10.3 13 12 13C13.7 13 15 12.5 16 11.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="9" cy="10" r="0.9" fill="currentColor" />
      <circle cx="15" cy="10" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function IconTrust(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 4L6 6.5V11.5C6 15 8.4 18.2 12 19.5C15.6 18.2 18 15 18 11.5V6.5L12 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 11.5L11.2 13.2L14.5 9.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
