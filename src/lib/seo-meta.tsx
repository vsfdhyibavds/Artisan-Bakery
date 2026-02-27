import { Helmet } from 'react-helmet-async';
import { ReactNode } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  canonical?: string;
  children?: ReactNode;
  structuredData?: any;
}

export function SEOMeta({
  title,
  description,
  keywords = [],
  ogImage = 'https://images.pexels.com/photos/3407857/pexels-photo-3407857.jpeg',
  ogType = 'website',
  canonical,
  structuredData,
}: SEOHeadProps) {
  const fullTitle = `${title} | Artisan Bakery`;
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://artisanbakery.com';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="Artisan Bakery" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}

      {/* Additional SEO */}
      <meta name="theme-color" content="#8B6F47" />
      <link rel="icon" href="/logo.png" />
    </Helmet>
  );
}
