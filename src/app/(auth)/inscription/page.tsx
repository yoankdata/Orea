"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Phone,
    Sparkles,
    Loader2,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";

// Validation schema
const registerSchema = z.object({
    full_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Veuillez entrer une adresse email valide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    whatsapp: z.string().min(10, "Numéro de téléphone invalide (min 10 chiffres)"),
    category: z.enum(["coiffure", "makeup", "ongles", "soins", "barber"]),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const CATEGORIES = [
    { value: "coiffure", label: "Coiffure" },
    { value: "makeup", label: "Maquillage" },
    { value: "ongles", label: "Ongles" },
    { value: "soins", label: "Soins" },
    { value: "barber", label: "Barber" },
];

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            category: "coiffure",
        },
    });

    const selectedCategory = watch("category");

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            if (!supabase) throw new Error("Service d'authentification indisponible");

            // Register user with metadata
            const { error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.full_name,
                        whatsapp: data.whatsapp,
                        category: data.category,
                    },
                },
            });

            if (authError) {
                if (authError.message.includes("User already registered")) {
                    throw new Error("Cet email est déjà utilisé. Essayez de vous connecter.");
                }
                throw new Error(authError.message);
            }

            // Success state
            setSuccess(true);

            // Optional: Welcome email trigger (non-blocking)
            // fetch('/api/emails/welcome', { ... }).catch(console.error);

            // Redirect after delay
            setTimeout(() => {
                router.refresh();
                window.location.href = "/espace-pro/profil";
            }, 2000);

        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4">
                <Card className="w-full max-w-md border-0 shadow-xl shadow-green-100">
                    <CardContent className="p-8 text-center space-y-6">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 animate-in zoom-in duration-300">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                        <div>
                            <h2 className="font-serif text-2xl font-bold text-anthracite mb-2">
                                Compte créé !
                            </h2>
                            <p className="text-muted-foreground">
                                Bienvenue sur ORÉA. <br /> Redirection vers votre tableau de bord...
                            </p>
                        </div>
                        <Loader2 className="h-6 w-6 animate-spin text-gold mx-auto" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 py-12">
            <div className="w-full max-w-md space-y-8">

                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                        <Sparkles className="h-6 w-6 text-gold transition-transform group-hover:scale-110" />
                        <span className="font-serif text-3xl font-bold text-anthracite tracking-tight">ORÉA</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-anthracite tracking-tight">Créer mon profil pro</h2>
                    <p className="text-muted-foreground mt-2">Rejoignez l'élite de la beauté ivoirienne</p>
                </div>

                <Card className="border-border/40 shadow-xl shadow-gray-200/50">
                    <CardContent className="pt-8 px-6 sm:px-8">

                        {/* Value Props */}
                        <div className="mb-8 p-4 rounded-xl bg-gold/5 border border-gold/10">
                            <ul className="space-y-2.5">
                                {[
                                    "Visibilité auprès de milliers de clients",
                                    "Réservations directes via WhatsApp",
                                    "100% Gratuit, sans engagement"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-anthracite/80">
                                        <CheckCircle2 className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {error && (
                            <Alert variant="destructive" className="mb-6 bg-red-50 text-red-900 border-red-200">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Erreur</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-anthracite" htmlFor="full_name">Nom complet / Salon</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
                                    <Input
                                        {...register("full_name")}
                                        id="full_name"
                                        placeholder="Ex: Marie Koné ou Salon Prestige"
                                        className="pl-10 h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.full_name && <p className="text-xs text-red-500 font-medium">{errors.full_name.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-anthracite" htmlFor="email">Email professionnel</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
                                    <Input
                                        {...register("email")}
                                        id="email"
                                        type="email"
                                        placeholder="contact@salon.com"
                                        className="pl-10 h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                            </div>

                            {/* WhatsApp */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-anthracite" htmlFor="whatsapp">Numéro WhatsApp</label>
                                <div className="relative group">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
                                    <Input
                                        {...register("whatsapp")}
                                        id="whatsapp"
                                        type="tel"
                                        placeholder="07 00 00 00 00"
                                        className="pl-10 h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.whatsapp && <p className="text-xs text-red-500 font-medium">{errors.whatsapp.message}</p>}
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-anthracite">Spécialité principale</label>
                                <Select
                                    value={selectedCategory}
                                    onValueChange={(value) => setValue("category", value as RegisterFormData["category"])}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white">
                                        <SelectValue placeholder="Sélectionnez votre domaine" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((cat) => (
                                            <SelectItem key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category && <p className="text-xs text-red-500 font-medium">{errors.category.message}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-anthracite" htmlFor="password">Mot de passe</label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
                                    <Input
                                        {...register("password")}
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Minimum 6 caractères"
                                        className="pl-10 pr-10 h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-anthracite p-1"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>}
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 rounded-full bg-gold hover:bg-gold-dark text-white font-bold shadow-lg shadow-gold/20 hover:shadow-gold/30 transition-all duration-300 mt-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Création du compte...
                                    </>
                                ) : (
                                    "Créer mon profil gratuit"
                                )}
                            </Button>

                            <p className="text-center text-xs text-muted-foreground px-4">
                                En continuant, vous acceptez nos{" "}
                                <Link href="/cgu" className="text-anthracite hover:underline">Conditions</Link>
                                {" "}et notre{" "}
                                <Link href="/confidentialite" className="text-anthracite hover:underline">Politique de confidentialité</Link>.
                            </p>
                        </form>
                    </CardContent>

                    <CardFooter className="bg-gray-50/50 py-4 px-6 border-t border-gray-100 flex justify-center rounded-b-xl">
                        <p className="text-sm text-muted-foreground">
                            Vous avez déjà un compte ?{" "}
                            <Link href="/connexion" className="font-semibold text-gold hover:text-gold-dark hover:underline transition-all">
                                Connectez-vous
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}