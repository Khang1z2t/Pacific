    import { Helmet } from "react-helmet";

export const SEOComponent = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>Pacific Travel - Khám phá đến mọi nơi</title>
            <meta name="description"
                  content={description}/>
            <meta name="keywords" content={keywords} />
            <meta name="author" content="TunzDev" />
            <link rel="canonical" href="https://pacific-vn.vercel.app" />
            <meta property="og:title" content={title} />
            <meta property="og:description"
                  content={description} />
            <meta property="og:url" content="https://pacific-vn.vercel.app" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description"
                  content="Trang chủ của Pacific, nơi bạn có thể khám phá những điểm đến tuyệt vời." />
            <meta property="og:image" content="https://pacific-vn.vercel.app" />
            <meta property="og:image:alt" content="Pacific - Hành trình khám phá" />
            <meta name="twitter:image" content="https://pacific-vn.vercel.app" />
            <meta name="twitter:image:alt" content="Pacific - Hành trình khám phá" />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    'url': 'https://pacific-vn.vercel.app',
                    'name': 'Pacific Travel - Khám phá đến mọi nơi',
                    'description': 'Trang chủ của Pacific, nơi bạn có thể khám phá những điểm đến tuyệt vời.',
                })}
            </script>
        </Helmet>
    );
};