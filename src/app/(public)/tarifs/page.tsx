import { Metadata } from "next";
import Link from "next/link";
import { Check, X, Crown, Sparkles, Zap, Star, ShieldCheck, TrendingUp, HelpCircle, Instagram, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: "Tarifs & Offres Premium | Maison Nubi",
    description:
        "Découvrez l'offre NUBI GOLD : boostez votre visibilité, attirez plus de clients et développez votre activité beauté à Abidjan.",
};

// Comparatif des offres
const features = [
    {
        name: "Profil visible sur Maison Nubi",
        free: true,
        premium: true,
        description: "Votre fiche établissement accessible 24/7",
    },
    {
        name: "Bouton WhatsApp direct",
        free: true,
        premium: true,
        description: "Les clients vous contactent sans intermédiaire",
    },
    {
        name: "Affichage des services & tarifs",
        free: true,
        premium: true,
        description: "Présentez votre carte de prestations",
    },
    {
        name: "Photos dans la galerie",
        free: "3 max",
        premium: "Illimité",
        highlight: true,
        description: "Montrez votre talent sous tous les angles",
    },
    {
        name: "Position prioritaire (Top 3)",
        free: false,
        premium: true,
        highlight: true,
        description: "Apparaissez avant vos concurrents",
    },
    {
        name: 'Badge "Premium + Vérifié"',
        free: false,
        premium: true,
        description: "Inspirez une confiance totale aux clients",
    },
    {
        name: "Statistiques avancées",
        free: false,
        premium: true,
        description: "Suivez votre popularité en temps réel",
    },
];

// Avantages Pack Instagram
const instagramFeatures = [
    "Rédaction bio professionnelle optimisée",
    "Hashtags ciblés pour Abidjan",
    "Optimisation de la grille (3 visuels)",
    "Mise en forme contact + WhatsApp",
    "Conseils de publication personnalisés",
    "Livraison sous 24h",
];

/**
 * Page Tarifs - Présentation des offres NUBI GOLD et Pack Instagram
 */
export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background">

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background py-20 md:py-32">
                {/* Background Gradient Luxueux */}
                <div className="absolute inset-0 bg-white" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-60" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-[100%] blur-3xl -z-10" />

                <div className="container relative mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-6 inline-flex animate-pulse-gold items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
                            <Crown className="h-4 w-4" />
                            <span>Offre de lancement</span>
                        </div>

                        <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-anthracite md:text-6xl">
                            Investissez dans votre <br />
                            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
                                réussite
                            </span>
                        </h1>

                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
                            Rejoignez l'élite de la beauté à Abidjan. Passez à NUBI GOLD et multipliez vos demandes de rendez-vous dès aujourd'hui.
                        </p>
                    </div>
                </div>
            </section>

            {/* Cards de pricing - NUBI GOLD */}
            <section className="py-12 md:py-20 relative">
                <div className="container mx-auto px-4">

                    {/* Titre section GOLD */}
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-3xl font-bold text-anthracite mb-4">Abonnement NUBI GOLD</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">Choisissez la formule qui vous convient</p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto items-start">

                        {/* Offre Gratuite */}
                        <Card className="relative border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden rounded-2xl hover:border-gold/20 group">
                            <CardHeader className="pb-8 border-b border-border/50 bg-gray-50/30">
                                <CardTitle className="font-serif text-2xl text-anthracite group-hover:text-gold transition-colors">Starter</CardTitle>
                                <CardDescription className="text-base">
                                    Idéal pour démarrer et tester la plateforme.
                                </CardDescription>
                                <div className="pt-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-anthracite">0</span>
                                    <span className="text-lg font-medium text-muted-foreground">FCFA</span>
                                    <span className="text-sm text-muted-foreground ml-1">/ toujours</span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-8">
                                <ul className="space-y-3">
                                    {features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3 text-sm">
                                            {feature.free ? (
                                                <div className="mt-0.5 rounded-full bg-green-100 p-1">
                                                    <Check className="h-3 w-3 text-green-600" />
                                                </div>
                                            ) : (
                                                <div className="mt-0.5 rounded-full bg-gray-100 p-1">
                                                    <X className="h-3 w-3 text-gray-400" />
                                                </div>
                                            )}
                                            <span className={!feature.free ? "text-muted-foreground line-through" : "text-anthracite"}>
                                                {feature.name}
                                                {typeof feature.free === "string" && (
                                                    <span className="ml-1.5 text-xs text-muted-foreground">({feature.free})</span>
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="pt-4 pb-8">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full h-12 rounded-full border-2 border-gray-200 hover:border-gold hover:text-gold text-base font-bold bg-transparent transition-all"
                                >
                                    <Link href="/inscription">Créer mon profil gratuit</Link>
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Offre GOLD Annuel - PRINCIPALE */}
                        <Card className="relative border-2 border-gold shadow-2xl shadow-gold/15 scale-100 lg:scale-105 z-10 bg-white overflow-hidden rounded-2xl">
                            {/* Fond décoratif */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10" />

                            {/* Badge populaire */}
                            <div className="absolute top-0 inset-x-0 flex justify-center -mt-3">
                                <Badge className="bg-gold hover:bg-gold text-white px-6 py-1.5 text-sm font-medium shadow-lg shadow-gold/20 border-none">
                                    <Star className="mr-1.5 h-3.5 w-3.5 fill-current" />
                                    Meilleure offre
                                </Badge>
                            </div>

                            <CardHeader className="pb-8 pt-10 border-b border-gold/10 bg-gradient-to-b from-gold/5 to-transparent">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <CardTitle className="font-serif text-3xl text-gold-dark">NUBI GOLD</CardTitle>
                                        <CardDescription className="text-base text-anthracite/80 mt-1">
                                            Annuel • Économisez 20 000 FCFA
                                        </CardDescription>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
                                        <Crown className="h-5 w-5 text-gold" />
                                    </div>
                                </div>
                                <div className="pt-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-bold text-anthracite">100 000</span>
                                        <span className="text-xl font-medium text-gold-dark">FCFA</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-sm text-muted-foreground">/ an</span>
                                        <Badge variant="outline" className="text-xs border-green-300 text-green-700 bg-green-50">
                                            <Gift className="mr-1 h-3 w-3" />
                                            2 mois gratuits
                                        </Badge>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-3">Soit 8 333 FCFA/mois au lieu de 10 000 FCFA</p>
                            </CardHeader>
                            <CardContent className="pt-8">
                                <ul className="space-y-3">
                                    {features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3 text-sm">
                                            <div className="mt-0.5 rounded-full bg-gold/10 p-1">
                                                <Check className="h-3 w-3 text-gold" />
                                            </div>
                                            <span className="font-medium text-anthracite">
                                                {feature.name}
                                                {typeof feature.premium === "string" && (
                                                    <span className="ml-1.5 text-xs text-gold font-bold">({feature.premium})</span>
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                    <li className="flex items-start gap-3 text-sm">
                                        <div className="mt-0.5 rounded-full bg-gold/10 p-1">
                                            <Check className="h-3 w-3 text-gold" />
                                        </div>
                                        <span className="font-bold text-gold-dark">12 mois de visibilité continue</span>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter className="pt-4 pb-8">
                                <Button
                                    asChild
                                    className="w-full h-12 rounded-full bg-gold hover:bg-gold-dark text-white text-base font-bold shadow-lg shadow-gold/25 hover:shadow-gold/40 transition-all duration-300"
                                >
                                    <Link href="/inscription">
                                        <Zap className="mr-2 h-4 w-4 fill-current" />
                                        Choisir l'offre annuelle
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Offre GOLD Mensuel */}
                        <Card className="relative border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden rounded-2xl hover:border-gold/20 group">
                            <CardHeader className="pb-8 border-b border-border/50 bg-gray-50/30">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="font-serif text-2xl text-anthracite group-hover:text-gold transition-colors">NUBI GOLD</CardTitle>
                                        <CardDescription className="text-base">
                                            Mensuel • Sans engagement
                                        </CardDescription>
                                    </div>
                                    <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center">
                                        <Crown className="h-4 w-4 text-gold" />
                                    </div>
                                </div>
                                <div className="pt-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-anthracite">10 000</span>
                                    <span className="text-lg font-medium text-muted-foreground">FCFA</span>
                                    <span className="text-sm text-muted-foreground ml-1">/ mois</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">Annulable à tout moment</p>
                            </CardHeader>
                            <CardContent className="pt-8">
                                <ul className="space-y-3">
                                    {features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3 text-sm">
                                            <div className="mt-0.5 rounded-full bg-gold/10 p-1">
                                                <Check className="h-3 w-3 text-gold" />
                                            </div>
                                            <span className="text-anthracite">
                                                {feature.name}
                                                {typeof feature.premium === "string" && (
                                                    <span className="ml-1.5 text-xs text-gold">({feature.premium})</span>
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="pt-4 pb-8">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full h-12 rounded-full border-2 border-gold text-gold hover:bg-gold hover:text-white text-base font-bold transition-all"
                                >
                                    <Link href="/inscription">Commencer avec le mensuel</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Pack Setup Instagram - One Shot */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-white via-purple-50/30 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">

                        {/* Badge nouveau */}
                        <div className="text-center mb-8">
                            <Badge className="bg-purple-600 hover:bg-purple-600 text-white px-4 py-1.5 text-sm font-medium">
                                <Instagram className="mr-1.5 h-3.5 w-3.5" />
                                Nouveau service
                            </Badge>
                        </div>

                        <Card className="border-2 border-purple-200 shadow-xl overflow-hidden rounded-2xl bg-white">
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Colonne gauche - Info */}
                                <div className="p-8 md:p-10 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                            <Instagram className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-2xl font-bold">Pack Setup Instagram</h3>
                                            <p className="text-purple-200 text-sm">Boostez votre présence sociale</p>
                                        </div>
                                    </div>

                                    <p className="text-purple-100 mb-8 leading-relaxed">
                                        Vous n'avez pas le temps d'optimiser votre Instagram ? On s'en occupe pour vous !
                                        Un profil professionnel qui convertit les visiteurs en clients.
                                    </p>

                                    <div className="space-y-3 mb-8">
                                        {instagramFeatures.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="rounded-full bg-white/20 p-1">
                                                    <Check className="h-3 w-3" />
                                                </div>
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-white/20">
                                        <p className="text-purple-200 text-xs">✨ Livraison garantie sous 24h</p>
                                    </div>
                                </div>

                                {/* Colonne droite - Prix */}
                                <div className="p-8 md:p-10 flex flex-col justify-center">
                                    <div className="mb-6">
                                        <p className="text-sm text-muted-foreground mb-2">Prix unique</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-bold text-anthracite">15 000</span>
                                            <span className="text-2xl text-muted-foreground">-</span>
                                            <span className="text-4xl font-bold text-anthracite">25 000</span>
                                            <span className="text-lg text-muted-foreground">FCFA</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2">Selon le niveau de personnalisation</p>
                                    </div>

                                    <div className="space-y-4">
                                        <Button
                                            asChild
                                            className="w-full h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-base font-bold shadow-lg transition-all"
                                        >
                                            <Link href="https://wa.me/2250707756297?text=Bonjour%20!%20Je%20suis%20intéressé(e)%20par%20le%20Pack%20Setup%20Instagram" target="_blank">
                                                <Instagram className="mr-2 h-4 w-4" />
                                                Commander mon pack
                                            </Link>
                                        </Button>
                                        <p className="text-xs text-center text-muted-foreground">
                                            Paiement sécurisé par Mobile Money
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Section de réassurance */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center p-6 rounded-2xl bg-surface/50 border border-border/50">
                            <div className="mx-auto h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-4 text-green-600">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-anthracite mb-2">Paiement Mobile Money</h3>
                            <p className="text-sm text-muted-foreground">Payez par Wave ou Orange Money au 07 07 75 62 97. Activation sous 24h.</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-surface/50 border border-border/50">
                            <div className="mx-auto h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
                                <TrendingUp className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-anthracite mb-2">ROI Immédiat</h3>
                            <p className="text-sm text-muted-foreground">Un seul nouveau client suffit à rentabiliser votre abonnement annuel.</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-surface/50 border border-border/50">
                            <div className="mx-auto h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mb-4 text-purple-600">
                                <HelpCircle className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-anthracite mb-2">Support WhatsApp</h3>
                            <p className="text-sm text-muted-foreground">Une équipe à Abidjan pour vous aider à optimiser votre profil.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-anthracite py-16 md:py-24 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay"></div>

                <div className="container relative mx-auto px-4">
                    <div className="mx-auto max-w-3xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-serif font-bold mb-4 text-gold">Questions fréquentes</h2>
                            <p className="text-gray-400">Tout ce que vous devez savoir avant de vous lancer.</p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-lg text-gold font-medium mb-2">Comment payer ?</CardTitle>
                                    <CardDescription className="text-gray-300">
                                        Envoyez le montant par Wave ou Orange Money au 07 07 75 62 97, puis contactez-nous sur WhatsApp avec votre preuve de paiement. Activation sous 24h.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-lg text-gold font-medium mb-2">Pourquoi choisir l'annuel ?</CardTitle>
                                    <CardDescription className="text-gray-300">
                                        Vous économisez 20 000 FCFA (2 mois gratuits) et bénéficiez d'une visibilité continue pendant 12 mois sans interruption.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-lg text-gold font-medium mb-2">Puis-je essayer gratuitement ?</CardTitle>
                                    <CardDescription className="text-gray-300">
                                        L'inscription est 100% gratuite. Utilisez la version Starter indéfiniment avant de décider de passer Premium.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-lg text-gold font-medium mb-2">Le Pack Instagram est-il obligatoire ?</CardTitle>
                                    <CardDescription className="text-gray-300">
                                        Non, c'est un service optionnel pour ceux qui veulent optimiser leur présence sur Instagram en plus de Maison Nubi.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-b from-surface via-white to-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-3xl font-serif font-bold text-anthracite">
                        Prêt à faire décoller votre activité ?
                    </h2>
                    <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
                        Ne laissez pas vos concurrents prendre votre place. Rejoignez Maison Nubi aujourd'hui.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="h-14 px-8 rounded-full bg-gold hover:bg-gold-dark text-white text-lg font-bold shadow-xl shadow-gold/20 hover:shadow-gold/40 transition-all"
                        >
                            <Link href="/inscription">
                                <Sparkles className="mr-2 h-5 w-5" />
                                Je crée mon compte maintenant
                            </Link>
                        </Button>
                    </div>
                    <p className="mt-6 text-sm text-muted-foreground">
                        Inscription gratuite en 2 minutes. Pas besoin de carte bancaire pour le compte Starter.
                    </p>
                </div>
            </section>
        </div>
    );
}
