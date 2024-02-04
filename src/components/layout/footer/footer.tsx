"use client"

import { currentYear } from '@/utils'
import { siteMetaData } from '@/utils/siteMetaData'
import React, { useRef, useState, } from 'react'

// KFOOTER = Footer (flowbite) : va in conflitto con la funzione in locale
import {Footer as KFooter} from 'flowbite-react'
import { navBarLinks } from '@/utils/navBarLinks'
import { useRouter } from 'next/router'

type Props = {}

const Footer = (props: Props) => {
  
 return (
 <>
 <KFooter container className='  max-w-screen-xl text-black rounded-lg shadow m-4 w-full mx-auto p-4 md:flex md:items-center md:justify-between flex items-center justify-center'>
   <KFooter.Copyright href="/" by={` ${siteMetaData.title} ™`} year={currentYear} className=' text-lg'/>
    <KFooter.LinkGroup>
      {
        navBarLinks.map((link) => (
          <KFooter.Link key={link.title} href={link.href} className='text-base mr-4'>
            {link.title}
          </KFooter.Link>
       
        ))
      }
    </KFooter.LinkGroup>
   </KFooter>
 </>
  )
}

export default Footer