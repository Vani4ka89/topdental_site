import {FC} from 'react';
import {Link} from "react-router-dom";

import '../../styles/footer.css';

const Footer: FC = () => {
    const scrollWindow = () => {
        window.scroll({top: 0, behavior: "smooth"});
    };

    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="footer__container">
                    <div className="footer__description description fb-size">
                        <h3>TopDental</h3>
                        <p>Покращуйте якість своєї усмішки вже сьогодні. Записатися на прийом.</p>

                        <ul className="description__list list">
                            <li className="list__item">
                                <Link
                                    to={'https://www.facebook.com/p/%D0%9F%D1%80%D0%B8%D0%B2%D0%B0%D1%82%D0%BD%D0%B0-%D0%A1%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F-TopDental-100063561343890/'}
                                    className="fb"></Link>
                            </li>
                            <li className="list__item">
                                <Link to={'https://instagram.com/topdentalternopil'} className="ig"></Link>
                            </li>
                            <li className="list__item">
                                <Link to={''} className="tg"></Link>
                            </li>
                        </ul>

                    </div>
                    <div className="footer__additionally additionally fb-size">
                        <h4>Додатково</h4>
                        <ul className="additionally__list list">
                            <li className="list__item">
                                <Link to={'/about'} onClick={scrollWindow}>Про нас</Link>
                            </li>
                            <li className="list__item">
                                <Link to={''}>Галерея</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__info info fb-size">
                        <h4>Інформація</h4>
                        <ul className="info__list list">
                            <li className="list__item">
                                <Link to={''}>Наші послуги</Link>
                            </li>
                            <li className="list__item">
                                <Link to={''}>Контакти</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="footer__container">
                    <p>© Created by tivas</p>
                    <p>2024</p>
                    <p>All rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export {Footer};
