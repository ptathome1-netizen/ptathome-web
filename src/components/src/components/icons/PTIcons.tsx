// src/components/icons/PTIcons.tsx
import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number };

export const IconPro: React.FC<Props> = ({ size = 18, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    {...rest}
  >
    <circle cx="12" cy="12" r="10" stroke="#6E5B45" strokeWidth="1.6" />
    <path
      d="M12 6v12M8.2 10.2h7.6M9.4 14h5.2"
      stroke="#6E5B45"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const IconEase: React.FC<Props> = ({ size = 18, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    {...rest}
  >
    <path
      d="M4 16c3-6 6-8 10-8 2.667 0 4.667 1.333 6 4"
      stroke="#6E5B45"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 12l2 4-4-.5"
      stroke="#6E5B45"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconTrust: React.FC<Props> = ({ size = 18, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    {...rest}
  >
    <path
      d="M12 3l7 4v5c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V7l7-4Z"
      stroke="#6E5B45"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M8.8 12.4l2.2 2.2 4.2-4.2"
      stroke="#6E5B45"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
