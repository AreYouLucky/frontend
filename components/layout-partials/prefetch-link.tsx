'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()
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
      className={ className + ' ' + ( pathname === href ? 'text-[#00aeef]' : ' text-white')}
    >
      {children}
    </Link>
  )
}
