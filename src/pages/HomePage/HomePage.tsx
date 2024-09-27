import {FC} from 'react';

import {
    About,
    AboutFirstPerson,
    AboutSecondPerson,
    ContactDescription,
    Cover,
    Custom,
    Questions
} from "../../components";

const HomePage: FC = () => {
    return (
        <main className="main">
            <Custom/>
            <About/>
            <Cover/>
            <AboutFirstPerson/>
            <AboutSecondPerson/>
            {/*<ImageSlider/>*/}
            <Questions/>
            <ContactDescription/>
        </main>
    );
};

export {HomePage};
