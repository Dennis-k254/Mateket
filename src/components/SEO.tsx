import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

const SEO = ({ title, description, keywords, image, url }: SEOProps) => {
    const siteTitle = "Mateket Senior School";
    const fullTitle = `${title} | ${siteTitle}`;
    const defaultDescription = "Mateket Senior School in Kitale Cherengany, Kenya. A public mixed senior school offering the CBC framework with STEM, Social Sciences, and Arts & Sports pathways.";
    const defaultUrl = "https://mateket.vercel.app/";
    const defaultImage = "/images/hero/wall hero.jpeg";

    useEffect(() => {
        // Update Title
        document.title = fullTitle;

        // Update Meta Tags
        const updateMetaTag = (property: string, content: string, isNameAttr = false) => {
            let element = isNameAttr
                ? document.querySelector(`meta[name="${property}"]`)
                : document.querySelector(`meta[property="${property}"]`);

            if (!element) {
                element = document.createElement('meta');
                if (isNameAttr) {
                    element.setAttribute('name', property);
                } else {
                    element.setAttribute('property', property);
                }
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        updateMetaTag('description', description || defaultDescription, true);
        updateMetaTag('keywords', keywords || "Mateket, School, Kenya, Kitale, Cherengany, Senior School, CBC, STEM", true);

        // Open Graph
        updateMetaTag('og:title', fullTitle);
        updateMetaTag('og:description', description || defaultDescription);
        updateMetaTag('og:url', url || defaultUrl);
        updateMetaTag('og:image', image || defaultImage);

        // Twitter
        updateMetaTag('twitter:title', fullTitle);
        updateMetaTag('twitter:description', description || defaultDescription);
        updateMetaTag('twitter:image', image || defaultImage);

    }, [title, description, keywords, image, url]);

    return null;
};

export default SEO;
