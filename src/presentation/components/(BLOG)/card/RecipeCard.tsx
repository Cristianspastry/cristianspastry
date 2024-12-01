
"use client";

// RecipeCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Clock, DollarSign,} from 'lucide-react';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
//import ImgTrial from '../../../assets/img/torta.png';

type RecipeCardProps = {
    slug : string;
    title: string;
    description: string;
    imageUrl: string;
    prepTime: { prepTime: string; prepTimeUnit: string };
    difficulty: string;
    cost: string;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
    slug,
    title,
    description,
    imageUrl,
    prepTime,
    difficulty,
    cost
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [sanitizedContent, setSanitizedContent] = useState('');
    const [isClient, setIsClient] = useState(false);


    useEffect(() => {
        setIsClient(true);
        if (description) {
            setSanitizedContent(DOMPurify.sanitize(description));
        }
    }, [description]);

    // Show a loading state or fallback during SSR
    if (!isClient) {
        return <div>Loading...</div>;
    }

    
      

    return (
        <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image Container */}
            <div className="relative h-48 w-full">
                <Image
                    src={imageUrl}
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

                <div className="text-gray-600 mb-4 text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
                >

                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-yellow-400" />
                        <span>{cost}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{prepTime.prepTime}{' '}{prepTime.prepTimeUnit}</span>
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