import {FC} from 'react';
import {Helmet} from 'react-helmet';

import {useContent} from '../../content';

interface ISeoProps {
    canonicalPath?: string;
    description: string;
    image?: string;
    preloadImage?: string;
    schema?: Record<string, unknown> | Record<string, unknown>[];
    title: string;
}

const SITE_URL = 'https://topdental.te.ua';
const DEFAULT_IMAGE = `${SITE_URL}/logo512.png`;

const Seo: FC<ISeoProps> = ({canonicalPath = '/', description, image = DEFAULT_IMAGE, preloadImage, schema, title}) => {
    const {content} = useContent();
    const siteName = content.clinic.name;
    const canonical = `${SITE_URL}${canonicalPath}`;
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description}/>
            <link rel="canonical" href={canonical}/>
            <meta property="og:type" content="website"/>
            <meta property="og:locale" content="uk_UA"/>
            <meta property="og:site_name" content={siteName}/>
            <meta property="og:title" content={fullTitle}/>
            <meta property="og:description" content={description}/>
            <meta property="og:url" content={canonical}/>
            <meta property="og:image" content={image}/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={fullTitle}/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:image" content={image}/>
            {preloadImage && <link rel="preload" as="image" href={preloadImage}/>}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export {Seo, SITE_URL};
