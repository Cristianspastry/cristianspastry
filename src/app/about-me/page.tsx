"use client"
import { ReactNode } from "react";
import Image from "next/image";
import SocialIcon from "@/components/SocialIcons/SocialIcons";
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Importa le icone social
import { siteMetaData } from "@/utils/siteMetaData";
import avatar from "../../../assets/img/avatar.png";
import {onErrorImg, onLoadImg } from "@/utils/onImage";

function AboutMe() {
  const img = "https://media.istockphoto.com/id/480379752/it/foto/cook-decorare-un-piatto.jpg?s=1024x1024&w=is&k=20&c=EfxCFR_rrbe9gwtWdFHvAX4rYyKmgeUSngCgfqaOPoo=";
  
  return (
    <>
      <main className='{divide-y divide-gray-200 space-y-2 pb-8 pt-6 md:space-y-5 mb-auto items-center self-center} items-center self-center'>
      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-md ">
          {/* Immagine della persona */}
          <Image
            src={avatar} // Sostituire con l'URL dell'immagine della persona
            alt="Avatar"
            className="rounded-xl mx-auto mb-4"
            width={500}
            height={500}
            priority
            onErrorCapture={onErrorImg}
            onLoad={onLoadImg}
          />

          {/* Icône Social */}
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-blue-500 hover:text-blue-700 w-6 h-6" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-blue-500 hover:text-blue-700 w-6 h-6" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-pink-500 hover:text-pink-700 w-6 h-6" />
            </a>
          </div>

          {/* Descrizione della persona */}
          <p className="text-gray-700 mb-4 text-xl">
            Ciao, sono {siteMetaData.author}! Sono appassionato di cucina in particolare la pasticceria. Seguimi sui social per rimanere aggiornato/a sulle mie ultime ricette!
          </p>

          {/* Altre informazioni della persona */}
          <p className="text-gray-700 text-2xl">
            Contattami per ulteriori informazioni o collaborazioni.
          </p>
        </div>
      </div>
        
      </main>
    </>
  )
}

export default AboutMe;