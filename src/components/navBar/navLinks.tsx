import { cx } from '@/utils'
import { navBarLinks } from '@/utils/navBarLinks'
import Link from 'next/link'
import React from 'react'
import { useThemeSwitch } from '../hooks/useThemeSwitch'

type Props = {}

export default function NavLinks({}: Props) {
  const [mode, setMode] = useThemeSwitch();  
 return (
  
  <nav className=" mt-1 w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize  items-center hidden sm:flex
    fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50">
      {navBarLinks.map((link) => 
         <Link key={link.title} href={link.href} className=" mr-4 text-lg">
          {link.title}
         </Link>)
      }
  </nav>
  )
}