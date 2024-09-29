import {FC} from 'react';
import {Link} from "react-router-dom";

import '../../styles/header.css';
import topDentalLogo from '../../assets/images/logo.jpeg';

const Header: FC = () => {
    return (
        <header className="header">
            <div className="header__top">
                <div className="header__container">
                    <div className="header__logo">
                        <Link to={'home'}>
                            <img src={topDentalLogo} alt="TopDental логотип"/>
                        </Link>
                    </div>
                    <nav className="header__menu menu">
                        <ul className="menu__list">
                            <li className="menu__item">
                                <Link to={'about'}>Про нас</Link>
                            </li>
                            <li className="menu__item">
                                <Link to={'services'}>Послуги</Link>
                            </li>
                            <li className="menu__item">
                                <Link to={'contacts'}>Контакти</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="header__social social">
                        <ul className="social__list">
                            <li className="social__item">
                                <Link to={'tel:+380962270530'} className="phone"></Link>
                            </li>
                            <li className="social__item">
                                <Link to={'mailto:topdental@i.ua'} className="mail"></Link>
                            </li>
                            <li className="social__item">
                                <Link to={'https://www.facebook.com/p/%D0%9F%D1%80%D0%B8%D0%B2%D0%B0%D1%82%D0%BD%D0%B0-%D0%A1%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F-TopDental-100063561343890/'} className="facebook"></Link>
                            </li>
                            <li className="social__item">
                                <Link to={'https://instagram.com/topdentalternopil'} className="instagram"></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="header__bottom">
                <div className="header__container">
                    <p>Години роботи:<span className="header__time">10:00 - 19:00</span></p>
                    <p>+38 (096) 227 05 30</p>
                    <p>topdental@i.ua</p>
                </div>
            </div>
        </header>
    );
};

export {Header};

/**********************************/

// import {FC, useState} from 'react';
// import {Link} from "react-router-dom";
// import '../../styles/header.css';
// import topDentalLogo from '../../assets/images/logo.jpeg';
//
// const Header: FC = () => {
//     const [menuActive, setMenuActive] = useState(false);
//
//     const toggleMenu = () => {
//         setMenuActive(!menuActive);
//     };
//
//     return (
//         <header className="header">
//             <div className="header__top">
//                 <div className="header__container">
//                     <div className="header__logo">
//                         <Link to={'home'}>
//                             <img src={topDentalLogo} alt="TopDental логотип"/>
//                         </Link>
//                     </div>
//                     {/* Бургер-кнопка */}
//                     <div className="burger" onClick={toggleMenu}>
//                         <span></span>
//                         <span></span>
//                         <span></span>
//                     </div>
//                     {/* Основне меню для великих екранів */}
//                     <nav className="header__menu menu">
//                         <ul className="menu__list">
//                             <li className="menu__item">
//                                 <Link to={'about'}>Про нас</Link>
//                             </li>
//                             <li className="menu__item">
//                                 <Link to={'services'}>Послуги</Link>
//                             </li>
//                             <li className="menu__item">
//                                 <Link to={'contacts'}>Контакти</Link>
//                             </li>
//                         </ul>
//                     </nav>
//                     {/* Випадаюче меню для смартфонів */}
//                     <nav className={`mobile-menu ${menuActive ? 'active' : ''}`}>
//                         <ul className="mobile-menu__list">
//                             <li className="mobile-menu__item">
//                                 <Link to={'about'} onClick={toggleMenu}>Про нас</Link>
//                             </li>
//                             <li className="mobile-menu__item">
//                                 <Link to={'services'} onClick={toggleMenu}>Послуги</Link>
//                             </li>
//                             <li className="mobile-menu__item">
//                                 <Link to={'contacts'} onClick={toggleMenu}>Контакти</Link>
//                             </li>
//                         </ul>
//                     </nav>
//                     <div className="header__social social">
//                         <ul className="social__list">
//                             <li className="social__item">
//                                 <Link to={'tel:+380962270530'} className="phone"></Link>
//                             </li>
//                             <li className="social__item">
//                                 <Link to={'mailto:topdental@i.ua'} className="mail"></Link>
//                             </li>
//                             <li className="social__item">
//                                 <Link to={'https://www.facebook.com/p/%D0%9F%D1%80%D0%B8%D0%B2%D0%B0%D1%82%D0%BD%D0%B0-%D0%A1%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F-TopDental-100063561343890/'} className="facebook"></Link>
//                             </li>
//                             <li className="social__item">
//                                 <Link to={'https://instagram.com/topdentalternopil'} className="instagram"></Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//             <div className="header__bottom">
//                 <div className="header__container">
//                     <p>Години роботи:<span className="header__time">10:00 - 19:00</span></p>
//                     <p>+38 (096) 227 05 30</p>
//                     <p>topdental@i.ua</p>
//                 </div>
//             </div>
//         </header>
//     );
// };
//
// export {Header};
