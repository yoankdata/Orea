import Link from "next/link";
import Script from "next/script";
import { Metadata } from "next";
import { ArrowRight, Star, Search, Users, Shield, Sparkles, Scissors, Palette, Gem, Smile, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Metadata SEO pour la page d'accueil
export const metadata: Metadata = {
  title: "ORÉA | L'annuaire beauté premium d'Abidjan et Côte d'Ivoire",
  description: "Trouvez les meilleurs professionnels de la beauté à Abidjan : coiffure, maquillage, ongles, soins et barber. Réservez en un clic via WhatsApp. 100% gratuit.",
  keywords: ["beauté Abidjan", "coiffeuse Abidjan", "maquillage Côte d'Ivoire", "salon de beauté", "tresses", "braids", "nail art"],
  alternates: {
    canonical: "https://orea.ci",
  },
};

// JSON-LD pour les résultats enrichis Google
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ORÉA",
  url: "https://orea.ci",
  description: "L'annuaire beauté premium en Côte d'Ivoire",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://orea.ci/recherche?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// Catégories principales avec Icônes Lucide et non Emojis
const categories = [
  {
    id: "coiffure",
    label: "Coiffure",
    icon: Scissors,
    description: "Tresses, tissages, locks",
    count: 120,
  },
  {
    id: "makeup",
    label: "Maquillage",
    icon: Palette,
    description: "Maquillage pro & mariée",
    count: 85,
  },
  {
    id: "ongles",
    label: "Ongles",
    icon: Gem,
    description: "Manucure & nail art",
    count: 95,
  },
  {
    id: "soins",
    label: "Soins",
    icon: Sparkles,
    description: "Spa, massage & soins",
    count: 45,
  },
  {
    id: "barber",
    label: "Barber",
    icon: User, // Ou une autre icône plus spécifique si disponible mais User est clean
    description: "Coupe & barbe homme",
    count: 60,
  },
];

// Statistiques
const stats = [
  { value: "100%", label: "Profils Vérifiés" },
  { value: "Oréa", label: "Label de Qualité" },
  { value: "5.0", label: "Standard d'Excellence", icon: Star },
];

// Avantages
const features = [
  {
    icon: Search,
    title: "Trouvez facilement",
    description: "Recherchez par catégorie, commune ou prix en quelques clics.",
  },
  {
    icon: Users,
    title: "Profils vérifiés",
    description: "Des professionnels de confiance avec leurs réalisations.",
  },
  {
    icon: Shield,
    title: "Réservez en 1 clic",
    description: "Contactez directement via WhatsApp, sans intermédiaire.",
  },
];

/**
 * Landing Page ORÉA - Version Luxe Éditorial
 * - Hero "Aérien" avec Titre Géant Serif
 * - Recherche "Floating Pill"
 * - Sections épurées avec beaucoup d'espace blanc
 */
export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* JSON-LD pour Google */}
      <Script
        id="json-ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-white pt-20">

        {/* Décoration d'arrière-plan abstraite */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2938&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] mix-blend-multiply blur-sm" />
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-rose-100 mix-blend-multiply blur-3xl opacity-40 animate-blob" />
        <div className="absolute top-40 -right-20 h-[500px] w-[500px] rounded-full bg-amber-100/30 mix-blend-multiply blur-3xl opacity-40 animate-blob animation-delay-2000" />

        <div className="container relative mx-auto px-6 z-10 flex flex-col items-center text-center">

          {/* Badge Poétique */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/60 backdrop-blur-sm px-6 py-2 text-xs font-bold text-gold tracking-[0.2em] uppercase shadow-sm">
            <Sparkles className="h-3 w-3" />
            <span>L'Excellence Beauté à Abidjan</span>
          </div>

          {/* Titre GIGANTESQUE Serif */}
          <h1 className="mb-8 font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-anthracite tracking-tight leading-[1.1]">
            Révélez <br />
            <span className="italic font-light bg-gradient-to-r from-gold via-yellow-500 to-gold bg-clip-text text-transparent transform translate-x-2 inline-block pb-2">
              votre éclat.
            </span>
          </h1>

          {/* Sous-titre Minimaliste */}
          <p className="mx-auto mb-12 max-w-xl text-lg text-muted-foreground font-light leading-relaxed tracking-wide">
            L'annuaire sélectif des meilleurs coiffeurs, maquilleurs et
            experts beauté de Côte d'Ivoire.
          </p>

          {/* Barre de Recherche "Floating Pill" */}
          <div className="w-full max-w-2xl relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/40 via-white to-gold/40 rounded-full opacity-20 group-hover:opacity-50 blur transition duration-700"></div>
            <div className="relative flex items-center bg-white rounded-full shadow-2xl shadow-gold/5 p-2 h-16 sm:h-20 transition-all duration-300 transform hover:scale-[1.01] border border-white/50">
              <Search className="ml-6 h-6 w-6 text-gold flex-shrink-0" />
              <Input
                type="text"
                placeholder="Coiffure, Maquillage, Spa..."
                className="border-none shadow-none focus-visible:ring-0 text-lg bg-transparent h-full px-4 placeholder:text-muted-foreground/40 text-anthracite font-serif w-full"
              />
              <Button asChild size="lg" className="rounded-full bg-anthracite text-white hover:bg-gold hover:text-white transition-all duration-300 h-12 sm:h-16 px-8 sm:px-10 text-sm uppercase tracking-widest font-bold shadow-lg flex-shrink-0">
                <Link href="/recherche">
                  Explorer
                </Link>
              </Button>
            </div>
          </div>

          {/* Tags populaires */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground/70 font-light">
            <span className="font-medium text-anthracite/50">Populaire :</span>
            {['Tresses', 'Nappy', 'Maquillage Mariée', 'Onglerie'].map(tag => (
              <Link key={tag} href={`/recherche?q=${tag}`} className="hover:text-gold transition-colors hover:underline decoration-gold/50 underline-offset-4">
                {tag}
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ===== CATÉGORIES (Design Épuré) ===== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="font-serif text-3xl md:text-5xl text-anthracite mb-6">
              L'Art de la Beauté
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full opacity-30" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/recherche?category=${category.id}`}
                className="group h-full"
              >
                <div className="flex flex-col items-center justify-center p-6 lg:p-8 rounded-[2rem] bg-gray-50/50 border border-transparent hover:border-gold/20 hover:bg-white hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-pointer h-full group-hover:-translate-y-1 relative overflow-hidden">
                  {/* Fond subtil au survol */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500 text-muted-foreground/50 group-hover:text-gold opacity-80 group-hover:opacity-100 relative z-10">
                    <category.icon className="section-icon h-10 w-10 md:h-12 md:w-12 stroke-[1.5]" />
                  </div>
                  <h3 className="text-lg text-anthracite group-hover:text-gold transition-colors relative z-10 font-bold font-sans">
                    {category.label}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild variant="link" className="text-anthracite text-xs tracking-[0.2em] uppercase hover:text-gold transition-colors group p-0">
              <Link href="/recherche" className="flex items-center gap-2">
                Voir toutes les catégories
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== AVANTAGES (Minimaliste) ===== */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        {/* Cercles décoratifs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[120px] opacity-60 -z-10" />

        <div className="container mx-auto px-6">
          <div className="grid gap-16 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl shadow-gray-100 group-hover:shadow-gold/10 transition-all duration-500 border border-gray-100">
                  <feature.icon className="h-8 w-8 text-gold mt-1 transition-transform group-hover:scale-110 duration-300" />
                </div>
                <h3 className="mb-4 text-2xl text-anthracite group-hover:text-gold transition-colors duration-300 font-bold font-sans">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs font-light text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATISTIQUES (Dark Mode Luxe) ===== */}
      <section className="bg-[#1A1A1A] py-28 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid gap-12 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center px-4 pt-8 sm:pt-0 group cursor-default">
                <div className="mb-3 font-serif text-5xl md:text-7xl font-light text-gold transition-all duration-700 group-hover:text-white group-hover:scale-105 inline-block">
                  {stat.value}
                </div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 group-hover:text-gold transition-colors duration-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL (Image Immersive) ===== */}
      <section className="relative py-40 overflow-hidden flex items-center justify-center bg-[#1A1A1A]">
        <div className="absolute inset-0 bg-[#1A1A1A]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-12186d3069aa?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay transition-transform duration-[20s] hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A]" />
        </div>

        <div className="container relative mx-auto px-6 text-center z-10 max-w-4xl">
          <span className="inline-block text-gold mb-8 text-xs tracking-[0.4em] uppercase font-bold animate-fade-in-up">
            Espace Professionnel
          </span>
          <h2 className="mb-8 font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-none">
            Votre talent mérite <br /> une vitrine d'exception.
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-gray-400 font-light leading-relaxed">
            Rejoignez l'élite de la beauté ivoirienne sur ORÉA. Profitez d'une visibilité premium et gérez vos rendez-vous avec élégance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gold text-white hover:bg-white hover:text-anthracite h-14 px-10 text-sm uppercase tracking-widest font-bold transition-all duration-300 shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.3)]"
            >
              <Link href="/inscription">
                Rejoindre ORÉA
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-white/20 text-white hover:bg-white/10 h-14 px-10 text-sm uppercase tracking-widest bg-transparent transition-all duration-300 backdrop-blur-sm"
            >
              <Link href="/a-propos">
                En savoir plus
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}