"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Crown, PartyPopper, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Page par défaut /account
 * Affiche un message de succès après paiement Stripe
 * Sinon redirige vers le profil
 */
export default function AccountPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const success = searchParams.get("success") === "true";
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (success) {
            setShowConfetti(true);
            // Cacher les confettis après 5 secondes
            const timer = setTimeout(() => setShowConfetti(false), 5000);
            return () => clearTimeout(timer);
        } else {
            // Rediriger vers le profil si pas de success
            router.replace("/espace-pro/profil");
        }
    }, [success, router]);

    // Si pas de success, afficher rien (on redirige)
    if (!success) {
        return null;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50/50 px-4">

            {/* Animation de confettis simple */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-bounce"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-20px`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2 + Math.random() * 3}s`,
                            }}
                        >
                            <Sparkles
                                className="h-4 w-4"
                                style={{
                                    color: ['#D4AF37', '#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4'][
                                        Math.floor(Math.random() * 5)
                                    ],
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className="w-full max-w-md animate-in slide-in-from-bottom-8 fade-in duration-700">
                <Card className="border-0 shadow-2xl shadow-gold/10 overflow-hidden relative">
                    {/* Bandeau décoratif */}
                    <div className="h-2 bg-gradient-to-r from-gold via-yellow-400 to-gold w-full absolute top-0 left-0" />

                    <CardContent className="pt-12 pb-10 px-8 text-center space-y-8">

                        {/* Icône et Badge */}
                        <div className="flex justify-center relative">
                            <div className="relative">
                                {/* Halo lumineux derrière */}
                                <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full scale-150 animate-pulse" />

                                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-500 shadow-lg border-4 border-white">
                                    <Crown className="h-12 w-12 text-white" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100">
                                    <PartyPopper className="h-5 w-5 text-gold" />
                                </div>
                            </div>
                        </div>

                        {/* Message Principal */}
                        <div className="space-y-3">
                            <h1 className="font-serif text-3xl font-bold text-anthracite">
                                Félicitations !
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Bienvenue dans le club <span className="font-bold text-gold">NUBI GOLD</span>.
                            </p>
                        </div>

                        {/* Carte Avantages */}
                        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-6 text-left shadow-inner">
                            <p className="text-sm font-semibold text-anthracite mb-4 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-gold" />
                                Vos nouveaux pouvoirs :
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Badge Vérifié & Premium visible",
                                    "Priorité Top 3 dans les recherches",
                                    "Galerie photo illimitée",
                                    "Statistiques de vues détaillées"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="pt-2">
                            <Button
                                onClick={() => router.push("/espace-pro/profil")}
                                className="w-full h-12 rounded-full bg-anthracite hover:bg-gold hover:text-white text-white font-bold transition-all duration-300 shadow-lg shadow-anthracite/20 hover:shadow-gold/30"
                            >
                                Configurer mon profil Gold
                            </Button>
                            <p className="mt-4 text-xs text-muted-foreground">
                                Un email de confirmation vous a été envoyé.
                            </p>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
