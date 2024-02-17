import CategoryModel from "@/model/category"


const CategoryCardTitle = ({titleCategory}: {titleCategory: CategoryModel["titleCategory"]}) => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 className="text-4xl font-extrabold text-white">{titleCategory}</h2> 
      </div>
    )
}

export default CategoryCardTitle;