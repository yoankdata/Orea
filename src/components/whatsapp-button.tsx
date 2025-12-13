"use client";

import { useState } from "react";
import { MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppButtonProps {
    whatsapp: string;
    providerEmail: string;
    providerName: string;
    category?: string;
    variant?: "default" | "fixed";
    className?: string;
}

/**
 * Bouton WhatsApp qui envoie une notification email au prestataire
 * avant de rediriger vers WhatsApp
 */
export function WhatsAppButton({
    whatsapp,
    providerEmail,
    providerName,
    category,
    variant = "default",
    className = "",
}: WhatsAppButtonProps) {
    const [isNotifying, setIsNotifying] = useState(false);

    // Formater le numéro WhatsApp
    const formatWhatsApp = (num: string) => {
        // Supprimer tout sauf les chiffres et le +
        let clean = num.replace(/[^\d+]/g, "");
        // Si le numéro ne commence pas par +, ajouter +225 (Côte d'Ivoire)
        if (!clean.startsWith("+")) {
            clean = "+225" + clean;
        }
        return clean.replace("+", "");
    };

    const handleClick = async () => {
        setIsNotifying(true);

        // Envoyer la notification email (non-bloquant)
        try {
            await fetch('/api/emails/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    providerEmail,
                    providerName,
                    clientInterest: category,
                }),
            });
        } catch (error) {
            // Ne pas bloquer l'utilisateur si l'email échoue
            console.error('Erreur notification email:', error);
        }

        // Ouvrir WhatsApp
        const formattedNumber = formatWhatsApp(whatsapp);
        const message = encodeURIComponent(
            `Bonjour ${providerName}, je vous contacte via ORÉA.`
        );
        window.open(`https://wa.me/${formattedNumber}?text=${message}`, '_blank');

        setIsNotifying(false);
    };

    if (variant === "fixed") {
        // Version fixe mobile
        return (
            <Button
                onClick={handleClick}
                disabled={isNotifying}
                className={`rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg ${className}`}
                size="lg"
            >
                {isNotifying ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                    <MessageCircle className="mr-2 h-5 w-5" />
                )}
                Contacter via WhatsApp
            </Button>
        );
    }

    // Version standard
    return (
        <Button
            onClick={handleClick}
            disabled={isNotifying}
            className={`rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white ${className}`}
        >
            {isNotifying ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <MessageCircle className="mr-2 h-4 w-4" />
            )}
            WhatsApp
        </Button>
    );
}
