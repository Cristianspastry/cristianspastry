


import { Constants } from '@/utils/constants';
import React from 'react'

const HeroSection = () => {
    return (
        <>
            <section className="relative bg-bluModerato text-white py-20 px-6 rounded-lg ">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Benvenuto su {Constants.APP_NAME}
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 mb-8">
                        Scopri le migliori ricette di pasticceria create con passione
                    </p>
                    <button className="bg-white text-bluModerato px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                        Esplora le Ricette
                    </button>
                </div>
            </section>
        </>
    )
}

export default HeroSection;