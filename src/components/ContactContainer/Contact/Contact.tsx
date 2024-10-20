import {FC} from 'react';

import {ContactForm, Map} from "../../../components";
import './contact.css';

const Contact: FC = () => {
    return (
        <section className="contact" id="contact">
            <div className="contact__container">
                <div className="contact__content content">
                    <div className="content__description">
                        <h3>Зв'яжіться з нами</h3>
                        <p>
                            Не соромтеся зв’язатися з лікарем, якщо вам потрібна додаткова інформація або ви хочете
                            записатися на першу консультацію.
                        </p>
                    </div>
                    <div className="contact__info info">
                        <div className="info__address">
                            <p>Адреса</p>
                            <p>вул. Антона Монастирського 40, Тернопіль, Тернопільська область, 46002.</p>
                        </div>
                        <div className="info__time">
                            <ul>
                                <li>Години</li>
                                <li>роботи</li>
                            </ul>
                            <ul>
                                <li>Понеділок - п'ятниця: 10:00 - 19:00.</li>
                                <li>Субота: за попереднім записом.</li>
                                <li>Неділя: вихідний.</li>
                            </ul>
                        </div>
                        <div className="info__email">
                            <p>E - mail</p>
                            <ul>
                                <li>+38 (096) 227 05 30</li>
                                <li>topdentalternopil@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <Map/>
                </div>
                <ContactForm/>
            </div>
        </section>
    );
};

export {Contact};
