import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
}

/**
 * SEOHead component for managing SEO meta tags across the site
 * To use this, make sure to install react-helmet-async and wrap your app with HelmetProvider
 */
const SEOHead = ({
  title = "Iqbal Attila | IT Solution Architect & Cybersecurity Specialist",
  description = "Professional portfolio of Iqbal Attila, an IT Solution Architect and Cybersecurity Specialist with over 10 years of experience in technology solutions and security.",
  keywords = ["IT Solution Architect", "Cybersecurity Specialist", "Portfolio", "Technology"],
  canonicalUrl = "https://me.kcmon.id",
  ogImage = "https://placehold.co/1200x630/eee/333?text=Iqbal+Attila",
  ogType = "website",
  twitterCard = "summary_large_image",
  noIndex = false
}: SEOHeadProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional tags for better SEO */}
      <meta name="author" content="Iqbal Attila" />
      <meta property="og:site_name" content="Iqbal Attila Portfolio" />
      <meta name="twitter:creator" content="@iqbalattila" />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Iqbal Attila",
          "url": canonicalUrl,
          "image": ogImage,
          "jobTitle": "IT Solution Architect & Cybersecurity Specialist",
          "worksFor": {
            "@type": "Organization",
            "name": "PT Global Infotech Solution"
          },
          "sameAs": [
            "https://linkedin.com/in/iqbalattila",
            "https://github.com/aikazu"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead; 