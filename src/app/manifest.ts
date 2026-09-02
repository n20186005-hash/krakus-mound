import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Krakus Mound – Visitor Guide & Location',
    short_name: 'Krakus Mound',
    description:
      'Visitor guide to Kopiec Krakusa (Krakus Mound) in Kraków, Poland — a prehistoric burial mound with panoramic views. Free 24/7.',
    start_url: '/pl',
    display: 'standalone',
    background_color: '#faf8f4',
    theme_color: '#3a7a8d',
    lang: 'pl',
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
