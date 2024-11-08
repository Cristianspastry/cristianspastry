import Link from 'next/link';
import { Constants } from '@/utils/constants';

export default function Footer() {
    return (
        <footer className="bg-bluModerato text-white py-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Copyright & Links */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold mb-4">
                            {Constants.APP_NAME}
                        </h2>
                        <p className="text-sm opacity-80 mb-4">
                            &copy; {new Date().getFullYear()} Tutti i diritti riservati.
                        </p>
                        <ul className="flex justify-center md:justify-start space-x-4">
                            {Constants.footerLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.link}
                                        className="text-sm hover:underline"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Seguici</h2>
                        <ul className="flex justify-center space-x-4">
                            {Constants.socialLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.name}
                                        className="text-white hover:text-grigioChiaro transition-colors"
                                    >
                                        {link.icon}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contatti */}
                    <div className="text-center md:text-right">
                        <h2 className="text-2xl font-bold mb-4">Contatti</h2>
                        <p className="text-sm opacity-80 mb-2">
                            Email:{' '}
                            <Link
                                href="mailto:info@cristianspastry.com"
                                className="text-white hover:underline"
                            >
                                info@cristianspastry.com
                            </Link>
                        </p>
                        <p className="text-sm opacity-80">
                            Tel: <a href="tel:+39123456789" className="text-white hover:underline">+39 123 456 789</a>
                        </p>
                    </div>
                </div>

                {/* Divisore */}
                <div className="border-t border-gray-500 pt-6 text-center text-sm opacity-80">
                    {"Realizzato con ❤️ da Cristian's Pastry"}
                </div>
            </div>
        </footer>
    );
}