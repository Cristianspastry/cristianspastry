"use client";

import Form from 'next/form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Recipe from '@/models/recipe';

type SearchBarProps = {
    ricette: Recipe[];
};

export default function SearchBar({ ricette }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Recipe[]>([]);
    const router = useRouter();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value) {
            const filteredSuggestions = ricette.filter(recipe =>
                recipe.slug.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSubmit = () => {
        // Verifica se la query è vuota
        if (!query) {
            return;
        }
        
        // Reindirizza alla pagina di ricerca e nascondi i suggerimenti
        router.push(`/search?query=${encodeURIComponent(query)}`);
        
        setSuggestions([]); // Nascondi i suggerimenti

        // Resetta la barra di ricerca
        setQuery('');
    };

    return (
        <div className="relative">
            <Form action={handleSubmit} className="flex items-center bg-white rounded-full shadow-md hover:shadow-lg transition duration-200 focus-within:border-blue-500 w-full max-w-md mx-auto">
                <input
                    type="text"
                    name="query"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Cerca... in un mondo di ricette"
                    className="bg-transparent py-2 px-4 text-sm text-gray-700 placeholder-gray-500 rounded-full focus:outline-none w-full"
                />
                <button type="submit" className="text-gray-500 pr-4 hover:text-gray-600 transition duration-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0010.65 10.65z" />
                    </svg>
                </button>
            </Form>

            {suggestions.length > 0 && (
                <div className="absolute z-10 bg-white shadow-lg rounded-md mt-1 w-full text-bluModerato border border-gray-200">
                    {suggestions.map((recipe) => (
                        <Link href={`/recipe/${recipe.slug}`} key={recipe.id}>
                            <div className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-none">
                                {recipe.title}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}


/*
{suggestions.length > 0 && (
                <div className="absolute z-10 bg-white shadow-lg rounded-md mt-1 w-full text-bluModerato">
                    {suggestions.map((recipe) => (
                        <div key={recipe.id} className=" p-2 hover:bg-gray-100 cursor-pointer">
                            <Link href={`/recipe/${recipe.id}`} className="">{recipe.title}</Link>
                        </div>
                    ))}
                </div>
            )}
*
/*
<Form action={handleSubmit} className="flex items-center bg-white rounded-full shadow-md hover:shadow-lg transition duration-200 focus-within:border-blue-500 w-full max-w-md mx-auto">
            <input
                type="text"
                name="query"
                value={query}
                onChange={handleSearch}
                placeholder="Cerca... in un mondo di ricette"
                className="bg-transparent py-2 px-4 text-sm text-gray-700 placeholder-gray-500 rounded-full focus:outline-none w-full"
            />
            <button type="submit" className="text-gray-500 pr-4 hover:text-gray-600 transition duration-200">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0010.65 10.65z" />
                </svg>
            </button>
        </Form>*/