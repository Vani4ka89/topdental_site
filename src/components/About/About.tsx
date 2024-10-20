import {FC} from 'react';
import {Link} from "react-router-dom";

import './about.css';
import aboutImg from "../../assets/images/img_2.jpeg";

const About: FC = () => {
    const scrollWindow = () => {
        window.scroll({top: 0, behavior: "smooth"});
    };

    return (
        <section className="about">
            <div className="about__container">
                <div className="about__description">
                    <h2>Про TopDental</h2>
                    <p>Ми приватна стоматологія <span>"ТоpDental"</span>.
                        Наша історія розпочалась з 2015 року. Працюємо та надаємо консультативні, профілактичні та
                        лікувальні послуги у різних напрямках: терапевтична, ортопедична, дитяча стоматологія,
                        імплантологія та ортодонтія. Для своєї роботи використовуємо лише якісні сучасні матеріали
                        та
                        інструментарій.
                    </p>
                    <p>
                        Наші лікарі мають досвід роботи від 11 років і більше. Велика кількість постійних та
                        задоволених
                        пацієнтів говорить про наш результат праці. Ми не кажемо, що ми найкращі - Ваша посмішка це
                        скаже за нас)
                    </p>
                    <div className="about__link">
                        <Link to={'/about'} onClick={scrollWindow} className="btn">Більше →</Link>
                    </div>
                </div>
                <div className="about__image">
                    <img src={aboutImg} alt="reception"/>
                </div>
            </div>
        </section>
    );
};

export {About};