import CategoryModel from "./category";

interface RecipeModel {
    imageUrl: any;
    title: string;
    href: string;
    titleCategory: CategoryModel["titleCategory"];
    preparationTime : string;
    difficulty : string;
    description : string
}

export default RecipeModel;