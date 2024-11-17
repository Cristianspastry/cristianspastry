"use client";

import { ReactNode, useState } from "react";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-blue-50 rounded-xl p-6">
      <button 
        onClick={toggleAccordion} 
        className="flex justify-between items-center w-full text-left"
      >
        <h2 className="text-2xl font-semibold text-sky-800">{title}</h2>
        <span 
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          {/* SVG Arrow Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="2" 
            stroke="currentColor" 
            className="w-6 h-6 text-sky-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="space-y-4 mt-4">
          {children}
        </div>
      )}
    </div>
  );
}


