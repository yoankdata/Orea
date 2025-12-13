import Link from "next/link";
import { Instagram, MapPin, Mail, Phone } from "lucide-react";

// Liens du footer organisés par catégorie
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
        { href: "/mentions-legales/cgu", label: "Conditions Générales" },
        { href: "/mentions-legales/confidentialite", label: "Politique de Confidentialité" },
        { href: "/mentions-legales/cookies", label: "Gestion des cookies" },
    ],
};

/**
 * Footer "Luxe Minimaliste" - Version Améliorée (Padding/Marges)
 */
export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-anthracite text-white border-t border-white/5 font-sans">
            {/* Section principale */}
            {/* CHANGEMENT ICI: Augmentation du padding vertical sur desktop (md:py-24) */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid gap-12 lg:grid-cols-12">

                    {/* Colonne 1 : Marque (Large) */}
                    {/* CHANGEMENT ICI: Augmentation légère de l'espacement vertical (space-y-8) */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="inline-block group">
                            <span className="font-serif text-4xl font-bold tracking-tight bg-gradient-to-r from-gold via-white to-gold bg-clip-text text-transparent bg-[length:200%_100%] transition-all duration-1000 group-hover:bg-[position:100%_0]">
                                oréa
                            </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed max-w-sm text-base">
                            La première plateforme digitale dédiée à l'excellence de la beauté en Côte d'Ivoire. Révélez votre éclat.
                        </p>
                    </div>

                    {/* Espacement */}
                    <div className="hidden lg:block lg:col-span-1" />

                    {/* Colonne 2 : Navigation */}
                    {/* CHANGEMENT ICI: space-y-8 pour le titre, space-y-4 pour la liste */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="font-serif text-lg text-white tracking-wide">Explorer</h4>
                        <ul className="space-y-4">
                            {footerLinks.navigation.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-base text-gray-400 transition-all duration-300 hover:text-gold hover:pl-2 block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne 3 : Catégories */}
                    {/* CHANGEMENT ICI: space-y-8 pour le titre, space-y-4 pour la liste */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="font-serif text-lg text-white tracking-wide">Services</h4>
                        <ul className="space-y-4">
                            {footerLinks.categories.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-base text-gray-400 transition-all duration-300 hover:text-gold hover:pl-2 block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne 4 : Contact & Social */}
                    {/* CHANGEMENT ICI: space-y-8 pour le titre, space-y-5 pour la liste (plus d'air pour les icônes) */}
                    <div className="lg:col-span-3 space-y-8">
                        <h4 className="font-serif text-lg text-white tracking-wide">Nous contacter</h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4 text-base text-gray-400 group cursor-pointer leading-relaxed">
                                <MapPin className="h-6 w-6 flex-shrink-0 text-gold/80 group-hover:text-gold transition-colors mt-0.5" />
                                <span>Cocody Riviera 2<br />Abidjan, Côte d'Ivoire</span>
                            </li>
                            <li>
                                <a
                                    href="mailto:bonjour@orea.ci"
                                    className="flex items-center gap-4 text-base text-gray-400 transition-colors hover:text-gold group"
                                >
                                    <Mail className="h-6 w-6 flex-shrink-0 text-gold/80 group-hover:text-gold transition-colors" />
                                    <span>bonjour@orea.ci</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+2250700000000"
                                    className="flex items-center gap-4 text-base text-gray-400 transition-colors hover:text-gold group"
                                >
                                    <Phone className="h-6 w-6 flex-shrink-0 text-gold/80 group-hover:text-gold transition-colors" />
                                    <span>+225 07 00 00 00 00</span>
                                </a>
                            </li>
                        </ul>

                        <div className="pt-6 flex gap-4">
                            <a
                                href="https://instagram.com/orea.ci"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-white transition-all duration-300"
                                aria-label="Suivez-nous sur Instagram"
                            >
                                <Instagram className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barre de copyright */}
            <div className="border-t border-white/10 bg-black/30">
                {/* CHANGEMENT ICI: Réduction légère du padding vertical (py-5 au lieu de py-6) pour plus d'élégance */}
                <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-6 px-4 py-5">
                    <p className="text-sm text-gray-500 tracking-wide">
                        © {currentYear} Blone. Tous droits réservés.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8">
                        {footerLinks.legal.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-gray-500 transition-colors hover:text-gold"
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