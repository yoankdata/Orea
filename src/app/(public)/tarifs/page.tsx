import { Metadata } from "next";
import Link from "next/link";
import { Check, X, Crown, Sparkles, Zap, Star, ShieldCheck, TrendingUp, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: "Tarifs & Offre Premium | Maison Nubi",
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
        name: "Position prioritaire (Top Recherche)",
        free: false,
        premium: true,
        highlight: true,
        description: "Apparaissez avant vos concurrents",
    },
    {
        name: 'Badge "Vérifié & GOLD"',
        free: false,
        premium: true,
        description: "Inspirez une confiance totale aux clients",
    },
    {
        name: "Bouton WhatsApp animé",
        free: false,
        premium: true,
        description: "Attire l'œil pour plus de clics",
    },
    {
        name: "Statistiques de vues",
        free: false,
        premium: true,
        description: "Suivez votre popularité en temps réel",
    },
];

/**
 * Page Tarifs - Présentation de l'offre Premium
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

            {/* Cards de pricing */}
            <section className="py-12 md:py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto items-start">

                        {/* Offre Gratuite */}
                        <Card className="relative border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden rounded-2xl hover:border-gold/20 group">
                            <CardHeader className="pb-8 border-b border-border/50 bg-gray-50/30">
                                <CardTitle className="font-serif text-2xl text-anthracite group-hover:text-gold transition-colors">Starter</CardTitle>
                                <CardDescription className="text-base">
                                    Idéal pour démarrer et créer votre présence en ligne.
                                </CardDescription>
                                <div className="pt-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-anthracite">0</span>
                                    <span className="text-lg font-medium text-muted-foreground">FCFA</span>
                                    <span className="text-sm text-muted-foreground ml-1">/ mois</span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-8">
                                <ul className="space-y-4">
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
                                            <div className="flex-1">
                                                <span className={!feature.free ? "text-muted-foreground line-through decoration-muted-foreground/50" : "text-anthracite font-medium"}>
                                                    {feature.name}
                                                </span>
                                                {typeof feature.free === "string" && (
                                                    <span className="ml-1.5 inline-block rounded-md bg-white border border-border px-2 py-0.5 text-xs font-medium text-anthracite shadow-sm">
                                                        {feature.free}
                                                    </span>
                                                )}
                                            </div>
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

                        {/* Offre Premium */}
                        <Card className="relative border-2 border-gold shadow-2xl shadow-gold/15 scale-100 lg:scale-105 z-10 bg-white overflow-hidden rounded-2xl">
                            {/* Fond décoratif subtil */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10" />

                            {/* Badge populaire */}
                            <div className="absolute top-0 inset-x-0 flex justify-center -mt-3">
                                <Badge className="bg-gold hover:bg-gold text-white px-6 py-1.5 text-sm font-medium shadow-lg shadow-gold/20 border-none">
                                    <Star className="mr-1.5 h-3.5 w-3.5 fill-current" />
                                    Le choix des pros
                                </Badge>
                            </div>

                            <CardHeader className="pb-8 pt-10 border-b border-gold/10 bg-gradient-to-b from-gold/5 to-transparent">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <CardTitle className="font-serif text-3xl text-gold-dark">NUBI GOLD</CardTitle>
                                        <CardDescription className="text-base text-anthracite/80 mt-1">
                                            Pour ceux qui veulent dominer leur marché.
                                        </CardDescription>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
                                        <Crown className="h-5 w-5 text-gold" />
                                    </div>
                                </div>
                                <div className="pt-6 flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-anthracite">10 000</span>
                                    <span className="text-xl font-medium text-gold-dark">FCFA</span>
                                    <span className="text-sm text-muted-foreground ml-1">/ mois</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">Sans engagement, annulable à tout moment.</p>
                            </CardHeader>
                            <CardContent className="pt-8">
                                <ul className="space-y-4">
                                    {features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3 text-sm">
                                            <div className="mt-0.5 rounded-full bg-gold/10 p-1">
                                                <Check className="h-3 w-3 text-gold" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col">
                                                    <span className={`font-medium text-anthracite ${feature.premium === true && feature.free === false ? "text-base" : ""}`}>
                                                        {feature.name}
                                                    </span>
                                                    {feature.description && (
                                                        <span className="text-xs text-muted-foreground mt-0.5">
                                                            {feature.description}
                                                        </span>
                                                    )}
                                                </div>
                                                {typeof feature.premium === "string" && (
                                                    <span className="mt-1.5 inline-block rounded-md bg-gold/10 px-2 py-0.5 text-xs font-bold text-gold-dark border border-gold/20">
                                                        {feature.premium}
                                                    </span>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="pt-4 pb-8">
                                <Button
                                    asChild
                                    className="w-full h-12 rounded-full bg-gold hover:bg-gold-dark text-white text-base font-bold shadow-lg shadow-gold/25 hover:shadow-gold/40 transition-all duration-300"
                                >
                                    <Link href="/inscription">
                                        <Zap className="mr-2 h-4 w-4 fill-current" />
                                        Booster mon salon maintenant
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Section de réassurance */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center p-6 rounded-2xl bg-surface/50 border border-border/50">
                            <div className="mx-auto h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-4 text-green-600">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-anthracite mb-2">Paiement Sécurisé</h3>
                            <p className="text-sm text-muted-foreground">Transactions cryptées et sécurisées via Stripe. Nous ne stockons aucune donnée bancaire.</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-surface/50 border border-border/50">
                            <div className="mx-auto h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
                                <TrendingUp className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-anthracite mb-2">ROI Rapide</h3>
                            <p className="text-sm text-muted-foreground">Un seul nouveau client par mois suffit à rembourser votre abonnement.</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-surface/50 border border-border/50">
                            <div className="mx-auto h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mb-4 text-purple-600">
                                <HelpCircle className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-anthracite mb-2">Support Dédié</h3>
                            <p className="text-sm text-muted-foreground">Une équipe basée à Abidjan pour vous aider à optimiser votre profil.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Simplifiée mais stylisée */}
            <section className="bg-anthracite py-16 md:py-24 text-white relative overflow-hidden">
                {/* Texture bruit subtile */}
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
                                    <CardTitle className="text-lg text-gold font-medium mb-2">Comment fonctionne le paiement ?</CardTitle>
                                    <CardDescription className="text-gray-300">
                                        Le paiement est mensuel et automatique via carte bancaire. Vous recevez une facture par email chaque mois.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-lg text-gold font-medium mb-2">Puis-je annuler à tout moment ?</CardTitle>
                                    <CardDescription className="text-gray-300">
                                        Oui, absolument. L'annulation se fait en un clic depuis votre tableau de bord. L'accès Premium s'arrête à la fin du mois en cours.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-lg text-gold font-medium mb-2">Puis-je essayer gratuitement ?</CardTitle>
                                    <CardDescription className="text-gray-300">
                                        L'inscription est 100% gratuite. Vous pouvez utiliser la version Starter indéfiniment avant de décider de passer Premium.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-lg text-gold font-medium mb-2">Comment passer en Gold ?</CardTitle>
                                    <CardDescription className="text-gray-300">
                                        Une fois inscrit, un bouton "Passer Premium" est disponible dans votre espace personnel. L'activation est immédiate après paiement.
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
                        Inscription gratuite en 2 minutes. Pas de carte bancaire requise pour le compte Starter.
                    </p>
                </div>
            </section>
        </div>
    );
}
