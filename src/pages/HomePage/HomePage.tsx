import {FC} from 'react';
import {Link} from "react-router-dom";

import '../../styles/custom.css';
import '../../styles/about.css';
import '../../styles/cover.css';
import '../../styles/about-1.css';
import '../../styles/about-2.css';
import '../../styles/questions.css';

import {Questions} from "../../components";
import aboutImg from "../../assets/images/img_2.jpeg";
import aboutImg_1 from "../../assets/images/img_4.png";
import aboutImg_2 from "../../assets/images/img_5.png";

const HomePage: FC = () => {

    const scrollWindow = () => {
        window.scroll({top: 0, behavior: "smooth"});
    };

    return (
        <main className="main">
            <section className="main__image">
                {/*<div className="main__container">*/}

                {/*</div>*/}
            </section>

            <section className="about">
                <div className="main__container">
                    <div className="about__description">
                        <h2>Про TopDental</h2>
                        <p>Ми приватна стоматологія <span>"ТоpDental"</span>.
                            Наша історія розпочалась з 2015 року. Працюємо та надаємо консультативні, профілактичні та
                            лікувальні послуги у різних напрямках: терапевтична, ортопедична, дитяча стоматологія,
                            імплантологія та ортодонтія. Для своєї роботи використовуємо лише якісні сучасні матеріали
                            та
                            інструментарій.
                            <br/><br/>
                            Наші лікарі мають досвід роботи від 11 років і більше. Велика кількість постійних та
                            задоволених
                            пацієнтів говорить про наш результат праці. Ми не кажемо, що ми найкращі - Ваша посмішка це
                            скаже за нас)
                        </p>
                        <Link to={'/about'} onClick={scrollWindow} className="btn">Більше →</Link>
                    </div>
                    <div className="about__image">
                        <img src={aboutImg} alt="about-photo"/>
                    </div>
                </div>
            </section>

            <section className="cover">
                <div className="cover__container">
                    <div className="cover__info">
                        <h2>Перша консультація в TopDental</h2>
                        <p>Консультація - перший крок до гарної усмішки.</p>
                    </div>
                </div>
            </section>

            <section className="about-1">
                <div className="main__container">
                    <div className="about-1__image">
                        <img src={aboutImg_1} alt="image-1"/>
                    </div>
                    <div className="about-1__description">
                        <h2>Тарас Петрович</h2>
                        <p>
                            Справжній професіонал своєї справи з багаторічним досвідом. Завдяки його майстерності і
                            увазі до
                            деталей, наші пацієнти отримують найвищий рівень обслуговування та чудові результати.
                        </p>
                        <br/>
                        <p>Особливості:</p>
                        <pre>✔️ Висококваліфікований фахівець<br/>✔️ Індивідуальний підхід до кожного пацієнта<br/>✔️ Використання сучасних технологій та методик<br/>✔️ Дбайливе ставлення до пацієнтів</pre>
                        <br/>
                        <p>
                            Тарас Петрович працює в багатьох напрямках стоматології, включаючи:
                        </p>
                        <pre>☑️ Хірургічну стоматологію<br/>☑️ Ортопедичну стоматологію<br/>☑️ Естетичну стоматологію<br/>☑️ Імплантологію<br/>☑️ Реконструктивну стоматологію</pre>
                        <br/>
                        <p>
                            Запишіться на консультацію вже сьогодні і відчуйте різницю!
                            Ваше здоров'я - наш пріоритет!
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-2">
                <div className="main__container">
                    <div className="about-2__image">
                        <img src={aboutImg_2} alt="image-2"/>
                    </div>
                    <div className="about-2__description">
                        <h2>Яна Вікторівна</h2>
                        <p>
                            Усмішка вашої мрії починається з професійного ортодонта у клініці TopDental.
                        </p>
                        <br/>
                        <p>
                            Познайомтесь з нашим талановитим лікарем - ортодонтом, Яною Вікторівною!
                            Професіоналізм і турбота - це те, що ми гарантуємо кожному пацієнту!
                        </p>
                        <br/>
                        <pre>☑️ Виправлення прикусу<br/>☑️ Вирівнювання зубів за допомогою сучасних методів<br/>☑️ Лікування брекетами та елайнерами<br/>☑️ Індивідуальний підхід та комфорт</pre>
                        <br/>
                        <p>
                            Зробіть перший крок до впевненої усмішки - запишіться на консультацію до нашого ортодонта!
                        </p>
                    </div>
                </div>
            </section>

            <section className="questions">
                <div className="main__container">
                    <div className="block">
                        <h2>Залишилися запитання?</h2>
                        <p className={'description'}>Перегляньте відповіді на найпопулярніші питання.</p>
                        <Questions/>
                    </div>
                </div>
            </section>
        </main>
    );
};

export {HomePage};
