import {FC, useCallback, useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom";

import {Footer, Header} from "../../components";
import './main-layout.css';

const MainLayout: FC = () => {
    const location = useLocation();

    function isInViewport(element: HTMLElement) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight && rect.bottom >= 0
        );
    }

    const handleScroll = useCallback(() => {
        const elements = document.querySelectorAll(
            'h2, .btn, .header__menu .menu__item, .header__bottom p, .social__list, .footer__description, .footer__additionally, .footer__info, .service-item'
        );
        elements.forEach(element => {
            if (isInViewport(element as HTMLElement)) {
                element.classList.add('visible');
            }
        });
    }, []);

    useEffect(() => {
        handleScroll();
        console.log('OK');

        window.addEventListener('scroll', handleScroll);
        console.log('Scroll event listener added');

        return () => {
            window.removeEventListener('scroll', handleScroll);
            // document.addEventListener('DOMContentLoaded', handleScroll);
            console.log('Scroll event listener removed');
        };
    }, [location, handleScroll]);

    return (
        <div className="wrapper">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export {MainLayout};
