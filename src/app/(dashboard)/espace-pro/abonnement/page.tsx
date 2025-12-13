"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
    Crown,
    Check,
    Loader2,
    AlertCircle,
    Sparkles,
    Star,
    Eye,
    BadgeCheck,
    Zap,
    CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/lib/database.types";

// Avantages de l'offre Oréa Gold
const GOLD_FEATURES = [
    {
        icon: Crown,
        title: "Badge Premium",
        description: "Affichez fièrement votre statut Gold",
    },
    {
        icon: Star,
        title: "En tête de liste",
        description: "Apparaissez avant les autres prestataires",
    },
    {
        icon: Eye,
        title: "Visibilité maximale",
        description: "Votre profil est mis en avant",
    },
    {
        icon: BadgeCheck,
        title: "Profil vérifié",
        description: "Gagnez la confiance des clients",
    },
    {
        icon: Zap,
        title: "Photos illimitées",
        description: "Montrez tout votre talent",
    },
];

/**
 * Page de gestion de l'abonnement Oréa Gold
 */
export default function BillingPage() {
    const searchParams = useSearchParams();
    const canceled = searchParams.get("canceled") === "true";

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Récupérer le statut premium
    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ["profile-premium"],
        queryFn: async () => {
            if (!supabase) throw new Error("Supabase non configuré");

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Non connecté");

            const { data, error } = await supabase
                .from("profiles")
                .select("is_premium")
                .eq("id", user.id)
                .single();

            if (error) throw error;
            return data as unknown as Pick<Profile, "is_premium">;
        },
    });

    const isPremium = profile?.is_premium || false;

    // Rediriger vers Stripe Checkout
    const handleSubscribe = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de la création du paiement");
            }

            // Rediriger vers Stripe Checkout
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            console.error("Erreur:", err);
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
            setIsLoading(false);
        }
    };

    if (isLoadingProfile) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl">
            {/* En-tête */}
            <div>
                <h1 className="font-serif text-2xl font-bold text-anthracite">
                    Mon Abonnement
                </h1>
                <p className="text-muted-foreground">
                    {isPremium ? "Vous êtes membre ORÉA GOLD" : "Débloquez tout le potentiel d'ORÉA"}
                </p>
            </div>

            {/* Message annulé */}
            {canceled && (
                <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-4 text-sm text-amber-700">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    Paiement annulé. Vous pouvez réessayer quand vous le souhaitez.
                </div>
            )}

            {/* Erreur */}
            {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                </div>
            )}

            {/* Carte Oréa Gold */}
            <Card className={`relative overflow-hidden border-2 ${isPremium ? 'border-green-500 bg-green-50/30' : 'border-gold'}`}>
                {/* Badge */}
                <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white ${isPremium ? 'bg-green-500' : 'bg-gold'}`}>
                        {isPremium ? (
                            <>
                                <CheckCircle2 className="h-3 w-3" />
                                Actif
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-3 w-3" />
                                Populaire
                            </>
                        )}
                    </span>
                </div>

                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isPremium ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-gold to-amber-600'}`}>
                            <Crown className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="font-serif text-2xl">ORÉA GOLD</CardTitle>
                            <CardDescription>
                                {isPremium ? "Votre abonnement premium est actif" : "L'offre premium pour les pros"}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Prix */}
                    <div className="flex items-baseline gap-1">
                        <span className="font-serif text-4xl font-bold text-anthracite">
                            10 000
                        </span>
                        <span className="text-lg text-muted-foreground">FCFA/mois</span>
                    </div>

                    {/* Liste des avantages */}
                    <ul className="space-y-3">
                        {GOLD_FEATURES.map((feature) => (
                            <li key={feature.title} className="flex items-start gap-3">
                                <div className={`flex h-6 w-6 items-center justify-center rounded-full ${isPremium ? 'bg-green-100' : 'bg-gold/10'}`}>
                                    <Check className={`h-4 w-4 ${isPremium ? 'text-green-600' : 'text-gold'}`} />
                                </div>
                                <div>
                                    <p className="font-medium text-anthracite">{feature.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Bouton */}
                    {isPremium ? (
                        <div className="text-center py-4">
                            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-6 py-3 text-green-700 font-medium">
                                <CheckCircle2 className="h-5 w-5" />
                                Abonnement actif
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">
                                Merci de faire partie de la communauté ORÉA GOLD !
                            </p>
                        </div>
                    ) : (
                        <>
                            <Button
                                onClick={handleSubscribe}
                                disabled={isLoading}
                                size="lg"
                                className="w-full rounded-full bg-gradient-to-r from-gold to-amber-600 hover:from-gold-dark hover:to-amber-700 text-white text-lg py-6"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Redirection...
                                    </>
                                ) : (
                                    <>
                                        <Crown className="mr-2 h-5 w-5" />
                                        S&apos;abonner pour 10 000 FCFA/mois
                                    </>
                                )}
                            </Button>

                            <p className="text-center text-xs text-muted-foreground">
                                Facturation mensuelle. Annulez à tout moment.
                                <br />
                                Paiement sécurisé par Stripe.
                            </p>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Offre gratuite - afficher seulement si pas premium */}
            {!isPremium && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Offre Gratuite</CardTitle>
                        <CardDescription>Votre plan actuel</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                Profil visible sur ORÉA
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                Jusqu&apos;à 3 photos dans votre galerie
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                Services illimités
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
