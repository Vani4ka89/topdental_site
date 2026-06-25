import {FC} from 'react';

import {
    About,
    AboutFirstPerson,
    AboutSecondPerson,
    Contact,
    Cover,
    Custom,
    ImageSlider,
    Questions,
    Recording,
    Reviews,
    Seo
} from "../../components";
import {createDentalClinicSchema, useContent} from '../../content';

const HomePage: FC = () => {
    const {content} = useContent();

    return (
        <main className="main">
            <Seo
                canonicalPath="/"
                description={content.seo.home.description}
                preloadImage={content.home.hero.image.src}
                schema={createDentalClinicSchema(content)}
                title={content.seo.home.title}
            />

            <Custom/>
            <About/>
            <Cover/>
            <AboutFirstPerson/>
            <AboutSecondPerson/>
            <ImageSlider/>
            <Reviews/>
            <Recording/>
            <Questions/>
            <Contact/>
        </main>
    );
};

export {HomePage};
