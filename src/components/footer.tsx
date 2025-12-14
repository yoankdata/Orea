import Link from "next/link";
import { Instagram, MapPin, Mail, Sparkles } from "lucide-react";

// Liens du footer organises par categorie
const footerLinks = {
    navigation: [
        { href: "/recherche", label: "Rechercher un talent" },
        { href: "/a-propos", label: "Notre mission" },
        { href: "/tarifs", label: "Espace Professionnel" },
        { href: "/connexion", label: "Mon compte" },
    ],
    categories: [
        { href: "/recherche?category=coiffure", label: "Coiffure & Tresses" },
        { href: "/recherche?category=makeup", label: "Maquillage" },
        { href: "/recherche?category=ongles", label: "Onglerie" },
        { href: "/recherche?category=soins", label: "Soins Visage & Corps" },
        { href: "/recherche?category=barber", label: "Barber Shop" },
    ],
    legal: [
        { href: "/mentions-legales/cgu", label: "Conditions Generales" },
        { href: "/mentions-legales/confidentialite", label: "Politique de Confidentialite" },
        { href: "/mentions-legales/cookies", label: "Gestion des cookies" },
    ],
};

/**
 * Footer Maison Nubi - Layout corrige
 */
export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-anthracite text-white border-t border-white/5 font-sans">
            {/* Section principale */}
            <div className="container mx-auto px-4 py-16 md:py-20">
                <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Colonne 1 : Marque */}
                    <div className="space-y-5 sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-2 group">
                            <Sparkles className="h-5 w-5 text-gold" />
                            <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-gold transition-colors">
                                Maison Nubi
                            </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
                            La premiere plateforme digitale dediee a l excellence de la beaute en Cote d Ivoire.
                        </p>
                    </div>

                    {/* Colonne 2 : Navigation */}
                    <div className="space-y-5">
                        <h4 className="font-serif text-base text-white">Explorer</h4>
                        <ul className="space-y-2">
                            {footerLinks.navigation.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-gold transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne 3 : Categories */}
                    <div className="space-y-5">
                        <h4 className="font-serif text-base text-white">Services</h4>
                        <ul className="space-y-2">
                            {footerLinks.categories.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-gold transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne 4 : Contact */}
                    <div className="space-y-5">
                        <h4 className="font-serif text-base text-white">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-gray-400">
                                <MapPin className="h-4 w-4 flex-shrink-0 text-gold mt-0.5" />
                                <span>Cocody Riviera 2, Abidjan</span>
                            </li>
                            <li>
                                <a
                                    href="mailto:bonjour@maisonnubi.ci"
                                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors"
                                >
                                    <Mail className="h-4 w-4 flex-shrink-0 text-gold" />
                                    <span>bonjour@maisonnubi.ci</span>
                                </a>
                            </li>
                        </ul>

                        <a
                            href="https://instagram.com/maisonnubi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-9 w-9 rounded-full bg-white/10 items-center justify-center text-gray-400 hover:bg-gold hover:text-white transition-all"
                            aria-label="Instagram"
                        >
                            <Instagram className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/10 bg-black/20">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4">
                    <p className="text-xs text-gray-500">
                        {currentYear} Maison Nubi. Tous droits reserves.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {footerLinks.legal.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-xs text-gray-500 hover:text-gold transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
