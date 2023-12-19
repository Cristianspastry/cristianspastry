"use client"
import { useThemeSwitch } from "../hooks/useThemeSwitch";
import Logo from "./logo";
import SearchBar from "./searchBar";
import NavLinks from "./navLinks";
import MobileNav from "./mobileNav";

type Props = {}

const NavBar = (props: Props) => {

  const [mode, setMode] = useThemeSwitch();
    return (
        <>
            <header className="">

                <div className=" flex flex-wrap items-center justify-between mx-auto p-4">

                    <Logo />

                    <div className="flex md:order-2">

                        <SearchBar />

                    </div>

                     <NavLinks/>

                    <MobileNav />
        </div>
      </header>
    </>
  )
}


export default NavBar

