import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

/**
 * API Route pour créer une session Stripe Checkout
 * POST /api/stripe/checkout
 */
export async function POST() {
    try {
        // Vérifier que Stripe est configuré
        if (!process.env.STRIPE_SECRET_KEY) {
            return NextResponse.json(
                { error: "Stripe n'est pas configuré" },
                { status: 500 }
            );
        }

        // Initialiser Stripe (lazy initialization)
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2025-11-17.clover",
        });

        // Récupérer l'utilisateur connecté via Supabase
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Vous devez être connecté pour vous abonner" },
                { status: 401 }
            );
        }

        // Créer la session Stripe Checkout
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            customer_email: user.email!,
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID!, // ID du prix NUBI GOLD
                    quantity: 1,
                },
            ],
            metadata: {
                user_id: user.id, // Pour retrouver l'utilisateur dans le webhook
            },
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/account/billing?canceled=true`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Erreur Stripe Checkout:", error);
        const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
        return NextResponse.json(
            { error: `Erreur Stripe: ${errorMessage}` },
            { status: 500 }
        );
    }
}
