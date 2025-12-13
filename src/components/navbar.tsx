"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Liens de navigation
const navLinks = [
    { href: "/recherche", label: "Rechercher" },
    { href: "/a-propos", label: "À propos" },
    { href: "/tarifs", label: "Devenir Premium" },
];

/**
 * Navbar responsive "Luxe Éditorial" pour ORÉA
 */
export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Effet de scroll pour densifier la navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fermer le menu mobile au changement de page
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${scrolled
                    ? "bg-white/95 backdrop-blur-md border-border/10 py-2 shadow-sm"
                    : "bg-white/80 backdrop-blur-sm border-transparent py-4"
                }`}
        >
            <nav className="container mx-auto flex items-center justify-between px-4 md:px-8">

                {/* Logo ORÉA - Luxe avec animation */}
                <Link href="/" className="flex items-center group relative z-50">
                    <span className="font-serif text-3xl font-bold tracking-tight bg-gradient-to-r from-anthracite via-anthracite to-gold bg-clip-text text-transparent bg-[length:200%_100%] transition-all duration-700 group-hover:bg-[position:100%_0]">
                        oréa
                    </span>
                </Link>

                {/* Navigation Desktop */}
                <div className="hidden md:flex md:items-center md:gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative text-sm font-medium tracking-wide transition-colors hover:text-black group py-1 ${pathname === link.href ? "text-black" : "text-muted-foreground"
                                }`}
                        >
                            {link.label}
                            <span className={`absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                                }`} />
                        </Link>
                    ))}
                </div>

                {/* Actions Desktop */}
                <div className="hidden md:flex md:items-center md:gap-3">
                    <Button variant="ghost" size="icon" asChild className="hover:bg-gold/10 hover:text-gold transition-colors rounded-full">
                        <Link href="/recherche">
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Rechercher</span>
                        </Link>
                    </Button>

                    <div className="h-4 w-px bg-border/50 mx-1" />

                    <Button variant="ghost" size="sm" asChild className="hover:bg-transparent hover:text-gold transition-colors font-medium text-muted-foreground">
                        <Link href="/connexion">
                            Se connecter
                        </Link>
                    </Button>

                    <Button asChild className="rounded-full bg-anthracite text-white hover:bg-gold hover:text-white transition-all duration-300 px-5 h-10 tracking-wide text-xs font-bold uppercase shadow-lg shadow-black/5 hover:shadow-gold/20">
                        <Link href="/inscription">
                            S'inscrire
                        </Link>
                    </Button>
                </div>

                {/* Menu Mobile Trigger */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon" className="hover:bg-transparent -mr-2">
                            <Menu className="h-6 w-6 text-anthracite" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-full sm:w-[350px] border-l border-border/10 bg-white/98 backdrop-blur-xl p-0">
                        <SheetTitle className="sr-only">Menu de navigation</SheetTitle>

                        <div className="flex flex-col h-full">
                            {/* Header Mobile */}
                            <div className="flex items-center justify-between p-6 border-b border-border/5">
                                <span className="font-serif text-2xl font-bold tracking-tighter text-anthracite">ORÉA</span>
                                <SheetClose asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                                        <X className="h-5 w-5" />
                                    </Button>
                                </SheetClose>
                            </div>

                            {/* Liens Mobile */}
                            <nav className="flex-1 flex flex-col justify-center gap-8 px-8">
                                {navLinks.map((link, index) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-3xl font-serif text-anthracite hover:text-gold transition-colors text-left"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + index * 0.1 }}
                                        >
                                            {link.label}
                                        </motion.div>
                                    </Link>
                                ))}
                            </nav>

                            {/* Actions Mobile Footer */}
                            <div className="p-8 space-y-4 bg-gray-50/50">
                                <Button variant="outline" asChild className="w-full rounded-full border-border h-12 text-base font-medium">
                                    <Link href="/connexion" onClick={() => setIsOpen(false)}>
                                        <User className="mr-2 h-4 w-4" />
                                        Se connecter
                                    </Link>
                                </Button>
                                <Button asChild className="w-full rounded-full bg-gold hover:bg-gold-dark text-white h-12 text-base font-bold shadow-lg shadow-gold/20">
                                    <Link href="/inscription" onClick={() => setIsOpen(false)}>
                                        S'inscrire gratuitement
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}