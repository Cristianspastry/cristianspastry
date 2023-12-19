import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";


type Props = {
  href: string,
  titleCategory: string,
}

const RecipeCardCategory = ({ href, titleCategory }: Props) => {
  return (
    <>
      <div>
        <Link href={href} className=' font-semibold  text-xl hover:scale-105 transition-all ease-linear duration-200'>
          {titleCategory}
        </Link>
      </div>
    </>
  );
}

export default RecipeCardCategory;