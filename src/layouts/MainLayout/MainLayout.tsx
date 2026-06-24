import {FC, useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom";

import {Footer, Header} from "../../components";
import './main-layout.css';

const MainLayout: FC = () => {
    const location = useLocation();

    useEffect(() => {
        const elements = document.querySelectorAll(
            'h2, .btn, .header__menu .menu__item, .header__bottom p, .social__list, .footer__description, .footer__additionally, .footer__info, .service-item, .about__image, .about-first__image, .about-second__image, .contact-form'
        );

        if (!('IntersectionObserver' in window)) {
            elements.forEach(element => element.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.12, rootMargin: '0px 0px -40px 0px'});

        elements.forEach(element => observer.observe(element));

        return () => {
            observer.disconnect();
        };
    }, [location]);

    return (
        <div className="wrapper">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export {MainLayout};
