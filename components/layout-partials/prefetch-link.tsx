'use client'

import Link from 'next/link'
import { useState } from 'react'

type PrefetchLinkProps = {
  href: string
  className?: string
  children: React.ReactNode
  onHoverStart?: () => void
  onHoverEnd?: () => void
}

export default function PrefetchLink({
  href,
  className = '',
  children,
  onHoverStart,
  onHoverEnd,
}: PrefetchLinkProps) {
  const [active, setActive] = useState(false)

  return (
    <Link
      href={href}
      prefetch={active ? null : false}
      onMouseEnter={() => {
        setActive(true)
        onHoverStart?.()
      }}
      onMouseLeave={() => {
        onHoverEnd?.()
      }}
      className={className}
    >
      {children}
    </Link>
  )
}
