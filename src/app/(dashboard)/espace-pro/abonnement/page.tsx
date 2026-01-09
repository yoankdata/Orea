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
    Copy,
    Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/lib/database.types";

// Avantages de l'offre NUBI GOLD
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
 * Page de gestion de l'abonnement NUBI GOLD
 */
export default function BillingPage() {
    const [copied, setCopied] = useState(false);

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

    // Copier le numéro
    const handleCopyNumber = () => {
        navigator.clipboard.writeText("07 07 75 62 97");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                    {isPremium ? "Vous êtes membre NUBI GOLD" : "Débloquez tout le potentiel de Maison Nubi"}
                </p>
            </div>

            {/* Carte NUBI GOLD */}
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
                            <CardTitle className="font-serif text-2xl">NUBI GOLD</CardTitle>
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

                    {/* Instructions de paiement ou message actif */}
                    {isPremium ? (
                        <div className="text-center py-4">
                            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-6 py-3 text-green-700 font-medium">
                                <CheckCircle2 className="h-5 w-5" />
                                Abonnement actif
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">
                                Merci de faire partie de la communauté NUBI GOLD !
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Instructions de paiement */}
                            <div className="bg-gold/5 border-2 border-gold/20 rounded-xl p-6 space-y-4">
                                <div className="flex items-center gap-2 text-gold font-semibold">
                                    <Smartphone className="h-5 w-5" />
                                    <span>Comment s'abonner</span>
                                </div>

                                <ol className="space-y-3 text-sm">
                                    <li className="flex gap-3">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-white text-xs font-bold flex-shrink-0">1</span>
                                        <span className="text-anthracite">Envoyez <strong className="font-bold">10 000 FCFA</strong> par <strong>Wave</strong> ou <strong>Orange Money</strong></span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-white text-xs font-bold flex-shrink-0">2</span>
                                        <div className="flex-1">
                                            <span className="text-anthracite block mb-2">Au numéro :</span>
                                            <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-gold/30">
                                                <span className="font-mono text-lg font-bold text-anthracite flex-1">07 07 75 62 97</span>
                                                <Button
                                                    onClick={handleCopyNumber}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 px-3 hover:bg-gold/10"
                                                >
                                                    {copied ? (
                                                        <>
                                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="h-4 w-4" />
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-white text-xs font-bold flex-shrink-0">3</span>
                                        <span className="text-anthracite">Contactez-nous sur WhatsApp au <strong className="font-bold">+225 07 07 75 62 97</strong> avec votre preuve de paiement</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-white text-xs font-bold flex-shrink-0">4</span>
                                        <span className="text-anthracite">Votre compte sera activé <strong className="font-bold">sous 24h</strong> maximum</span>
                                    </li>
                                </ol>
                            </div>

                            <p className="text-center text-xs text-muted-foreground">
                                Abonnement mensuel, renouvelable chaque mois.
                                <br />
                                Contactez-nous pour toute question.
                            </p>
                        </div>
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
                                Profil visible sur Maison Nubi
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
