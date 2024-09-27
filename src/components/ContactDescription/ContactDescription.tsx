import {FC} from 'react';

import {Form} from "../Form/Form";
import {Map} from "../Map/Map";
import '../../styles/contact.css';

const ContactDescription: FC = () => {
    return (
        <section className="contact" id="contact">
            <div className="main__container">
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
                                topdental@i.ua
                            </p>
                        </div>
                    </div>
                    <Map/>
                </div>
                <Form/>
            </div>
        </section>
    );
};

export {ContactDescription};
