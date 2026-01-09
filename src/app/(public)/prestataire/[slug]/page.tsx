import Script from "next/script";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    Heart,
    MapPin,
    Instagram,
    Crown,
    Share2,
    Clock,
    CheckCircle2,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { createClient } from "@/lib/supabase-server";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { LikeButton } from "@/components/like-button";
import type { Profile, Service, PortfolioImage } from "@/lib/database.types";
import { getOptimizedImageUrl } from "@/lib/image-utils";

// Labels des catégories
const categoryLabels: Record<string, string> = {
    coiffure: "Coiffure",
    makeup: "Maquillage",
    ongles: "Ongles",
    soins: "Soins",
    barber: "Barber",
};

interface ProfileWithDetails extends Profile {
    services: Service[];
    portfolio_images: PortfolioImage[];
}

async function getProfile(slug: string): Promise<ProfileWithDetails | null> {
    const supabase = await createClient();
    if (!supabase) return null;

    const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("slug", slug)
        .eq("status", "active")
        .single();

    if (!profileData) return null;

    // Cast vers Profile - Les types correspondent à database.types.ts
    // Si le schéma DB change, mettre à jour database.types.ts en conséquence
    const profile = profileData as unknown as Profile;

    const { data: servicesData } = await supabase
        .from("services")
        .select("*")
        .eq("profile_id", profile.id)
        .order("price", { ascending: true });

    const { data: portfolioData } = await supabase
        .from("portfolio_images")
        .select("*")
        .eq("profile_id", profile.id)
        .order("created_at", { ascending: false });

    return {
        ...profile,
        services: (servicesData ?? []) as Service[],
        portfolio_images: (portfolioData ?? []) as PortfolioImage[],
    };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const profile = await getProfile(slug);
    if (!profile) return { title: "Profil non trouvé" };
    return {
        title: `${profile.full_name} - ${categoryLabels[profile.category] || "Beauté"}`,
        description: profile.bio?.substring(0, 160),
    };
}

export default async function ProviderProfilePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const profile = await getProfile(slug);

    if (!profile) notFound();

    const isPremium = profile.is_premium;
    const initials = profile.full_name.slice(0, 2).toUpperCase();

    // Image de couverture : Toujours la banniere generique Maison Nubi
    const coverImage = "/profile-hero.jpg";
    const avatarImage = getOptimizedImageUrl(profile.avatar_url, 'avatar', 'high');

    // Construction du Schema.org (LocalBusiness / BeautySalon)
    const minPrice = profile.services.length > 0 ? Math.min(...profile.services.map(s => s.price)) : 0;
    const maxPrice = profile.services.length > 0 ? Math.max(...profile.services.map(s => s.price)) : 0;
    const priceRange = minPrice > 0 ? `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}` : "Sur devis";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        name: profile.full_name,
        image: [avatarImage || "https://maisonnubi.ci/og-image.jpg"],
        description: profile.bio || `Découvrez ${profile.full_name}, professionnel de la beauté à Abidjan.`,
        address: {
            "@type": "PostalAddress",
            streetAddress: profile.neighborhood,
            addressLocality: profile.city || "Abidjan",
            addressRegion: "Abidjan",
            addressCountry: "CI"
        },
        priceRange: priceRange,
        url: `https://maisonnubi.ci/prestataire/${profile.slug}`,
        telephone: profile.whatsapp ? `+225${profile.whatsapp}` : undefined,
    };

    return (
        <div className="min-h-screen bg-white font-sans pb-20">
            <Script
                id="json-ld-profile"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* === 1. HERO SECTION === */}
            {/* Hauteur réduite pour éviter l'effet "vide" sur petits écrans */}
            <div className="relative h-[30vh] lg:h-[40vh] w-full bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                <Image
                    src={coverImage}
                    alt="Bannière profil"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                {/* Dégradé pour assurer la lisibilité du bouton retour */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                <div className="absolute top-6 left-4 md:left-8 z-20">
                    <Button asChild variant="secondary" size="sm" className="rounded-full bg-white/20 backdrop-blur-md text-white border-0 hover:bg-white/30 shadow-sm">
                        <Link href="/recherche">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative">

                {/* === 2. BLOC IDENTITÉ === */}
                {/* Avatar plus petit et mieux intégré */}
                <div className="-mt-12 mb-8 flex flex-col md:flex-row items-end gap-6 relative z-10">

                    {/* AVATAR */}
                    <div className="relative shrink-0 mx-auto md:mx-0">
                        <div className="h-32 w-32 rounded-full p-1 bg-white shadow-2xl shadow-black/10">
                            <Avatar className="h-full w-full border border-gray-100">
                                <AvatarImage src={avatarImage || undefined} className="object-cover" />
                                <AvatarFallback className="bg-anthracite text-white text-3xl font-serif">{initials}</AvatarFallback>
                            </Avatar>
                        </div>
                        {isPremium && (
                            <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-white shadow-lg border-2 border-white" title="Premium">
                                <Crown className="h-4 w-4 fill-current" />
                            </div>
                        )}
                    </div>

                    {/* INFOS PRINCIPALES */}
                    <div className="flex-1 w-full text-center md:text-left pt-2 md:pt-0 pb-1">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-4">

                            <div className="space-y-2 w-full">
                                {/* Badges */}
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                    <Badge variant="outline" className="border-gold text-gold-dark bg-gold/5 uppercase text-[10px] font-bold px-2 py-0.5">
                                        {categoryLabels[profile.category] || "Beauté"}
                                    </Badge>
                                    {/* Badge Recommandations */}
                                    {((profile as unknown as { recommendations_count?: number }).recommendations_count || 0) > 0 && (
                                        <div className="flex items-center gap-1 text-sm font-medium bg-gold/10 px-2 py-0.5 rounded-full">
                                            <Heart className="h-3 w-3 fill-gold text-gold" />
                                            <span className="text-gold-dark">{(profile as unknown as { recommendations_count?: number }).recommendations_count}</span>
                                            <span className="text-gold-dark/60 text-xs">recommandations</span>
                                        </div>
                                    )}
                                </div>

                                {/* Nom - Nettoyage des collisions */}
                                <h1 className="font-serif text-3xl md:text-5xl font-bold text-anthracite leading-tight">
                                    {profile.full_name}
                                </h1>

                                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm">
                                    <MapPin className="h-4 w-4 text-gold" />
                                    <span>{profile.neighborhood ? `${profile.neighborhood}, ` : ""}{profile.city}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end pb-1">
                                <LikeButton
                                    profileId={profile.id}
                                    initialCount={(profile as unknown as { recommendations_count?: number }).recommendations_count || 0}
                                />
                                <Button size="icon" variant="outline" className="rounded-full h-10 w-10 md:h-12 md:w-12 border-gray-200">
                                    <Share2 className="h-4 w-4 md:h-5 md:w-5" />
                                </Button>
                                <WhatsAppButton
                                    whatsapp={profile.whatsapp}
                                    providerEmail={profile.email || ''}
                                    providerName={profile.full_name}
                                    category={categoryLabels[profile.category]}
                                    className="h-10 md:h-12 px-6 rounded-full bg-gold hover:bg-gold-dark text-white font-bold shadow-lg shadow-gold/20"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* === 3. CONTENU (GRID) === */}
                <div className="grid lg:grid-cols-12 gap-10">

                    {/* GAUCHE : Bio, Services, Photos */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Bio */}
                        {profile.bio && (
                            <section className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                <h2 className="font-serif text-xl text-anthracite mb-4 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-gold" />
                                    L'univers
                                </h2>
                                <p className="text-gray-600 leading-relaxed text-lg font-light">
                                    {profile.bio}
                                </p>
                            </section>
                        )}

                        {/* Services */}
                        {profile.services.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-2">
                                    <h2 className="font-serif text-2xl text-anthracite">Carte des Soins</h2>
                                </div>
                                <div className="space-y-4">
                                    {profile.services.map((service) => (
                                        <div key={service.id} className="flex items-center justify-between group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                                            <div className="flex-1 pr-4">
                                                <h3 className="font-medium text-anthracite text-lg">{service.title}</h3>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-serif text-lg font-bold text-anthracite">
                                                    {formatPrice(service.price)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Galerie */}
                        {profile.portfolio_images.length > 0 && (
                            <section>
                                <h2 className="font-serif text-2xl text-anthracite mb-6">Réalisations</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {profile.portfolio_images.map((image, idx) => (
                                        <div key={image.id} className="relative aspect-square rounded-xl overflow-hidden group bg-gray-100">
                                            <Image
                                                src={image.image_url}
                                                alt={`Réalisation ${idx + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* DROITE : Sidebar Sticky */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <Card className="border-0 shadow-lg shadow-gray-100/50 bg-white ring-1 ring-black/5 overflow-hidden">
                                <div className="h-1 bg-gold w-full" />
                                <CardContent className="p-6 space-y-6">
                                    <h3 className="font-serif text-lg font-bold text-anthracite">Informations</h3>

                                    <div className="flex gap-4">
                                        <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                                            <Clock className="h-4 w-4" />
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-bold text-anthracite mb-1">Horaires</p>
                                            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-gray-500">
                                                <span>Lun - Ven</span> <span className="text-anthracite">09h - 19h</span>
                                                <span>Samedi</span> <span className="text-anthracite">09h - 18h</span>
                                                <span className="text-red-400">Dimanche</span> <span>Fermé</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                                            <MapPin className="h-4 w-4" />
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-bold text-anthracite mb-1">Adresse</p>
                                            <p className="text-gray-500 mb-2">
                                                {profile.neighborhood}<br />{profile.city}, Abidjan
                                            </p>
                                            <a href="#" className="text-gold font-bold text-xs hover:underline">Voir sur la carte</a>
                                        </div>
                                    </div>

                                    {isPremium && (
                                        <div className="bg-green-50 rounded-lg p-3 flex gap-3 items-center border border-green-100">
                                            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                                            <p className="text-xs text-green-800 font-medium">Prestataire vérifié par ORÉA</p>
                                        </div>
                                    )}

                                    <WhatsAppButton
                                        whatsapp={profile.whatsapp}
                                        providerEmail={profile.email || ''}
                                        providerName={profile.full_name}
                                        category={categoryLabels[profile.category]}
                                        variant="fixed"
                                        className="w-full text-sm font-bold"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}