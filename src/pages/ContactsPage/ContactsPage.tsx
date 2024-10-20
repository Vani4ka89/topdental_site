import {FC} from 'react';

import './contacts-page.css';

import location from '../../assets/images/location_img.jpeg';
import phone from '../../assets/images/phone_img.jpeg';
import {Helmet} from "react-helmet";

const ContactsPage: FC = () => {
    return (
        <main className="main">

            <Helmet>
                <title>Контакти | TopDental</title>
                <meta name="description" content="Контакти клініки TopDental у Тернополі та Плотичі. Ви можете зв'язатися з нами за телефоном або завітати до одного з наших кабінетів." />
                <meta name="keywords" content="стоматологія Тернопіль, TopDental контакти, стоматолог Плотича" />
            </Helmet>

            <section className="contacts">
                <div className="contacts-block">
                    <h1 className="contacts-title">Контакти</h1>
                    <div className="contacts__container">
                        <div className="contacts-description">
                            <h2>Стоматологія TopDental</h2>
                            <p>Ви можете відвідати один з наших приватних кабінетів.</p>
                        </div>
                        <div className="contacts-content content">
                            <div className="content__map">
                                <iframe title="map-1"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2588.773276183511!2d25.61374977654263!3d49.54543107143351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473031eacc9c2c2f%3A0x4f7b7abec0d6a973!2zVG9wRGVudGFsL9Ci0L7Qv9CU0LXQvdGC0LDQuw!5e0!3m2!1suk!2sua!4v1727543853561!5m2!1suk!2sua"
                                        width="550" height="200" loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                                <div className="content-address">
                                    <h3>TopDental Тернопіль</h3>
                                    <div className="box">
                                        <img src={location} loading="lazy" alt="icon-location" className="icon"/>
                                        <p>вул. Антона Монастирського, 40, Тернопіль, Тернопільська область, 46002</p>
                                    </div>
                                    <div className="box">
                                        <img src={phone} loading="lazy" alt="icon-phone"/>
                                        <p>+38 (097) 227 05 30</p>
                                    </div>
                                </div>
                            </div>
                            <div className="content__map">
                                <iframe title="map-2"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2584.607416161795!2d25.55829537654734!3d49.62400547144617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47303073a3e72fc3%3A0xc5cbe3ee6bedefc0!2z0LLRg9C70LjRhtGPINCh0LDQtNC-0LLQsCwgNCwg0J_Qu9C-0YLQuNGH0LAsINCi0LXRgNC90L7Qv9GW0LvRjNGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA0NzcwNA!5e0!3m2!1suk!2sua!4v1727543467228!5m2!1suk!2sua"
                                        width="550" height="200" loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                                <h3>TopDental Плотича</h3>
                                <div className="box">
                                    <img src={location} loading="lazy" alt="icon-location"/>
                                    <p>вул. Садова, 4, Плотича, Тернопільська область, 47704</p>
                                </div>
                                <div className="box">
                                    <img src={phone} loading="lazy" alt="icon-phone"/>
                                    <p>+38 (096) 675-42-35</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="big-map">
                <iframe title={'map'}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2588.7732761835105!2d25.613749776542626!3d49.545431071433526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473031eacc9c2c2f%3A0x4f7b7abec0d6a973!2zVG9wRGVudGFsL9Ci0L7Qv9CU0LXQvdGC0LDQuw!5e0!3m2!1suk!2sua!4v1727214411513!5m2!1suk!2sua"
                        width="100%" height="500" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </section>
        </main>
    );
};

export {ContactsPage};
