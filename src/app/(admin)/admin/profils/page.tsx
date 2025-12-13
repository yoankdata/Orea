"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    Search,
    CheckCircle,
    XCircle,
    Clock,
    Crown,
    ExternalLink,
    Loader2,
    Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import type { Profile, ProfileStatus } from "@/lib/database.types";

// Labels des catégories
const categoryLabels: Record<string, string> = {
    coiffure: "Coiffure",
    makeup: "Maquillage",
    ongles: "Ongles",
    soins: "Soins",
    barber: "Barber",
};

// Labels des statuts
const statusConfig: Record<ProfileStatus, { label: string; color: string; icon: React.ElementType }> = {
    active: { label: "Actif", color: "bg-green-100 text-green-700", icon: CheckCircle },
    pending: { label: "En attente", color: "bg-amber-100 text-amber-700", icon: Clock },
    banned: { label: "Banni", color: "bg-red-100 text-red-700", icon: XCircle },
};

/**
 * Page de modération des profils
 * Liste tous les profils avec possibilité de changer leur statut
 */
export default function AdminProfilesPage() {
    const searchParams = useSearchParams();
    const initialStatus = searchParams.get("status") as ProfileStatus | null;

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<ProfileStatus | "all">(initialStatus || "all");
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    // Charger les profils
    useEffect(() => {
        async function fetchProfiles() {
            if (!supabase) return;

            setIsLoading(true);

            let query = supabase
                .from("profiles")
                .select("*")
                .order("created_at", { ascending: false });

            if (statusFilter !== "all") {
                query = query.eq("status", statusFilter);
            }

            if (searchQuery) {
                query = query.or(
                    `full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%`
                );
            }

            const { data, error } = await query;

            if (error) {
                console.error("Erreur chargement profils:", error);
            } else {
                setProfiles((data as unknown as Profile[]) || []);
            }

            setIsLoading(false);
        }

        fetchProfiles();
    }, [statusFilter, searchQuery]);

    // Changer le statut d'un profil
    const updateStatus = async (profileId: string, newStatus: ProfileStatus) => {
        if (!supabase) return;

        setUpdatingId(profileId);

        const { error } = await supabase
            .from("profiles")
            .update({ status: newStatus } as never)
            .eq("id", profileId);

        if (error) {
            console.error("Erreur mise à jour statut:", error);
            alert("Erreur lors de la mise à jour du statut");
        } else {
            // Mettre à jour localement
            setProfiles(prev =>
                prev.map(p =>
                    p.id === profileId ? { ...p, status: newStatus } : p
                )
            );
        }

        setUpdatingId(null);
    };

    // Initiales pour l'avatar
    const getInitials = (name: string) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

    return (
        <div className="space-y-6">
            {/* En-tête */}
            <div>
                <h1 className="font-serif text-2xl font-bold text-anthracite">
                    Modération des Profils
                </h1>
                <p className="text-muted-foreground">
                    Gérez les profils prestataires de la plateforme
                </p>
            </div>

            {/* Filtres */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Recherche */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Rechercher par nom, email, ville..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Filtre par statut */}
                <Select
                    value={statusFilter}
                    onValueChange={(v) => setStatusFilter(v as ProfileStatus | "all")}
                >
                    <SelectTrigger className="w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="active">Actifs</SelectItem>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="banned">Bannis</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Tableau des profils */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-gold" />
                    </div>
                ) : profiles.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        Aucun profil trouvé
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Prestataire</TableHead>
                                <TableHead>Catégorie</TableHead>
                                <TableHead>Ville</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Premium</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {profiles.map((profile) => {
                                const StatusIcon = statusConfig[profile.status].icon;
                                return (
                                    <TableRow key={profile.id}>
                                        {/* Prestataire */}
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={profile.avatar_url || undefined} />
                                                    <AvatarFallback className="bg-gold/10 text-gold font-medium">
                                                        {getInitials(profile.full_name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-anthracite">
                                                        {profile.full_name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {profile.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Catégorie */}
                                        <TableCell>
                                            <Badge variant="outline">
                                                {categoryLabels[profile.category]}
                                            </Badge>
                                        </TableCell>

                                        {/* Ville */}
                                        <TableCell className="text-muted-foreground">
                                            {profile.city}
                                        </TableCell>

                                        {/* Statut */}
                                        <TableCell>
                                            <Badge className={statusConfig[profile.status].color}>
                                                <StatusIcon className="mr-1 h-3 w-3" />
                                                {statusConfig[profile.status].label}
                                            </Badge>
                                        </TableCell>

                                        {/* Premium */}
                                        <TableCell>
                                            {profile.is_premium ? (
                                                <Crown className="h-5 w-5 text-gold" />
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Voir le profil */}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                    className="h-8 w-8"
                                                >
                                                    <Link
                                                        href={`/prestataire/${profile.slug}`}
                                                        target="_blank"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Link>
                                                </Button>

                                                {/* Boutons de modération */}
                                                {updatingId === profile.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <>
                                                        {profile.status !== "active" && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => updateStatus(profile.id, "active")}
                                                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                            >
                                                                <CheckCircle className="mr-1 h-4 w-4" />
                                                                Activer
                                                            </Button>
                                                        )}
                                                        {profile.status !== "banned" && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => updateStatus(profile.id, "banned")}
                                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            >
                                                                <XCircle className="mr-1 h-4 w-4" />
                                                                Bannir
                                                            </Button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>

            {/* Compteur */}
            <p className="text-sm text-muted-foreground text-center">
                {profiles.length} profil{profiles.length > 1 ? "s" : ""} affiché{profiles.length > 1 ? "s" : ""}
            </p>
        </div>
    );
}
