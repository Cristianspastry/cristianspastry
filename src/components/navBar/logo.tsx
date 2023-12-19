import { siteMetaData } from "@/utils/siteMetaData";
import Link from "next/link";

const Logo = () => {
 return (
   <>
    <Link href="/" className="flex items-center">
      {/*<img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />*/}
      <span className="self-center text-4xl font-semibold whitespace-nowrap mt-2 lg:ml-8">
        {siteMetaData.title?.toString()}
      </span>
  </Link>       
   </>
 );
}

export default Logo;