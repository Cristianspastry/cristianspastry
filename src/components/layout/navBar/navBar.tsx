"use client"
import { useThemeSwitch } from "../../hooks/useThemeSwitch";
//import Logo from "./logo";
import SearchBar from "./searchBar";
import NavLinks from "./navLinks";
import MobileNav from "./mobileNav";
import Link from "next/link";
import { siteMetaData } from "@/utils/siteMetaData";
import { navBarLinks } from '@/utils/navBarLinks'
import Logo from "./logo";
type Props = {}

const NavBar = (props: Props) => {

  const [mode, setMode] = useThemeSwitch();
  return (
    <header className="sm:flex-col sm:items-center flex items-start justify-between">
      <Logo />
      <NavLinks />
      <MobileNav />
    </header>
  )
}

export default NavBar

