
"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
const NonFound = () => {
  const useGoBack = () => {
    const router = useRouter();
    return () => router.back();
  }
  return (
    <>
        <h1 className="text-4xl font-bold mb-6 text-center">Pagina non trovata</h1>
        <p className="text-lg text-gray-600 text-center">La pagina che stai cercando non esiste</p>
        <button 
        className="bg-white text-bluModerato px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all" 
        onClick={useGoBack()}
        >Torna alla Home</button>
    </>
  )
}

export default NonFound