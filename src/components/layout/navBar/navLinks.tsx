import { cx } from '@/utils'
import { navBarLinks } from '@/utils/navBarLinks'
import Link from 'next/link'
import React from 'react'
import { useThemeSwitch } from '../../hooks/useThemeSwitch'
import { Avatar } from 'flowbite-react';

type Props = {}

export default function NavLinks({ }: Props) {
  const [mode, setMode] = useThemeSwitch();
  return (
    <nav className="hidden sm:flex items-center py-2 px-8 border border-solid border-dark rounded-full mt-4">
      {navBarLinks.map((link) => (
        <>
        <Link
          key={link.title}
          href={link.href}
          className="mx-4 text-xl transition duration-300 hover:text-gray-900 hover:underline text-primaryColor"
        >
          {link.title}
        </Link>
         </>
      ))}
    </nav>
  )
}