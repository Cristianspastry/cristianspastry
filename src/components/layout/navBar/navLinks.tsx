import { cx } from '@/utils'
import { navBarLinks } from '@/utils/navBarLinks'
import Link from 'next/link'
import React from 'react'
import { useThemeSwitch } from '../../hooks/useThemeSwitch'
import { Avatar } from 'flowbite-react';
import { usePathname } from 'next/navigation'

type Props = {}

export default function NavLinks({ }: Props) {
  const [mode, setMode] = useThemeSwitch();
  const pathName = usePathname();
  return (
    <nav className="hidden sm:flex items-center py-2 px-8 border border-solid border-dark rounded-full mt-4">
      {navBarLinks.map((link) => (
        <>
        <Link
          key={link.title}
          href={link.href}
          className={` text-zinc-400 ${pathName === link.href ? 'text-zinc-900' : ''} mx-4 text-xl transition `}
        >
          {link.title}
        </Link>
         </>
      ))}
    </nav>
  )
}