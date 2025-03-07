import { Helmet } from "react-helmet";

export const SEOComponent = ({ title, description, href, keywords, author, children,breadcrumbs }) => {
    return (
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <link rel="canonical" href={href} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={href} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                {children}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "url": href,
                        "name": title,
                        "description": description,
                    })}
                </script>
                <meta property="og:image" content="https://pacific-vn.vercel.app" />
                <meta property="og:image:alt" content="Pacific - Hành trình khám phá" />
                {/* Breadcrumbs JSON-LD Schema */}
                {breadcrumbs && (
                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": breadcrumbs.map((item, index) => ({
                                "@type": "ListItem",
                                "position": index + 1,
                                "name": item.name,
                                "item": item.url,
                            })),
                        })}
                    </script>
                )}
            </Helmet>
    );
};