import {FC} from 'react';

import {
    About,
    AboutFirstPerson,
    AboutSecondPerson,
    Contact,
    Cover,
    Custom,
    ImageSlider,
    Questions, Recording, Reviews
} from "../../components";

const HomePage: FC = () => {
    return (
        <main className="main">
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
