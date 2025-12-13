import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Image, CreditCard, LogOut, Sparkles, Menu, Package } from "lucide-react";
import { createClient } from "@/lib/supabase-server";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { DashboardNav } from "@/components/dashboard-nav";

// Navigation sidebar du dashboard
const sidebarLinks = [
    { href: "/espace-pro/profil", label: "Mon Profil", icon: User },
    { href: "/espace-pro/services", label: "Mes Services", icon: Package },
    { href: "/espace-pro/galerie", label: "Ma Galerie", icon: Image },
    { href: "/espace-pro/abonnement", label: "Abonnement", icon: CreditCard },
];

/**
 * Layout protégé du Dashboard
 * Redirige vers /connexion si non connecté
 */
export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    // Si Supabase n'est pas configuré, rediriger vers login
    if (!supabase) {
        redirect("/connexion");
    }

    // Vérifier l'authentification
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/connexion");
    }

    return (
        <div className="min-h-screen bg-surface">
            {/* Header Dashboard */}
            <div className="sticky top-16 z-40 bg-white border-b border-border">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Menu mobile */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-2">
                                        <Sparkles className="h-5 w-5 text-gold" />
                                        Mon Espace
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="mt-6 space-y-1">
                                    {sidebarLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-anthracite transition-colors"
                                        >
                                            <link.icon className="h-4 w-4" />
                                            {link.label}
                                        </Link>
                                    ))}
                                    <hr className="my-4" />
                                    <form action="/api/auth/signout" method="POST">
                                        <button
                                            type="submit"
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Déconnexion
                                        </button>
                                    </form>
                                </nav>
                            </SheetContent>
                        </Sheet>

                        <h1 className="font-serif text-xl font-semibold text-anthracite">
                            Mon Espace Pro
                        </h1>
                    </div>

                    <p className="text-sm text-muted-foreground hidden sm:block">
                        {user.email}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="flex gap-6">
                    {/* Sidebar (desktop) */}
                    <aside className="hidden md:block w-64 shrink-0">
                        <div className="sticky top-36">
                            <DashboardNav />
                        </div>
                    </aside>

                    {/* Contenu principal */}
                    <main className="flex-1 min-w-0">{children}</main>
                </div>
            </div>
        </div>
    );
}
