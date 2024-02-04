import { siteMetaData } from "@/utils/siteMetaData";
import Link from "next/link";
import SLogo from "../../../../assets/logo/LOGO.svg"
import Image from "next/image";

const Logo = () => {
 return (
   <>
    <div className="flex items-center mb-4">
        <Link  href="/" className="flex items-center">
          <h1 className="sm:mr-3 sm:mb-6 sm:h-12 sm:text-5xl sm:ml-8 sm:p-4 text-3xl font-semibold text-primaryColor m-4 text-left leading-10 tracking-tight">
            {siteMetaData.title?.toString()}
          </h1>
        </Link>
      </div>      
   </>
 );
}

export default Logo;