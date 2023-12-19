
import { ReactNode } from 'react';
import { FaClock, FaRegSmile, FaUtensils } from 'react-icons/fa';

type Props = {
    description : ReactNode;
}

const recipeCardDescription = ({description}: Props) => {
    return (
        <>
            <p className="text-gray-700 line-clamp-4 ">
                {description}
            </p>
        </>
    )
};

export default recipeCardDescription;