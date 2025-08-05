import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEOHead({
  title = 'Artisan Bakery - Fresh Baked Daily',
  description = 'Premium artisan bakery offering fresh breads, pastries, cakes, and custom orders. Made with love since 1985.',
  keywords = 'bakery, fresh bread, pastries, cakes, artisan, custom orders, gluten-free',
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website'
}: SEOHeadProps) {
  const fullTitle = title.includes('Artisan Bakery') ? title : `${title} | Artisan Bakery`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Artisan Bakery" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Artisan Bakery" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#a18072" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Bakery",
          "name": "Artisan Bakery",
          "description": description,
          "url": "https://artisanbakery.com",
          "telephone": "(+254) 7879438878-BAKE",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Community Road",
            "addressLocality": "Syokimau",
            "addressRegion": "Nairobi",
            "postalCode": "12345",
            "addressCountry": "KE"
          },
          "openingHours": [
            "Mo-Fr 07:00-19:00",
            "Sa 08:00-20:00",
            "Su 08:00-18:00"
          ],
          "servesCuisine": "Bakery",
          "priceRange": "$$",
          "image": image,
          "sameAs": [
            "https://facebook.com/artisanbakery",
            "https://instagram.com/artisanbakery",
            "https://twitter.com/artisanbakery"
          ]
        })}
      </script>
    </Helmet>
  );
}