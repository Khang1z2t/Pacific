import { Helmet } from "react-helmet";

export const SEOComponent = ({ title, description, href, keywords, author, children }) => {
    return (
        <div>
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
            </Helmet>
        </div>
    );
};