import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase-server';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://orea.ci';

/**
 * Génère le sitemap dynamique du site
 * Inclut les pages statiques et les profils prestataires depuis Supabase
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Pages statiques
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/recherche`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/a-propos`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/tarifs`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/connexion`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/inscription`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/mentions-legales/cgu`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.2,
        },
        {
            url: `${BASE_URL}/mentions-legales/confidentialite`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.2,
        },
    ];

    // Récupérer les profils prestataires depuis Supabase
    let providerPages: MetadataRoute.Sitemap = [];

    try {
        const supabase = await createClient();

        if (supabase) {
            const { data: profiles } = await supabase
                .from('profiles')
                .select('slug, updated_at')
                .eq('status', 'active');

            if (profiles) {
                providerPages = profiles.map((profile) => ({
                    url: `${BASE_URL}/prestataire/${profile.slug}`,
                    lastModified: new Date(profile.updated_at),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                }));
            }
        }
    } catch (error) {
        console.error('Erreur lors de la génération du sitemap:', error);
    }

    return [...staticPages, ...providerPages];
}
