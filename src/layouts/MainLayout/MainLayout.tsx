import {FC} from 'react';
import {Outlet} from "react-router-dom";

import {Footer, Header} from "../../components";
import './main-layout.css';

const MainLayout: FC = () => {

    function isInViewport(element: any) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight && rect.bottom >= 0
        );
    }

    function handleScroll() {
        const elements = document.querySelectorAll('h2');
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    // document.addEventListener('DOMContentLoaded', handleScroll);
    window.addEventListener('scroll', handleScroll);

    return (
        <div className="wrapper">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export {MainLayout};
