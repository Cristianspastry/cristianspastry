import CategorySection from "@/app/categorie/components/CategorySection";
import categoryList from "@/utils/categoryList";

export default async function Category() {

    return (
      <main className='divide-y divide-gray-200 space-y-2 pb-8 pt-6 md:space-y-5 mb-auto items-center self-center'>
        <CategorySection categories={categoryList}/>
      </main>
    )
  }
  