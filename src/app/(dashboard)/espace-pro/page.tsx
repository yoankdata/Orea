"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Crown, PartyPopper, Sparkles } from "lucide-react";
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
        <div className="flex items-center justify-center min-h-[60vh]">
            {/* Animation de confettis simple */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
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

            <Card className="max-w-md w-full border-2 border-gold text-center">
                <CardContent className="pt-8 pb-8 space-y-6">
                    {/* Icône */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-600">
                                <Crown className="h-10 w-10 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                                <PartyPopper className="h-4 w-4 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <h1 className="font-serif text-2xl font-bold text-anthracite mb-2">
                            Bienvenue chez ORÉA GOLD ! 🎉
                        </h1>
                        <p className="text-muted-foreground">
                            Merci pour votre confiance. Votre abonnement premium est maintenant actif.
                        </p>
                    </div>

                    {/* Avantages débloqués */}
                    <div className="text-left bg-gold/5 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-medium text-anthracite">
                            ✨ Vos avantages sont débloqués :
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Badge Premium sur votre profil</li>
                            <li>• Priorité dans les résultats de recherche</li>
                            <li>• Photos illimitées dans votre galerie</li>
                            <li>• Profil vérifié</li>
                        </ul>
                    </div>

                    {/* Bouton */}
                    <Button
                        onClick={() => router.push("/espace-pro/profil")}
                        className="w-full rounded-full bg-gold hover:bg-gold-dark text-white"
                    >
                        Accéder à mon profil
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
