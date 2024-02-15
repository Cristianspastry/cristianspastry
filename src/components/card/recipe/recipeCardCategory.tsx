import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";


type Props = {
  categoryHref: string,
  titleCategory: string,
}

const RecipeCardCategory = ({ categoryHref, titleCategory }: Props) => {
  return (
    <>
      <div>
        <Link href={categoryHref} className=' font-semibold  text-xl hover:scale-105 transition-all ease-linear duration-200'>
          {titleCategory}
        </Link>
      </div>
    </>
  );
}

export default RecipeCardCategory;