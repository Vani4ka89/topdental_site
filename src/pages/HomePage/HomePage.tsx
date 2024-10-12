import {FC} from 'react';
import {Helmet} from 'react-helmet';

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

            <Helmet>
                <title>TopDental | Сучасна стоматологічна клініка</title>
                <meta name="description"
                      content="TopDental – це сучасна стоматологічна клініка, яка спеціалізується на лікуванні зубів у Тернополі. Ми пропонуємо професійні послуги стоматології та використовуємо передові методи лікування."
                />
                <meta name="keywords"
                      content="стоматологія, лікування зубів, Тернопіль стоматолог, TopDental, імпланти, ортодонтія"/>
                <link rel="canonical" href="https://www.topdental.te.ua/"/>
            </Helmet>

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
