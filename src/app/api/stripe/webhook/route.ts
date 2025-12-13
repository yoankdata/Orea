import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Webhook Stripe pour gérer les événements de paiement
 * POST /api/stripe/webhook
 */
export async function POST(request: NextRequest) {
    // Vérifier la configuration
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
        return NextResponse.json(
            { error: "Stripe non configuré" },
            { status: 500 }
        );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-11-17.clover",
    });

    // Client Supabase Admin pour les opérations webhook (bypasse RLS)
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await request.text();
    const signature = request.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("Erreur vérification signature webhook:", err);
        return NextResponse.json(
            { error: "Signature invalide" },
            { status: 400 }
        );
    }

    // Gérer les différents événements
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;

            // Récupérer l'ID utilisateur depuis les metadata
            const userId = session.metadata?.user_id;

            if (userId) {
                console.log(`Activation premium pour user: ${userId}`);

                // Mettre à jour le profil en premium
                const { error } = await supabaseAdmin
                    .from("profiles")
                    .update({ is_premium: true })
                    .eq("id", userId);

                if (error) {
                    console.error("Erreur mise à jour premium:", error);
                } else {
                    console.log(`User ${userId} est maintenant GOLD!`);
                }
            }
            break;
        }

        case "customer.subscription.deleted": {
            // L'abonnement a été annulé
            const subscription = event.data.object as Stripe.Subscription;
            const customerId = subscription.customer as string;

            // Récupérer l'email du client pour trouver l'utilisateur
            const customer = await stripe.customers.retrieve(customerId);
            if (customer && !customer.deleted && customer.email) {
                const { error } = await supabaseAdmin
                    .from("profiles")
                    .update({ is_premium: false })
                    .eq("email", customer.email);

                if (error) {
                    console.error("Erreur désactivation premium:", error);
                } else {
                    console.log(`Premium désactivé pour ${customer.email}`);
                }
            }
            break;
        }

        default:
            console.log(`Événement non géré: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
