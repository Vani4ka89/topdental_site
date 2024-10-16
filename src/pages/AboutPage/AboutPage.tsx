import {FC} from 'react';
import {Helmet} from "react-helmet";

import '../../components/About/about.css';
import aboutImg from '../../assets/images/img_2.png';

import './about-page.css';

const AboutPage: FC = () => {
    return (
        <main className="main">

            <Helmet>
                <title>Про нас | TopDental</title>
                <meta name="description"
                      content="TopDental - сучасна стоматологічна клініка в Тернополі. Ми пропонуємо лікування зубів та ротової порожнини з використанням новітніх технологій."/>
            </Helmet>

            <section className="about about-page">
                <h1>Про нас</h1>
                <div className="main__container">
                    <div className="about-page-content">
                        <div className="about__description">
                            <h2>Про TopDental</h2>
                            <p>
                                <span>TopDental</span> – це сучасна стоматологічна клініка в Тернополі.
                                Яка спеціалізується на лікуванні зубів, ротової порожнини, щелеп.

                                Включає діагностику та лікування різних захворювань, відновлення втрачених чи уражених
                                тканин.
                                Наша команда досвідчених стоматологів використовує сучасні методи лікування та
                                обладнання, щоб
                                забезпечити найкращий результат для наших пацієнтів.

                                Ми уважні до потреб наших пацієнтів і забезпечуємо комфортне та безболісне лікування.
                                Звертаючись у <span>TopDental</span>, ви можете бути впевнені, що отримаєте якісну
                                стоматологічну допомогу.
                            </p>
                        </div>
                        <div className="about__image">
                            <img src={aboutImg} loading="lazy" alt="about-photo"/>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export {AboutPage};
