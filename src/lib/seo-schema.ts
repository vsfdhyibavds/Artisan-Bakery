/**
 * Structured data helpers for SEO (JSON-LD)
 */

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${window.location.origin}${item.url}`,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Artisan Bakery',
    image: `${window.location.origin}/logo.png`,
    description: 'Fresh artisanal baked goods made daily with premium ingredients',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Community Road',
      addressLocality: 'Syokimau',
      addressRegion: 'Nairobi',
      postalCode: '00000',
      addressCountry: 'KE',
    },
    telephone: '+254787943878',
    email: 'franklyours10@gmail.com',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    priceRange: '$',
  };
}

export function generateProductSchema(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    price: product.price,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '100',
    },
  };
}

export function generateArticleSchema(article: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedDate,
    author: {
      '@type': 'Organization',
      name: 'Artisan Bakery',
    },
  };
}
