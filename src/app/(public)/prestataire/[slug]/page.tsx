import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    Star,
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
import type { Profile, Service, PortfolioImage } from "@/lib/database.types";

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

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("slug", slug)
        .eq("status", "active")
        .single();

    if (!profile) return null;

    const { data: services } = await supabase
        .from("services")
        .select("*")
        .eq("profile_id", profile.id)
        .order("price", { ascending: true });

    const { data: portfolio_images } = await supabase
        .from("portfolio_images")
        .select("*")
        .eq("profile_id", profile.id)
        .order("created_at", { ascending: false });

    return {
        ...profile,
        services: (services as unknown as Service[]) || [],
        portfolio_images: (portfolio_images as unknown as PortfolioImage[]) || [],
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

    // Image de couverture par défaut
    const coverImage = "/profile-hero.jpg";

    return (
        <div className="min-h-screen bg-white font-sans pb-20">

            {/* === 1. HERO SECTION === */}
            {/* Hauteur réduite pour éviter l'effet "vide" sur petits écrans */}
            <div className="relative h-[35vh] lg:h-[45vh] w-full bg-anthracite overflow-hidden">
                <Image
                    src={coverImage}
                    alt="Atmosphère salon"
                    fill
                    className="object-cover opacity-60" // Opacité réduite pour que le texte blanc ressorte mieux
                    priority
                />
                {/* Dégradé pour assurer la lisibilité du bouton retour */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                <div className="absolute top-6 left-4 md:left-8 z-20">
                    <Button asChild variant="secondary" size="sm" className="rounded-full bg-white/20 backdrop-blur-md text-white border-0 hover:bg-white/30">
                        <Link href="/recherche">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative">

                {/* === 2. BLOC IDENTITÉ === */}
                {/* On remonte moins haut (-mt-16 au lieu de -mt-24) pour éviter les collisions */}
                <div className="-mt-16 mb-12 flex flex-col md:flex-row items-end gap-6 relative z-10">

                    {/* AVATAR */}
                    <div className="relative shrink-0 mx-auto md:mx-0">
                        <div className="h-32 w-32 md:h-48 md:w-48 rounded-full p-1 bg-white shadow-xl">
                            <Avatar className="h-full w-full border-2 border-gray-100">
                                <AvatarImage src={profile.avatar_url || undefined} className="object-cover" />
                                <AvatarFallback className="bg-anthracite text-white text-3xl font-serif">{initials}</AvatarFallback>
                            </Avatar>
                        </div>
                        {isPremium && (
                            <div className="absolute bottom-1 right-1 md:bottom-3 md:right-3 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-gold text-white shadow-lg border-2 border-white" title="Premium">
                                <Crown className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                            </div>
                        )}
                    </div>

                    {/* INFOS PRINCIPALES */}
                    <div className="flex-1 w-full text-center md:text-left pt-2 md:pt-0">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-4">

                            <div className="space-y-2 w-full">
                                {/* Badges */}
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                    <Badge variant="outline" className="border-gold text-gold-dark bg-gold/5 uppercase text-[10px] font-bold px-2 py-0.5">
                                        {categoryLabels[profile.category] || "Beauté"}
                                    </Badge>
                                    {profile.rating > 0 && (
                                        <div className="flex items-center gap-1 text-sm font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                                            <Star className="h-3 w-3 fill-gold text-gold" />
                                            <span>{profile.rating.toFixed(1)}</span>
                                            <span className="text-gray-400 text-xs">({profile.review_count || 0})</span>
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