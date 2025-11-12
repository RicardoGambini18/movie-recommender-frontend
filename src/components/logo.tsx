import { useId } from 'react'

interface LogoProps {
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  const id = useId()
  const bgGradientId = `algolab-bg-${id}`

  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Algolab Logo"
    >
      <defs>
        <linearGradient id={bgGradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#020617" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="0"
        width="512"
        height="512"
        fill={`url(#${bgGradientId})`}
        rx="56"
      />
      <g transform="translate(256 256)">
        <polygon
          points="0,-200 174,-100 174,100 0,200 -174,100 -174,-100"
          fill="none"
          stroke="#F5C518"
          strokeWidth="14"
          strokeLinejoin="round"
        />
      </g>
      <g
        transform="translate(256 256)"
        stroke="#f9fafb"
        strokeWidth="7"
        strokeLinecap="round"
      >
        <line x1="-60" y1="-15" x2="0" y2="-75" />
        <line x1="0" y1="-75" x2="60" y2="-15" />
        <line x1="-60" y1="-15" x2="-15" y2="60" />
        <line x1="60" y1="-15" x2="15" y2="60" />
        <line x1="-15" y1="60" x2="15" y2="60" />
        <circle cx="0" cy="-75" r="12" fill="#F5C518" />
        <circle cx="-60" cy="-15" r="12" fill="#fde68a" />
        <circle cx="60" cy="-15" r="12" fill="#fde68a" />
        <circle cx="-15" cy="60" r="12" fill="#F5C518" />
        <circle cx="15" cy="60" r="12" fill="#FBBF24" />
      </g>
    </svg>
  )
}
