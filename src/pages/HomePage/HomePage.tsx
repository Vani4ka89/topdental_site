import {FC} from 'react';
import {Link} from "react-router-dom";

import '../../styles/custom.css';
import '../../styles/about.css';
import '../../styles/cover.css';
import '../../styles/about-1.css';
import '../../styles/about-2.css';
import '../../styles/questions.css';
import '../../styles/contact.css';

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
                <div className="main__container block-1">
                    <Link to='#contact' className="btn btn-1">Записатись на прийом →</Link>
                </div>
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

            <section className="contact" id="contact">
                <div className="contact__container">
                    <div className="contact__description">
                        <div className="description">
                            <h3>Зв'яжіться з нами</h3>
                            <p>
                                Не соромтеся зв’язатися з лікарем, якщо вам потрібна додаткова інформація або ви хочете
                                записатися на першу консультацію.
                            </p>
                        </div>
                        <div className="contact-info">
                            <div className="contact__address">
                                <p className="w10">Адреса</p>
                                <p>вулиця Антона Монастирського 40, Тернопіль, Тернопільська область, 46002.</p>
                            </div>
                            <div className="contact__time">
                                <p className="w10">Години <br/> роботи</p>
                                <p>
                                    Понеділок - п'ятниця: 10:00 - 19:00. <br/>
                                    Субота: за попереднім записом. <br/>
                                    Неділя: вихідний.
                                </p>
                            </div>
                            <div className="contact__email">
                                <p className="w10">E-mail</p>
                                <p>
                                    +38 (096) 227 05 30 <br/>
                                    topdental@пmail.com
                                </p>
                            </div>
                        </div>
                        <iframe title={'map'}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2588.7732761835105!2d25.613749776542626!3d49.545431071433526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473031eacc9c2c2f%3A0x4f7b7abec0d6a973!2zVG9wRGVudGFsL9Ci0L7Qv9CU0LXQvdGC0LDQuw!5e0!3m2!1suk!2sua!4v1727214411513!5m2!1suk!2sua"
                            width="600" height="230" style={{border: 0}} loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                    <form className="contact__form">

                    </form>
                </div>
            </section>
        </main>
    );
};

export {HomePage};
