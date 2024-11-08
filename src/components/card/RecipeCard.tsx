// RecipeCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Star } from 'lucide-react';
import Recipe from '@/models/recipe';
//import ImgTrial from '../../../assets/img/torta.png';

const RecipeCard: React.FC<Recipe> = ({
    id,
    slug,
    title,
    description,
    image,
    prepTime,
    difficulty,
}) => {
    return (
        <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image Container */}
            <div className="relative h-48 w-full">
                <Image
                    src={image}
                    alt={`${title} IMMAGINE NON TROVATA`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                    {title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>4.8</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{prepTime}</span>
                    </div>
                    
                    <span className="text-bluModerato font-medium">
                        {difficulty}
                    </span>
                </div>

                {/* CTA Button */}
                <Link 
                    href={`/recipe/${slug}`}
                    className="block w-full text-center bg-bluModerato text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    Scopri di più
                </Link>
            </div>
        </article>
    );
};

export default RecipeCard;